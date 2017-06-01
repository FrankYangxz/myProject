module.exports = function(grunt)
{

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            compile: {
                files: {
                    'css/style.css': 'css/style.less'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'css/style.min.css': ['css/style.css', 'lib/chosen/chosen.css']
                }
            }
        },

        coffee:{
            compile: {
                files: {
                  'lib/common.js': ['lib/common.coffee']
                }
              }
        },

        watch: {
            less: {
                //用于监听less文件,当改变时自动编译成css文件
                files: ['css/*.less'],
                tasks: ['less','cssmin']
            },
            coffee: {
                //用于监听coffee文件,当改变时自动编译成js文件
                files: ['lib/*.coffee'],
                tasks: ['coffee']
            }
        },

    });

    // 加载包含 "less" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-less');
    // 加载包含 "cssmin" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 加载包含 "coffee" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-coffee');
    // 加载包含 "watch" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['watch']);

}