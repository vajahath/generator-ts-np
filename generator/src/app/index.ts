import { join as pathJoin } from 'path';
import Generator = require('yeoman-generator');
import camelCase = require('camel-case');

import { getFullTSNPPrompts } from './get-full-prompts';
import { TSNPQueries } from './Types';

class Tsnp extends Generator {
  public answers: Generator.Answers = {};
  public promptMetaOpt: TSNPQueries = [];

  constructor(args: any, opts: any) {
    super(args, opts);

    // set root
    this.sourceRoot(pathJoin(__dirname, '..', '..', 'template'));
  }

  public async prompting() {
    try {
      this.promptMetaOpt = getFullTSNPPrompts.apply(this).queries;
      console.log(this.promptMetaOpt);
      this.answers = await this.prompt(this.promptMetaOpt);
      console.log('ans', this.answers);
    } catch (err) {
      console.log(err);
    }
  }

  public async writing() {
    try {
      this.fs.copyTpl(
        this.templatePath('**/*'),
        this.destinationRoot(),
        {
          ...renderEJSMapping(this.answers, this.promptMetaOpt),
          ...{
            scopedPackageName: getScopedPackageName(
              this.answers.npmScope,
              this.answers.packageName
            )
          }
        },
        {},
        { globOptions: { dot: true } }
      );
    } catch (err) {
      this.log(err);
    }
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

  console.log('EJSMapping', EJSMapping);
  return EJSMapping;
}

function getScopedPackageName(scope: string, packageName: string) {
  return `${scope ? `${scope}/` : ''}${packageName}`;
}
