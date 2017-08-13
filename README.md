# Generator-essentials

## Description

So, I really like using very specific packages which do their job very well, [Jeet](http://jeet.gs/) and [Typi](https://github.com/zellwk/typi) for example. As I kept expanding my library of must-have small tools that make my life so much easier I started noticing that setting up the project took longer than I wanted it to be. Wouldn't it be great if I could use templates and have everything generated and installed with the command line? Yes, it would be, and that's why `generator-essentials` has been created. And it's all yours to use aswell! :smile:

- No bloated stuff, only the code that you actually need.
- A scss structure that follows a philosophy, to keep all your projects consistent.
- Flexible, responsive grid (but really).
- Responsive typography.

### Table of contents
- [Get started](#getstarted)
- [What does this include?](#include)
- [What does this generate?](#generate)
- [Planned features](#features)

<a name="getstarted"/>

## Get started

Unfortunately, at the moment `npm init` hasn't been configured within the generator itself. So for now this has to happen manually.
For more information on npm, see [here](https://docs.npmjs.com/getting-started/what-is-npm).

### Installing Yeoman

1. Install yeoman `npm install -g yo`

2. Install this generator `npm install -g generator-essentials`

### Generating the project

1. Create a new directory that contains your project, this is the root directory.

2. Navigate inside this directory from terminal.

3. Run `npm init`.

4. Run `yo essentials`.
    - By default, your directory name will be the project name, but you can set a new one.

`npm install` isn't necessary, this is taken care of by the generator.

<a name="include"/>

## Tasks

This project makes use of [Gulp](https://gulpjs.com/) to perform its tasks. To install this globally (if you haven't already):

`npm install gulp-cli -g`

Once installed, you can run the following tasks:

Task  | Description
:---- | :---------- 
`gulp`| Launces your project in browser. Auto-refresh & scss compiles to css on save.

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

<a name="features"/>

## Planned features
- Let the generator execute `npm init` in the way it's supposed to be.

- Provide options and be able to pass these as flags.
  - Other preprocessor options beside SCSS.
  - Include comments in code.

- Choose which npm packages you want.

## Thanks

Thanks MacMeep for testing the package! :tada: