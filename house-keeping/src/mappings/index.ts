import { GetRenderPromptVariablesResult } from './Types';
import { getFullTSNPPrompts } from './get-full-prompts';

export function getEjsMapping(): GetRenderPromptVariablesResult {
  let result: GetRenderPromptVariablesResult = {
    queries: [],
    scopedPackageNameKey: 'will-be-populated-by-new K()',
    versionKey: 'version'
  };

  class Mock {
    public appname = 'appname';
    public user = {
      github: { username: 'github-username' },
      git: { name: 'git-name', email: 'git-email' }
    };
    public destinationRoot() {
      return __dirname;
    }
    constructor() {
      result = getFullTSNPPrompts.call(this as any);
    }
  }

  {
    new Mock();
  }

  return result;
}
