# generator-ts-np

Yet another [yeoman](https://yeoman.io/) generator for building npm packages with TypeScript. 

![](https://github.com/vajahath/generator-ts-np/workflows/Build/badge.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/vajahath/generator-ts-np.svg)](https://greenkeeper.io/)

## Install

Requires Node >= 8.

Install [yeoman](https://yeoman.io/) first

```sh
npm i -g yo
```

Then install this generator from npm,

```sh
npm i -g generator-ts-np
```

From [Github Package Registry](https://github.com/vajahath/generator-ts-np/packages). ([Guide](https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages)).

## Usage

```sh
$ mkdir my-new-package # new dir
$ cd my-new-pacakge # go to the package dir
$ yo ts-np # use yeoman
```

## Why

- No global dependencies.
- Written in TypeScript and when publishing, definition(`.d.ts`) will also ship with this package.
- Prettier, Eslint
- Support for [Github Package Registry](https://github.com/features/packages) and [NPM](https://npmjs.com)
- Tests uses [Jest](https://jestjs.io) (tests are also written in TypeScript)
- Pre-publish hook for build (so you never miss it)
- Automated build and deployments (using Github Actions) (eg: [this package]())
- Lint rules adopted from Google Repo (which means higher coding standard)
- Publishes only the required files (less bundle size)

## Directory Structure

`$ yo ts-np` command will [ask you a few questions](https://github.com/vajahath/generator-ts-np/wiki/ts-np-3#some-questions-generator-will-ask) and generate the below structure.

- You write your typescript files in `/src`.
- Write their tests in `/tests`
- `/src` compiling creates `/dist` directory which is used for publishing

The generator produces following files.

```
.
├── .eslintignore
├── .eslintrc.json
├── .github
│   └── workflows
│       ├── Build.yml_disabled
│       └── Deploy.yml_disabled
├── .gitignore
├── .npmignore
├── .prettierrc
├── .yo-rc.json
├── LICENSE
├── README.md
├── gulpfile.js
├── jest.config.json
├── package.json
├── src
│   └── index.ts
├── tests
│   └── index.spec.ts
├── tsconfig.json
└── tsconfig.spec.json
```

## Handy npm scripts

- `npm test`: [🌟](https://github.com/vajahath/generator-ts-np/wiki/ts-np-3#some-npm-scripts-and-their-uses) compiles typescript (`npm run build`) and run tests.
- `npm run build`: compiles src and tests files. 
- `npm run lint`: runs eslint and prettier checks.

[See other scripts and their uses](https://github.com/vajahath/generator-ts-np/wiki/ts-np-3#some-npm-scripts-and-their-uses)

## Automated Build 🧪 and Deployments ✅

- Continues integration: run tests when code pushed.
- Continues deployment: run tests and publish the package when a git release is published.

By default, this feature is disabled for convenience. [You can enable it in a few steps 🍼](https://github.com/vajahath/generator-ts-np/wiki/ts-np-v3.x-help#automated-build--and-deployment-).

## Licence

MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
