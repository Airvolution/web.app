var webpack = require('webpack');
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        less: {
            main: {
                options: {
                    strictMath: false,
                    sourceMap: true,
                    outputSourceFiles: false,
                    sourceMapURL: 'app.css.map',
                    sourceMapFilename: 'app/assets/styles/app.css.map'
                },
                files: [{
                    'app/assets/styles/app.css': 'app/assets/styles/app.less'
                }]
            }
        },
        "webpack":{
            bundle: {
                entry: "./app.ts",
                progress:true,
                output: {
                    filename: 'bundle.js'
                },
                devtool: 'source-map',
                resolve: {
                    extensions: ['','webpack.js','.web.js','.js','.ts']
                },
                plugins: [
                    new webpack.optimize.UglifyJsPlugin()
                ],
                module: {
                    loaders: [
                        {test: /\.ts/, loader: 'ts-loader'}
                    ]
                }
            },
            test: {
                entry: "./test.ts",
                progress:true,
                output: {
                    filename: 'bundle-test.js'
                },
                devtool: 'source-map',
                resolve: {
                    extensions: ['','webpack.js','.web.js','.js','.ts']
                },
                module: {
                    loaders: [
                        {test: /\.ts/, loader: 'ts-loader'}
                    ]
                }
            }

        },
        copy: {
            build: {
                files: [
                    {
                      nonull: true,
                        src: 'bundle.js',
                        dest: 'build/bundle.js'
                    },
                    {
                        nonull: true,
                        src: 'index.html',
                        dest: 'build/index.html'
                    },
                    {
                        nonull: true,
                        src: 'app/assets/styles/app.min.css',
                        dest: 'build/app.min.css'
                    },
                    {
                        nonull:true,
                        dest: 'build/',
                        src: [
                            'app.js',
                            'boot.js',
                            'main.js'

                        ]
                    },
                    {
                        nonull:true,
                        dest: 'build',
                        expand: true,
                        src: [
                            'lib/bootstrap/dist/**/*',
                            'lib/font-awesome/css/*',
                            'lib/font-awesome/fonts/*',
                            'lib/weather-icons/css/*',
                            'lib/weather-icons/font/*',
                            'lib/jquery/dist/*',
                            'lib/angular/angular.*js',
                            'lib/angular-resource/angular-resource.*js',
                            'lib/angular-route/angular-route.*js',
                            'lib/leaflet/dist/**/*',
                            'lib/Leaflet-HeatMap/dist/*',
                            'lib/ui-leaflet/dist/ui-leaflet.js',
                            'lib/angular-simple-logger/dist/angular-simple-logger.js',
                            'lib/d3/d3.js',
                            'lib/nvd3/build/*',
                            'lib/angular-nvd3/dist/angular-nvd3.js',
                            'lib/underscore/underscore.js',
                            'lib/requirejs/require.js',
                            'lib/requirejs-domready/domReady.js'
                        ]
                    },
                    {
                        dest: 'build',
                        expand: true,
                        src: 'app/**/*.js'
                    }
                ]
            }
        },
        concat:{
            less:{
                src: 'app/assets/styles/**/*.less',
                dest: 'app/assets/styles/app.less'            }
        },
        cssmin: {
            app: {
                src: 'app/assets/styles/app.css',
                dest: 'app/assets/styles/app.min.css'
            }
        },
        clean: {
            local: ['app.*css'],
            all: ['build/**/*', 'build/*', 'app.*css'],
            build: []
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('build:dev', ['clean:all', 'concat:less','less','cssmin:app', 'webpack:bundle','copy:build', 'clean:build']);
    grunt.registerTask('build:test', ['clean:local','concat:less','less','cssmin:app','webpack:test']);
    // Default task
    grunt.registerTask('default', ['clean:local', 'concat:less','less', 'cssmin:app','webpack:bundle']);
};
