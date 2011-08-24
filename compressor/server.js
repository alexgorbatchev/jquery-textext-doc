var
	express = require('express'),
	winston = require('winston'),
	path    = require('path'),
	fs      = require('fs'),
	crypto  = require('crypto'),
	parser  = require('uglify-js').parser,
	uglify  = require('uglify-js').uglify
	;

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

var app = module.exports = express.createServer();

var SOURCE_PATH = fs.realpathSync(__dirname + '/products'),
	PRODUCTS    = { textext : [ '1.0' ] }
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

function loadFiles(product, version, files, callback)
{
	var loaded = 0,
		source = []
		;
	
	files.forEach(function(file, index)
	{
		file = path.join(SOURCE_PATH, product, version, file);

		path.exists(file, function(exists)
		{
			if(!exists)
			{
				source[index] = file;

				if(++loaded == files.length)
					callback(source);

				return;
			}

			fs.readFile(file, 'utf8', function(err, data)
			{
				if(err) throw err;
				source[index] = data;

				if(++loaded == files.length)
					callback(source);
			});
		})
	});
};

app.post('/build', function(request, response)
{
	var params   = request.body,
		files    = params.files,
		product  = PRODUCTS[params.product] ? params.product : null,
		version  = params.version,
		compress = params.compress == 'true',
		sum      = md5(compress.toString() + JSON.stringify(files) + product + version),
		sumFile  = path.join(SOURCE_PATH, product, version + '_cache', sum + '.txt')
		;

	if(PRODUCTS[product].indexOf(version) == -1)
		version = null;

	path.exists(sumFile, function(exists)
	{
		if(exists)
		{
			winston.info('Using cached file');
			response.sendfile(sumFile);
			return;
		}

		winston.info('Generating new file');

		loadFiles(product, version, files, function(source)
		{
			var result = source.join('\n\n\n');

			if(compress)
				result = compressSource(result);

			fs.writeFile(sumFile, result);

			response.end(result);
		});
	});
});

// Only listen on $ node server.js
if(!module.parent)
{
	app.listen(3000);
	winston.info('Compressor ' + app.address().port);
}
