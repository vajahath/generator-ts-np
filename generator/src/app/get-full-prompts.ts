import {
  Generator,
  GetRenderPromptVariablesResult,
  TSNPQueries
} from './Types';

import { getRenderPromptVariables } from './name-mapping';

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
      prefix: '@',
      suffix: '/',
      message:
        'What is your npm scope? ' +
        'If you want to publish at global scope, leave this field empty.' +
        ' It is always nice to publish packages under a scope. ' +
        'Learn more about scopes here: https://docs.npmjs.com/misc/scope',
      store: true
    }
  ];

  return {
    queries: [...queries, userInputIndependentQueries],
    scopedPackageNameKey
  };
}
