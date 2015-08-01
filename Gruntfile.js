module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      css: {
        src: 'css/main.css',
        dest: 'css/main.min.css'
      }
    },
    uglify: {
      js: {
        files: {
          'js/main.min.js' : ['js/main.js']
        }
      }
    },
    watch: {
      files: ['css/*', 'js/*'],
      tasks: ['cssmin', 'uglify']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', [ 'cssmin:css', 'uglify:js' ]);
}