/**
 * This file is copied from base-structure/_meta
 * So edit this file directly from there.
 */

import { Question } from 'yeoman-generator';
import Generator = require('yeoman-generator');

export type TSNPQuery = Question & {
  _key?: string;
};

export interface GetRenderPromptVariablesResult {
  queries: TSNPQueries;
  scopedPackageNameKey: string;
  versionKey: string;
}

export { Generator };

export type TSNPQueries = TSNPQuery[];
