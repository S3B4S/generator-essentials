var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }]).then((answers) => {
      this.fs.copyTpl(
        this.templatePath(''),
        this.destinationPath(''),
        { title: answers.name }
      );
      mkdirp.sync('node_modules');
    });
  }

  installingNpmpackages() {
    this.npmInstall([
      'typi',
      'jeet',
      'gulp',
      'gulp-sass',
      'browser-sync'
    ], { 'save-dev': true });
  }
};