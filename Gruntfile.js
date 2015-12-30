module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
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
                ]
            },
            custom: {
                nonull: true,
                src: '<%= copy_src %>',
                dest: '<%= copy_dst %>',
                expand: true,
                flatten: true
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
                    'underscore': 'underscore/underscore.js'
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
            all: ['build/**/*', 'build/*'],
            build: ['build/main_styles.css', 'build/main_app.css', 'build/static/css/app.css', 'build/static/libs/js/npm.js']
        }
    });
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bowercopy');

    // replace these with dev/prod build steps in the future
    //grunt.registerTask('build:app_dev', ['copy:main','copy:templates']);
    //grunt.registerTask('build:app_release', ['copy:main','copy:templates']);
    //grunt.registerTask('build:libs', ['bowercopy:libs']);
    //grunt.registerTask('build:styles', ['subgrunt:styles', 'copy:app_styles', 'copy:main_styles', 'concat:styles', 'cssmin:app', 'copy:images_styles']);
    //grunt.registerTask('build:dependencies', ['build:styles']);
    //grunt.registerTask('build:dev', ['clean:all', 'build:libs', 'build:dependencies', 'build:app_dev', 'clean:build']); //release build
    //grunt.registerTask('build:release', ['clean:all', 'build:libs', 'build:dependencies', 'build:app_release', 'clean:build']); //release build
    //grunt.registerTask('build:all-dirty', ['clean:all', 'build:libs', 'build:dependencies', 'build:app']); //don't clean generated files

    // Default task
    grunt.registerTask('default', ['clean:local', 'subgrunt:styles', 'concat:styles', 'cssmin:app','copy:dev']);
};
