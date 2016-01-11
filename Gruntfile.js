module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        "http-server":{
          dev:{
              root:'build',
              port: 8084,
              host: "0.0.0.0",
              runInBackground: false
          }
        },
        typescript: {
            compile: {
                src: ['app/**/ *.ts', 'app.ts', 'boot.ts', 'main.ts'],
                options: {
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true
                }
            }
        },
        subgrunt: {
            styles: {
                '../airu.web.styles': 'default'
            },
            build: {
                projects: {
                    'lib/airu.web.styles': 'build'
                }
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        src: 'lib/airu.web.styles/app/assets/images/**/*',
                        dest: 'static/images/',
                        flatten: true,
                        expand: true
                    },
                ]

            },
            build: {
                files: [
                    {
                        nonull: true,
                        src: 'index.html',
                        dest: 'build/index.html'
                    },
                    {
                        nonull: true,
                        src: 'app.min.css',
                        dest: 'build/app.min.css'
                    },
                    {
                        src: 'lib/airu.web.styles/app/assets/images/**/*',
                        dest: 'build/static/images/',
                        flatten: true,
                        expand: true
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
        bowercopy: {
            options: {
                srcPrefix: 'lib'
            },
            libs: {
                options: {
                    srcPrefix: 'lib',
                    destPrefix: 'build/lib'
                },
                files: {
                    'bootstrap': 'bootstrap/dist/**/*',
                    'font-awesome/css': 'font-awesome/css',
                    'font-awesome/fonts': 'font-awesome/fonts',
                    'weather-icons/css': 'weather-icons/css',
                    'weather-icons/font': 'weather-icons/font',
                    'jquery': 'jquery/dist/*',
                    'angular/js': 'angular/angular*.js',
                    'angular-resource/js': 'angular-resource/angular-resource*.js',
                    'angular-route/js': 'angular-route/angular-route*.js',
                    'leaflet': 'leaflet/dist/**/*',
                    'leaflet-heatmap': 'leaflet-heatmap/dist/*',
                    'ui-leaflet': 'ui-leaflet/dist/ui-leaflet.js',
                    'angular-simple-logger': 'angular-simple-logger/dist/angular-simple-logger.js',
                    'd3': 'd3/d3.js',
                    'nvd3': 'nvd3/build/*',
                    'angular-nvd3': 'angular-nvd3/dist/angular-nvd3.js',
                    'underscore': 'underscore/underscore.js',
                }
            }
        },
        concat: {
            styles: {
                src: ['main.css', 'lib/airu.web.styles/app.css'],
                dest: 'app.css',
                nonull: true
            }
        },
        cssmin: {
            app: {
                src: 'app.css',
                dest: 'app.min.css'
            }
        },
        clean: {
            local: ['app.*css'],
            all: ['build/**/*', 'build/*', 'app.*css'],
            build: []
        }
    });
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('build:dev', ['clean:all', 'subgrunt:build', 'concat:styles', 'cssmin:app', 'copy:build', 'clean:build']);
    grunt.registerTask('serve',['http-server:dev']);
    // Default task
    grunt.registerTask('default', ['clean:local', 'subgrunt:styles', 'concat:styles', 'cssmin:app', 'copy:dev']);
};
