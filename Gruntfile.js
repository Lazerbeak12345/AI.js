module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'AI.js', 'strongEval.js']
		},
		/*min: {// see http://stackoverflow.com/a/13749226
			js: {
				src: 'AI.js',
				dest: 'AI.min.js'
			}
		},*/
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-min');
	grunt.registerTask('default', ['jshint'/*,'min'*/]);
	
	
};
