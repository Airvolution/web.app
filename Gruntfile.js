module.exports = function (grunt) {

    // Force use of Unix newlines
    //grunt.util.linefeed = '\n';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        shell: {
            webpack:{
                command: "webpack"
            }
        },
        webpack: {
            base: {
                entry: './app.ts',
                output: {
                    filename: 'build/app/app.js'
                },
                resolve: {
                    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
                },
                module: {
                    loaders: [
                        {test: /\.ts$/, loader: 'ts-loader'}
                    ]
                }
            }
        },
        subgrunt: {
            styles: {
                'bower_components/airu.web.styles': 'default'
            }
        },
        typescript: {
            dev: {
                src: ['**/*.ts','!bower_components/**/*','!node_modules/**/*','!typings/**/*'],
                options: {
                    sourceMap:true,
                    module: 'amd',
                    target: 'es5'
                }
            },
            release: {
                src: ['**/*.ts','!bower_components/**/*','!node_modules/**/*','!**/*.d.ts'],
                options: {
                    sourceMap: false,
                    module: 'amd',
                    target: 'es5'
                }
            }
        },
        copy: {
            templates: {
                src: 'app/**/*.html',
                dest: 'build/app/templates/',
                expand:true,
                flatten:true
            },
            main: {
                nonull: true,
                src: 'index.html',
                dest: 'build/index.html'
            },
            main_styles: {
                nonull: true,
                src: 'bower_components/airu.web.styles/styles/main.css',
                dest: 'build/main_styles.css'
            },
            app_styles: {
                nonull: true,
                src: 'main.css',
                dest: 'build/main_app.css'
            },
            images_styles: {
                src: 'bower_components/airu.web.styles/app/assets/images/*',
                dest: 'build/static/images/',
                flatten:true,
                expand:true
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
                srcPrefix: 'bower_components'
            },
            libs: {
                options: {
                    srcPrefix: 'bower_components',
                    destPrefix: 'build/static/lib'
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
                    'requirejs': 'requirejs*/*.js',
                    'leaflet': 'leaflet/dist/**/*',
                    'leaflet-heatmap': 'leaflet-heatmap/dist/*',
                    'ui-leaflet': 'ui-leaflet/dist/ui-leaflet.js',
                    'angular-simple-logger': 'angular-simple-logger/dist/angular-simple-logger.js'
                }
            }
        },
        concat: {
            styles: {
                src: ['build/main_app.css', 'build/main_styles.css'],
                dest: 'build/static/css/app.css',
                nonull: true
            }
        },
        cssmin: {
            app: {
                src: 'build/static/css/app.css',
                dest: 'build/static/css/app.min.css'
            }
        },
        clean: {
            all: ['build/**/*', 'build/*'],
            build: ['build/main_styles.css', 'build/main_app.css', 'build/static/css/app.css', 'build/static/libs/js/npm.js']
        }
    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-shell');


    grunt.registerTask('build:app_dev', ['webpack:base', 'copy:main','copy:templates']);
    grunt.registerTask('build:app_release', ['webpack:base','copy:main','copy:templates']);
    grunt.registerTask('build:libs', ['bowercopy:libs']);
    grunt.registerTask('build:styles', ['subgrunt:styles', 'copy:app_styles', 'copy:main_styles', 'concat:styles', 'cssmin:app', 'copy:images_styles']);
    grunt.registerTask('build:dependencies', ['build:styles']);
    grunt.registerTask('build:dev', ['clean:all', 'build:libs', 'build:dependencies', 'build:app_dev', 'clean:build']); //release build
    grunt.registerTask('build:release', ['clean:all', 'build:libs', 'build:dependencies', 'build:app_release', 'clean:build']); //release build
    grunt.registerTask('build:all-dirty', ['clean:all', 'build:libs', 'build:dependencies', 'build:app']); //don't clean generated files

    // Default task
    grunt.registerTask('default', ['build:dev']);
};

/*  'jquery': 'jquery/dist/*',
    'angular/js': 'angular/angular*.js',
    'angular-resource/js': 'angular-resource/angular-resource*.js',
    'angular-route/js': 'angular-route/angular-route*.js'


 require_temp: {
 src: ['app.js*', 'main.js*'],
 dest: 'build/app/',
 cwd:'build/',
 flatten:true,
 },

 build: ['build/main_styles.css', 'build/main_app.css', 'build/static/css/app.css', 'build/static/libs/js/npm.js','build/app.js*','build/main.js*']


 */

//typescript: {
//    require_dev: {
//        options: {
//            sourceMap: true,
//                module: 'amd',
//                target: 'es5',
//        },
//        src: ['app.ts','main.ts'],
//            dest: 'build'
//    },
//    dev: {
//        options: {
//            sourceMap: true,
//                module: 'amd',
//                target: 'es5',
//        },
//        src: ['**/*.ts','!app.ts','!main.ts','!node_modules/**/*.ts','!bower_components/**/*.ts',"!**/*.d.ts"],
//            dest: 'build/app'
//    },
//    require_release: {
//        options: {
//            sourceMap: false,
//                module: 'amd',
//                target: 'es5',
//        },
//        src: ['app.ts','main.ts'],
//            dest: 'build'
//    },
//    release: {
//        options: {
//            sourceMap: false,
//                module: 'amd',
//                target: 'es5',
//        },
//        src: ['**/*.ts','!app.ts','!main.ts','!node_modules/**/*.ts','!bower_components/**/*.ts',"!**/*.d.ts"],
//            dest: 'build/app'
//    }
//},