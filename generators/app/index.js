var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  method1() {
    this.log('method 1 just ran');
  }

  _private_method2() {
    this.log('method 2 just ran');
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('public/index.html'),
      { title: 'Templating with Yeoman' }
    );
    this.fs.copyTpl(
      this.templatePath('scss/main.scss'),
      this.destinationPath('public/main/main.scss'),
      { boxSizing: 'border-box'}
    );
  }
};