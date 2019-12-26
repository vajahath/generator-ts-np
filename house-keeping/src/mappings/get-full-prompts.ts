/**
 * This file is copied from house-keeping/src/mappings/get-full-prompts.ts.
 * So edit this file directly from there.
 */

import {
  Generator,
  GetRenderPromptVariablesResult,
  TSNPQueries
} from './Types';

import { getRenderPromptVariables } from './name-mapping';
import chalk = require('chalk');

export function getFullTSNPPrompts(
  this: Generator
): GetRenderPromptVariablesResult {
  const { scopedPackageNameKey, queries } = getRenderPromptVariables.apply(
    this
  );

  const userInputIndependentQueries: TSNPQueries = [
    {
      type: 'input',
      name: 'npmScope',
      message:
        'What is your npm scope? ' +
        chalk.gray(
          "(If you want to publish at global scope, leave this field empty(or empty string '')."
        ) +
        chalk.gray(' It is always nice to publish packages under a scope. ') +
        chalk.gray(
          'Learn more about scopes here: https://docs.npmjs.com/misc/scope)'
        ),
      store: true
    }
  ];

  return {
    queries: [...queries, ...userInputIndependentQueries],
    scopedPackageNameKey
  };
}
