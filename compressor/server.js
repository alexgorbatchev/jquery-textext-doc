var
	express = require('express'),
	winston = require('winston'),
	path    = require('path'),
	fs      = require('fs'),
	crypto  = require('crypto'),
	parser  = require('uglify-js').parser,
	uglify  = require('uglify-js').uglify,
	stylus  = require('stylus')
	;

var app = module.exports = express.createServer();

var SOURCE_PATH = fs.realpathSync(__dirname + '/products'),
	PRODUCTS    = { textext : [ '1.0.0', '1.1.0', '1.2.0' ] }
	;

app.configure(function()
{
	app.use(express.bodyParser());
	app.use(app.router);
});

app.configure('development', function()
{
	app.use(express.errorHandler(
	{
		dumpExceptions : true,
		showStack      : true
	}));
});

app.configure('production', function()
{
	app.use(express.errorHandler());
});

function compressSource(source)
{
	var opts = {};
	var ast = parser.parse(source);     // parse code and get the initial AST
	ast = uglify.ast_mangle(ast, opts); // get a new AST with mangled names
	ast = uglify.ast_squeeze(ast);      // get an AST with compression optimizations
	return uglify.gen_code(ast);        // compressed code here
};

function md5(source)
{
	var hash = crypto.createHash('md5');
	hash.update(source);
	return hash.digest('hex');
};

function assembleFileList(productPath, files, callback)
{
	var jsFiles     = [],
		stylusFiles = [],
		counter     = 0,
		stopAt      = files.length * 2 // twice the list because checking two files for each entry
		;

	files.forEach(function(file, index)
	{
		file = file.replace(/\/|\\/g, '-');

		var ext = path.extname(file);

		if(ext.length > 0)
			file = path.basename(file, ext);

		var styleFile = path.join(productPath, 'stylus', file + '.styl'),
			jsFile    = path.join(productPath, 'js', file + '.js')
			;

		path.exists(styleFile, function(exists)
		{
			if(exists)
				stylusFiles.push(styleFile);

			finish();
		});

		path.exists(jsFile, function(exists)
		{
			if(exists)
				jsFiles.push(jsFile);

			finish();
		});
	});

	function finish()
	{
		if(++counter < stopAt)
			return;

		callback(jsFiles.concat(stylusFiles));
	};
};

function loadFiles(files, callback)
{
	var counter = 0,
		stopAt  = files.length,
		result  = []
		;
	
	files.forEach(function(file, index)
	{
		fs.readFile(file, 'utf8', function(err, data)
		{
			result[index] = {
				name    : file,
				content : err ? err.message : data
			};

			if(++counter == stopAt)
				callback(result);
		});
	});
};

app.post('/build', function(request, response)
{
	var params      = request.body,
		files       = params.files,
		product     = PRODUCTS[params.product] ? params.product : null,
		version     = params.version,
		compress    = params.compress == 'true',
		sum         = md5(compress.toString() + JSON.stringify(files) + product + version),
		productPath = path.join(SOURCE_PATH, product, version),
		sumFile     = path.join(productPath + '_cache', sum + '.txt')
		;

	if(PRODUCTS[product].indexOf(version) == -1)
		version = null;

	winston.info('Product: ' + product);
	winston.info('Version: ' + version);
	winston.info('Files: ' + files.join(', '));

	path.exists(sumFile, function(exists)
	{
		if(exists)
		{
			winston.info('Using cached file');
			response.sendfile(sumFile);
			return;
		}

		winston.info('Generating new file');

		assembleFileList(productPath, files, function(files)
		{
			loadFiles(files, function(files)
			{
				var jsSource     = '',
					stylusSource = '',
					stylusPath   = path.join(productPath, 'stylus'),
					cssPath      = path.join(productPath, 'css')
					;

				files.forEach(function(file)
				{
					switch(path.extname(file.name))
					{
						case '.js'   : jsSource += file.content; break;
						case '.styl' : stylusSource += file.content; break;
					}
				});

				if(compress)
				{
					var copyright = jsSource.substring(0, jsSource.indexOf('*/') + 2);
					jsSource = copyright + '\n' + compressSource(jsSource);
				}

				stylus(stylusSource)
					.set('filename', path)
					.set('compress', compress)
					.include(stylusPath)
					.define('url', stylus.url({ paths: [ cssPath ] }))
					.render(function(err, result)
					{
						if(err) throw err;
						complete(jsSource, result);
					});
			});
		});
	});

	function complete(jsSource, stylusSource)
	{
		var joinWith = compress ? '\\n' : '\\n' + '\\' + '\n',
			result
			;
		
		stylusSource = ";$.fn.textext.css = '" + stylusSource.split('\n').join(joinWith).replace(/'/g, '\\\'') + "';";
		result       = jsSource + stylusSource;

		fs.writeFile(sumFile, result);
		response.end(result);
	};
});

// Only listen on $ node server.js
if(!module.parent)
{
	app.listen(process.env.PORT || 3000);
	winston.info('Compressor ' + app.address().port);
}
