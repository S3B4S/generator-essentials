var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // this.composeWith(require.resolve('generator-npm-init/app')/*, options*/)
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