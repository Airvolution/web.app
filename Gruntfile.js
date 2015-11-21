module.exports = function (grunt) {

    // Force use of Unix newlines
    //grunt.util.linefeed = '\n';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        shell: {
            test: {
                command: "browserify -p [ tsify --noImplicitAny ] -t debowerify app/**/*.ts -o build/static/js/app.js"
            }
        },
        browserify: {
            build: {
                options: {
                    plugin: ['tsify'],
                },
                files: {
                    'build/static/js/app.js' : ['app/app.ts']
                }
            }
        },
        subgrunt: {
            styles: {
                'bower_components/airu.web.styles': 'default'
            }
        },
        typescript: {
            base: {
                src: '<%= typescript_src %>',
                options: {
                    module: 'amd',
                    sourceMap: true,
                    target: 'es5'
                }
            }
        },
        copy: {
            main: {
                nonull: true,
                src: 'index.html',
                dest: 'build/index.html'
            },
            main_require: {
                nonull: true,
                src: 'main.js',
                dest: 'build/static/js/main.js'
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
                    'weather-icons/font': 'weather-icons/font'
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
    grunt.config.set('typescript_src', ['app/**/*.ts']);

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-shell');


    grunt.registerTask('build:app', ['browserify:build', 'copy:main']);
    grunt.registerTask('build:libs', ['bowercopy:libs']);
    grunt.registerTask('build:styles', ['subgrunt:styles', 'copy:app_styles', 'copy:main_styles', 'concat:styles', 'cssmin:app', 'copy:images_styles']);
    grunt.registerTask('build:dependencies', ['build:styles']);
    grunt.registerTask('build:all', ['clean:all', 'build:libs', 'build:dependencies', 'build:app', 'clean:build']); //release build
    grunt.registerTask('build:all-dirty', ['clean:all', 'build:libs', 'build:dependencies', 'build:app']); //don't clean generated files

    // Default task
    grunt.registerTask('default', ['build:all']);
};

/*  'jquery': 'jquery/dist/*',
    'angular/js': 'angular/angular*.js',
    'angular-resource/js': 'angular-resource/angular-resource*.js',
    'angular-route/js': 'angular-route/angular-route*.js'
 */