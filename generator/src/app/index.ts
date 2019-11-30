import Generator = require('yeoman-generator');
import camelCase = require('camel-case');

import { getFullTSNPPrompts } from './get-full-prompts';
import { TSNPQueries } from './Types';

class Tsnp extends Generator {
  public answers: Generator.Answers = {};
  public promptMetaOpt: TSNPQueries = [];

  constructor(args: any, opts: any) {
    super(args, opts);
  }

  public async prompting() {
    this.promptMetaOpt = getFullTSNPPrompts.apply(this).queries;
    this.answers = await this.prompt(this.promptMetaOpt);
  }

  public writing() {
    this.log('src root:' + this.sourceRoot());
    this.log('dset path:' + this.destinationPath());

    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(),
      renderEJSMapping(this.answers, this.promptMetaOpt)
    );
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

    EJSMapping[camelCase(item._key)] = ans[item.name];
  }
  return EJSMapping;
}
