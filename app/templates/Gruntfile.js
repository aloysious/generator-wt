module.exports = function(grunt) {
    grunt.initConfig({
        // 配置文件，参考package.json配置方式，必须设置项是
        // name, version, author
        // name作为gallery发布后的模块名
        // version是版本，也是发布目录
        // author必须是{name: "xxx", email: "xxx"}格式
        pkg: grunt.file.readJSON('package.json'),
        //banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        //    '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
        //    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        //    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        //    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


		// jshint语法检查
		jshint: {
			options: {
				ignores: ["src/config.js"]
			},
			all: ["src/**/*.js"]
		},

		// less->css
		less: {
			dynamic_mappings: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.less'],
						dest: 'src/',
						ext: '.css'
					}
				]
			}
		},
		
		// Configuration to be run (and then tested).
		wtbuild: {
			compile: {
				options: {
					compileOnly: true,
					domain: '<%= pkg.domain%>',
					group: '<%= pkg.group%>',
					project: '<%= pkg.project%>',
					version: '<%= pkg.version%>'
				},
				files: [{
					src: 'src/page/*.{shtml,html}',
					dest: 'build/page'
				}]
			},
			dep: {
				options: {
					packages: [{
						name: 'widget',
						path: 'src/'
					}, {
						name: 'util',
						path: 'src/'
					}],
					depExt: '.dep',
					depOnly: true,
					depFilePath: 'src/mods.js'
				},
				files: [{
					src: 'src/**/*.js'
				}]
			}
		},

        // 打包后压缩文件
        // 压缩文件和入口文件一一对应
        uglify: {
			dynamic_mappings: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.js'],
						dest: 'build/',
						ext: '-min.js'
					}
				]
			}
        },

		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: ['**/*.{js,css}'], 
						dest: 'build/'
					}
				]
			}
		}
    });

    // 使用到的任务，可以增加其他任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-wtbuild');
    grunt.registerTask('buildmods', ['wtbuild:dep']);
    grunt.registerTask('default', ['jshint', 'less', 'wtbuild:dep', 'wtbuild:compile', 'uglify', 'copy']);
    grunt.registerTask('build', ['jshint', 'less', 'wtbuild:dep', 'wtbuild:compile', 'uglify', 'copy']);
};
