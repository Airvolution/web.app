module.exports = function (grunt) {

    // Force use of Unix newlines
    //grunt.util.linefeed = '\n';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
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
            custom: {
                nonull: true,
                src: '<%= copy_src %>',
                dest: '<%= copy_dst %>',
                expand: true,
                flatten: true
            }
        },
        concat: {
            styles: {
                src: ['build/main_app.css','build/main_styles.css'],
                dest: 'build/static/css/app.css',
                nonull:true
            }
        },
        cssmin: {
            app: {
                src: 'build/static/css/app.css',
                dest: 'build/static/css/app.min.css'
            }
        },
        clean: {
            all: ['build/**/*','build/*'],
            build: ['build/main_styles.css', 'build/main_app.css', 'build/static/css/app.css']
        }
    });
    grunt.config.set('typescript_src',['app/**/*.ts']);

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-subgrunt');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('copy:jquery',function(){
        var done = this.async();
        setTimeout(function(){
            grunt.config.set('copy_src','bower_components/jquery/dist/jquery.min.js');
            grunt.config.set('copy_dst', 'build/static/lib/js/');
            grunt.task.run('copy:custom');
            done();
        });
    });

    grunt.registerTask('copy:bootstrap-css', function(){
        var done = this.async();
        setTimeout(function(){
            grunt.config.set('copy_src','bower_components/bootstrap/dist/css/bootstrap.min.css');
            grunt.config.set('copy_dst', 'build/static/lib/css/');
            grunt.task.run('copy:custom');
            done();
        });
    });

    grunt.registerTask('copy:bootstrap-js', function(){
        var done = this.async();
        setTimeout(function(){
            grunt.config.set('copy_src','bower_components/bootstrap/dist/js/bootstrap.min.js');
            grunt.config.set('copy_dst', 'build/static/lib/js/');
            grunt.task.run('copy:custom');
            done();
        });
    });

    grunt.registerTask('copy:bootstrap', ['copy:bootstrap-css', 'copy:bootstrap-js']);

    grunt.registerTask('copy:angular-js',function(){
        var done = this.async();
        setTimeout(function(){
            grunt.config.set('copy_src','bower_components/angular/angular.min.js');
            grunt.config.set('copy_dst', 'build/static/lib/js//');
            grunt.task.run('copy:custom');
            done();
        });
    });

    grunt.registerTask('copy:angular-resource', function(){
        var done = this.async();
        setTimeout(function(){
            grunt.config.set('copy_src','bower_components/angular-resource/angular-resource.min.js');
            grunt.config.set('copy_dst', 'build/static/lib/js/');
            grunt.task.run('copy:custom');
            done();
        });
    });

    grunt.registerTask('copy:angular', ['copy:angular-js','copy:angular-resource']);
    grunt.registerTask('build:app', ['typescript','copy:main']);
    grunt.registerTask('build:libs', ['copy:jquery', 'copy:bootstrap','copy:angular']);
    grunt.registerTask('build:styles', ['subgrunt:styles', 'copy:app_styles', 'copy:main_styles', 'concat:styles','cssmin:app']);
    grunt.registerTask('build:dependencies', ['build:styles']);
    grunt.registerTask('build:all', ['clean:all', 'build:libs', 'build:dependencies', 'build:app', 'clean:build']); //release build
    grunt.registerTask('build:all-dirty', ['clean:all', 'build:libs', 'build:dependencies', 'build:app']); //don't clean generated files

    // Default task
    grunt.registerTask('default', ['build:all']);
};