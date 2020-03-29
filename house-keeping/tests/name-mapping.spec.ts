import { getRenderPromptVariables } from '../dist/mappings/name-mapping';
import { GetRenderPromptVariablesResult } from '../dist/mappings/Types';

describe('testing base name mapping', () => {
  test('testing with mocked yeoman generator context', () => {
    let result: GetRenderPromptVariablesResult = {
      queries: [],
      scopedPackageNameKey: 'x',
      versionKey: 'y',
    };

    {
      class Mock {
        public appname = 'appname';
        public user = {
          github: { username: 'github-username' },
          git: { name: 'git-name', email: 'git-email' },
        };
        public destinationRoot() {
          return __dirname;
        }

        constructor() {
          result = getRenderPromptVariables.call(this as any);
        }
      }
      new Mock();
    }

    expect(result.queries.length).not.toBe(0);
    expect(result.scopedPackageNameKey).not.toBe('x');
  });
});
