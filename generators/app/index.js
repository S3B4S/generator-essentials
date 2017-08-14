'use strict'

const _ = require('lodash')
const path = require('path')
const ini = require('ini')
var mkdirp = require('mkdirp');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // https://github.com/caseyWebb/generator-npm-init
  constructor() {
    super(...arguments)
    this.package = {}
  }

  initializing() {
    const defaults = _.reduce(
      {
        name: path.basename(this.destinationRoot()),
        version: '1.0.0',
        description: '',
        main: 'index.js',
        scripts: {
          test: 'echo "Error: no test specified" && exit 1'
        },
        keywords: [],
        license: 'ISC'
      },
      (memo, v, k) => this.options[`skip-${k}`]
        ? memo
        : _.extend(memo, { [k]: v }),
      {}
    )

    if (!this.options.repository && !this.options.repo && this.fs.exists('.git/config')) {
      const gitConfigIni = this.fs.read('.git/config')

      if (gitConfigIni) {
        const gitConfig = ini.parse(gitConfigIni)
        this.options['skip-repo'] = true
        this.options.repository = {
          type: 'git',
          url: gitConfig['remote "origin"'] ? gitConfig['remote "origin"'].url : ''
        }
      }
    }

    const existing = this.fs.readJSON('package.json')

    const options = _.reduce(this.options, (memo, v, k) =>
      k.indexOf('skip-') === 0
        ? memo
        : _.extend(memo, { [k]: v }),
      {})

    if (this.options['skip-test']) {
      delete defaults.scripts.test
    }

    const aliases = {
      author: this.options.author,
      repository: this.options.repo,
      scripts: {
        test: this.options.test
      }
    }

    _.merge(
      this.package,
      defaults,
      existing,
      options,
      aliases)
  }

  prompting() {
    const done = this.async()
    const prompts = []

    if (!this.options['skip-name']) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'name:',
        default: this.package.name
      })
    }

    if (!this.options['skip-version']) {
      prompts.push({
        type: 'input',
        name: 'version',
        message: 'version:',
        default: this.package.version
      })
    }

    if (!this.options['skip-description']) {
      prompts.push({
        type: 'input',
        name: 'description',
        message: 'description:',
        default: this.package.description
      })
    }

    if (!this.options['skip-main']) {
      prompts.push({
        type: 'input',
        name: 'main',
        message: 'main point:',
        default: this.package.main
      })
    }

    if (!this.options['skip-test']) {
      prompts.push({
        type: 'input',
        name: 'test',
        message: 'test command:',
        default: this.package.scripts.test
      })
    }

    if (!this.options['skip-repo']) {
      prompts.push({
        type: 'input',
        name: 'repo',
        message: 'git repository:',
        default: this.package.repository || ''
      })
    }

    if (!this.options['skip-keywords']) {
      prompts.push({
        type: 'input',
        name: 'keywords',
        message: 'keywords (space-delimited):',
        default: this.package.keywords ? this.package.keywords.join(' ') : ''
      })
    }

    if (!this.options['skip-author']) {
      prompts.push({
        type: 'input',
        name: 'author',
        message: 'author:',
        default: this.package.author
      })
    }

    if (!this.options['skip-license']) {
      prompts.push({
        type: 'input',
        name: 'license',
        message: 'license:',
        default: this.package.license
      })
    }

    // Packages to install
    prompts.push({
      type: 'checkbox',
      name: 'dependencies',
      message: 'Packages to install',
      choices: [
        {
          name: 'jeet',
          checked: true
        },
        {
          name: 'typi',
          checked: true
        }
      ]
    })

    // Ask to install task runner
    prompts.push({
      type: 'confirm',
      name: 'task',
      message: 'Do you want to install Gulp along its pre-configured tasks?'
    })

    this.prompt(prompts).then((res) => {
      
      // Set package.json
      if (res.name) {
        this.package.name = res.name
      }
      if (res.version) {
        this.package.version = res.version
      }
      if (res.description) {
        this.package.description = res.description
      }
      if (res.main) {
        this.package.main = res.main
      }
      if (res.test) {
        this.package.scripts = _.extend({}, this.package.scripts, { test: res.test }) 
      }
      if (res.keywords && !res.keywords.match(/^\w?$/)) {
        this.package.keywords = res.keywords.split(' ')
      }
      if (res.repo) {
        this.package.repository = res.repo
      }
      if (res.author) {
        this.package.author = res.author
      }
      if (res.license) {
        this.package.license = res.license
      }

      // Iterate through selected dependencies and install them
      res.dependencies.forEach(dependency => {
        this.npmInstall(dependency, { 'save-dev': true });
      })

      // Install task runner depending on answer
      if (res.task) {
        this.npmInstall([
          'gulp',
          'gulp-sass',
          'browser-sync'
        ], { 'save-dev': true });
      }

      // Copy src/ folder over
      this.fs.copyTpl(
        this.templatePath(''),
        this.destinationPath(''),
        { title: res.name }
      );

      // Generate node_modules/
      mkdirp('node_modules', (err) => {
        if (err) this.error(err)
          else this.log('Generate empty node_modules\\')
      });

      // Generate node_modules/
      mkdirp('src/img', (err) => {
        if (err) this.error(err)
          else this.log('Generate empty src\\img\\')
      });

      done()
    })
  }

  writing() {
    const junk = [
      'env',
      'resolved',
      'namespace',
      'argv',
      'repo',
      'test',
      '_'
    ]

    junk.forEach((e) => delete this.package[e])

    this.fs.writeJSON(this.destinationPath('package.json'), this.package)
  }
};