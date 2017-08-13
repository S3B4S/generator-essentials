var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }]).then((answers) => {
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: answers.name }
      );
      this.fs.copyTpl(
        this.templatePath('scss'),
        this.destinationPath('public/scss')
      );
    });
  }
};