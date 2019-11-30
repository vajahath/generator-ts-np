import { Question } from 'yeoman-generator';
import Generator = require('yeoman-generator');

export type TSNPQuery = Question & {
  _key?: string;
};

export interface GetRenderPromptVariablesResult {
  queries: TSNPQueries;
  scopedPackageNameKey: string;
}

export { Generator };

export type TSNPQueries = TSNPQuery[];
