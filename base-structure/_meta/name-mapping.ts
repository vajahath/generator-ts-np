/**
 * This file is copied from base-structure/_meta
 * So edit this file directly from there.
 */

import {
  Generator,
  TSNPQueries,
  GetRenderPromptVariablesResult
} from './Types';

export function getRenderPromptVariables(
  this: Generator
): GetRenderPromptVariablesResult {
  const queries: TSNPQueries = [
    {
      _key: 'tsnp_package_name',
      type: 'input',
      name: 'packageName',
      message: 'What is your npm package name without scope?',
      default: this.appname
    },
    {
      _key: '__tsnp_github_scope',

      type: 'input',
      name: 'githubUsername',
      message:
        'What is your Github username? ' +
        '(This will be your GitHub scope, if you want to publish this package' +
        ' to GitHub Package Registry)',
      default: this.user.github.username
    },
    {
      _key: '__tsnp_github_repo',

      type: 'input',
      name: 'githubRepositoryName',
      message: 'The github repository name?',
      default: this.appname
    },

    {
      _key: '__tsnp_package_description',

      type: 'input',
      name: 'packageDescription',
      message:
        'Package description? (this will appear on package.json and README)'
    },
    {
      _key: '__tsnp_engines_node',
      type: 'input',
      name: 'enginesNode',
      message:
        'The compatible node versions spec (default to every versions >= 8)',
      default: '>=8'
    },
    {
      _key: '__tsnp_owner_full_name',
      type: 'input',
      name: 'ownerFullName',
      message:
        'Full name of package owner? (for setting up README and package.json)',
      default: this.user.git.name,
      store: true
    },
    {
      _key: '__tsnp_owner_email',
      type: 'input',
      name: 'ownerEmail',
      message: 'Email of the owner? (for setting package.json)',
      default: this.user.git.email,
      store: true
    },
    {
      _key: '__tsnp_licence_year',
      type: 'input',
      name: 'licenceYear',
      message: 'Licence year? (defaults to current year)',
      default: new Date().getFullYear().toString()
    },
    {
      _key: '__tsnp_twitter_username',
      type: 'input',
      name: 'twitterUsername',
      message: 'What is your Twitter username? (for scaffolding README)',
      store: true
    }
  ];

  return { queries, scopedPackageNameKey: 'tsnp__scoped_npm_package_name' };
}
