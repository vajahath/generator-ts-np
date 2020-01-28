/**
 * This file is copied from base-structure/_meta
 * So edit this file directly from there.
 *
 * The npm modules required here are for the
 * /generator directory.
 */

import {
  Generator,
  TSNPQueries,
  GetRenderPromptVariablesResult
} from './Types';

import chalk = require('chalk');
import wrap = require('word-wrap');

export function getRenderPromptVariables(
  this: Generator
): GetRenderPromptVariablesResult {
  const queries: TSNPQueries = [
    {
      _key: 'tsnp_package_name',
      type: 'input',
      name: 'packageName',
      message:
        'What is your npm package name?' + chalk.gray(' (without @scope)'),
      default: this.appname
    },
    {
      _key: '__tsnp_npm_scope',
      type: 'input',
      name: 'npmScope',
      message:
        'What is your npm scope? ' +
        chalk.yellow(' (without @) \n') +
        wrap(
          chalk.gray(
            '(If you want to publish at global scope, leave this field empty(or empty string).'
          ) +
            chalk.gray(
              ' It is always nice to publish packages under a scope. '
            ) +
            chalk.gray(
              'Learn more about scopes here: https://docs.npmjs.com/misc/scope)'
            ),
          { width: 63 }
        ),
      store: true
    },
    {
      _key: '__tsnp_github_scope',

      type: 'input',
      name: 'githubUsername',
      message:
        'What is your Github username? \n' +
        wrap(
          chalk.gray(
            '(This will be your GitHub scope, if you want to publish this package'
          ) +
            chalk.gray(
              ' to GitHub Package Registry. You can leave this field empty)'
            )
        ),
      store: true
    },
    {
      _key: '__tsnp_github_repo',

      type: 'input',
      name: 'githubRepositoryName',
      message:
        'The repository name?\n' +
        wrap(
          chalk.gray(
            '(If not applicable, you can leave this field as such and edit later directly in the package.json and README.md)'
          )
        ),
      default: this.appname
    },

    {
      _key: '__tsnp_package_description',

      type: 'input',
      name: 'packageDescription',
      message:
        'Package description? ' +
        chalk.gray('(this will appear on package.json and README)')
    },
    {
      _key: '__tsnp_engines_node',
      type: 'input',
      name: 'enginesNode',
      message:
        'The compatible node versions' +
        chalk.gray(' (defaults to every versions >= 8)'),
      default: '>=8'
    },
    {
      _key: '__tsnp_owner_full_name',
      type: 'input',
      name: 'ownerFullName',
      message:
        'Full name of package owner?' +
        chalk.gray('(for setting up README and package.json)'),
      default: this.user.git.name,
      store: true
    },
    {
      _key: '__tsnp_owner_email',
      type: 'input',
      name: 'ownerEmail',
      message:
        'Email of the owner?' + chalk.gray(' (for setting package.json)'),
      default: this.user.git.email,
      store: true
    },
    {
      _key: '__tsnp_licence_year',
      type: 'input',
      name: 'licenceYear',
      message: 'Licence year? ' + chalk.gray('(defaults to current year)'),
      default: new Date().getFullYear().toString()
    },
    {
      _key: '__tsnp_twitter_username',
      type: 'input',
      name: 'twitterUsername',
      message:
        'What is your Twitter username?' +
        chalk.gray(' (for scaffolding README)'),
      store: true
    }
  ];

  return {
    queries,
    scopedPackageNameKey: 'tsnp__scoped_npm_package_name',
    versionKey: 'tsnp__version'
  };
}
