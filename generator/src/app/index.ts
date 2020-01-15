import { join as pathJoin, sep } from 'path';
import Generator = require('yeoman-generator');
import { camelCase } from 'camel-case';
import updateNotifier = require('update-notifier');
import chalk = require('chalk');
import rename = require('gulp-rename');

import { getFullTSNPPrompts } from './get-full-prompts';
import { TSNPQueries } from './Types';
import { convertToOriginalName } from './name-conversion';

const pkg = require('../../package.json');
updateNotifier({ pkg }).notify();

class Tsnp extends Generator {
  public answers: Generator.Answers = {};
  public promptMetaOpt: TSNPQueries = [];

  constructor(args: any, opts: any) {
    super(args, opts);

    // set root
    this.sourceRoot(pathJoin(__dirname, '..', '..', 'template'));
    this.registerTransformStream(
      rename(filePath => {
        if (filePath.basename?.includes('yo-rc')) {
          return filePath;
        }

        if (filePath.basename || filePath.extname) {
          filePath.basename = convertToOriginalName(
            (filePath.basename || '') + (filePath.extname || '')
          );
        }

        if (filePath.dirname && filePath.dirname !== '.') {
          filePath.dirname = filePath.dirname
            .split(sep)
            .map(val => convertToOriginalName(val))
            .join(sep);
        }

        filePath.extname = '';
      })
    );
  }

  public initializing() {
    this.log(
      chalk.yellow.bold(`
 📦 TS-NP-GENERATOR 💫`) +
        chalk.gray(`
 =====================`) +
        chalk.white(`
 For generating Node.js packages with TypeScript.`) +
        chalk.gray(`

 Asking a few questions for generating the base structure.
 If you have any doubts,
 see https://tinyurl.com/szponxx\n`)
    );
  }
  public async prompting() {
    try {
      this.promptMetaOpt = getFullTSNPPrompts.apply(this).queries;
      // console.log(this.promptMetaOpt);
      this.answers = await this.prompt(this.promptMetaOpt);
      // console.log('ans', this.answers);
    } catch (err) {
      this.log(err);
      throw err;
    }
  }

  public async writing() {
    try {
      const data = {
        ...renderEJSMapping(this.answers, this.promptMetaOpt),
        ...{
          scopedPackageName: getScopedPackageName(
            this.answers.npmScope,
            this.answers.packageName
          )
        },
        tsnpVersion: pkg.version
      };

      this.fs.copyTpl(
        this.templatePath('**/*'),
        this.destinationRoot(),
        data,
        {},
        { globOptions: { dot: true } }
      );
    } catch (err) {
      this.log(err);
    }
  }

  public end() {
    this.log(`\n 🎉 ${chalk.gray('Scaffolded! You can now run')} ${chalk.yellow(
      'npm install'
    )} or ${chalk.yellow('yarn')}.
    ${chalk.gray(`Learn more at https://www.npmjs.com/package/generator-ts-np`)}
    Build great things! Happy coding 💖\n`);
  }
}

export = Tsnp;

function renderEJSMapping(
  ans: Generator.Answers,
  meta: TSNPQueries
): { [key: string]: string } {
  const EJSMapping: { [key: string]: string } = {};

  for (const item of meta) {
    if (!item._key) {
      continue;
    }

    if (!item.name) {
      throw new Error(
        `Invalid Prompt options. A prompt item doesn't have a name field.`
      );
    }

    EJSMapping[camelCase(item.name)] = ans[item.name];
  }

  // console.log('EJSMapping', EJSMapping);
  return EJSMapping;
}

function getScopedPackageName(scope: string, packageName: string) {
  return `${scope ? `@${scope}/` : ''}${packageName}`;
}
