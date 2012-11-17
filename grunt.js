module.exports = function(grunt)
{
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch'); 
    grunt.loadNpmTasks('grunt-contrib-jade'); 
    grunt.loadNpmTasks('grunt-clean');

    grunt.initConfig({
        clean : {
            folder: 'build/'
        },

        jade: {
            debug : {
                options : {
                    data : {
                        debug: true,
                        timestamp: '<%= grunt.template.today() %>',
                        pretty: true
                    }
                },
                files: getJadeFiles(__dirname + '/source')
            }
        },

        less : {
            development : {
                options : {
                    paths : [ 'source/less' ],
                    compress : false
                },
                files : {
                    'build/css/main.css' : 'source/less/main.less'
                }
            }
        },

        copy : {
            build : {
                files : {
                    'build/images/' : 'source/images/**',
                    'build/js/'     : 'source/js/**'
                }
            }
        },

        watch : {
            css : {
                files : 'source/css/**',
                tasks : [ 'less' ]
            },
            jade : {
                files : 'source/**.jade',
                tasks : [ 'jade:debug' ]
            },
            public : {
                files : '<%= copy.files %>',
                tasks : [ 'copy:public' ]
            }
        }
    });

    grunt.registerTask('default', 'clean copy less jade:debug');
};

function getJadeFiles(dir)
{
    var fs        = require('fs'),
        path      = require('path'),
        minimatch = require('minimatch')
        ;

    function walkSync(dir, match)
    {
        var result = [],
            files  = fs.readdirSync(dir)
            ;

        for(var i = 0; i < files.length; i++)
        {
            var file = dir + '/' + files[i];

            if(fs.statSync(file).isDirectory())
                result = result.concat(walkSync(file, match));

            else if(minimatch(file, match))
                result.push(file);
        }

        return result;
    }

        
    function mapToBuild(list)
    {
        var result = {};

        for(var i = 0; i < list.length; i++)
        {
            var file = list[i];
            result['build/' + path.basename(file)] = file.replace(__dirname + '/', '');
        }

        return result;
    }
    
    return mapToBuild(walkSync(dir, '**/*.jade'));
}
