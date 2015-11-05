module.exports = function (grunt) {

    // Force use of Unix newlines
    //grunt.util.linefeed = '\n';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
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
        watch: {
            options: {
                liveReload: true
            },
            styles: {
                // Which files to watch (all .modules files)
                files: ['styles/**/*.less', 'app/assets/**/*.less'],
                tasks: ['less', 'concat','cssmin'],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('build:app', function(){

    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.config.set('typescript_src',['app/**/*.ts']);
    grunt.registerTask('default', ['typescript','build:app']);
};