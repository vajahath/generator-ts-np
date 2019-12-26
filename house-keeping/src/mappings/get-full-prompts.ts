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

export function getFullTSNPPrompts(
  this: Generator
): GetRenderPromptVariablesResult {
  const {
    scopedPackageNameKey,
    queries,
    versionKey
  } = getRenderPromptVariables.apply(this);

  const userInputIndependentQueries: TSNPQueries = [];

  return {
    queries: [...queries, ...userInputIndependentQueries],
    scopedPackageNameKey,
    versionKey
  };
}
