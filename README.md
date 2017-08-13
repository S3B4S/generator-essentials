# Generator-essentials

## What is it?

### Table of contents
- [Get started](#getstarted)
- [What does this include?](#include)
- [What does this generate?](#generate)

<a name="getstarted"/>

## Get started

Unfortunately, at the moment `npm init` hasn't been configured within the generator itself. So for now this still has to happen manually.
For more information on npm, see [here](https://docs.npmjs.com/getting-started/what-is-npm)

### Installing Yeoman

1. Install yeoman `npm install -g yo`

2. Install this generator `npm install -g generator-essentials`

### Generating the project

1. Create a new directory that contains your project, this is the root directory.

2. Navigate to inside this directory from terminal.

3. Run `npm init`.

4. Run `yo essentials`.
    - You directory name is the default one, but you can set a new one.

`npm install` isn't necessary, this is taken care of by the generator.

<a name="include"/>

## What does this include?
- [Jeet](http://jeet.gs/)
- [Typi](https://github.com/zellwk/typi)

<a name="generate"/>

## What does this generate?
```
├── node_modules/
├─┬ src/
│ ├─┬ js/
│ ├─┬ scss/
│ | ├─┬ base/
│ | | ├── _normalize.scss
│ | | └── _typography.scss
│ | ├─┬ components/
│ | | └── _buttons.scss
│ | ├─┬ helpers/
│ | | └── _variables.scss
│ | ├─┬ layout/
│ | | └── _grid.scss
│ | └─┬ vendor/
│ |   └── _thirdpartysomething.scss
│ └── index.html
└── gulpfile.js
```