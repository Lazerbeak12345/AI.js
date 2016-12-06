module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'AI.js', 'strongEval.js']
		},
		uglify:{
			my_target: {
				files: {
					'AI.min.js': ['AI.js'],
				}
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['jshint','uglify']);
	
	
};
