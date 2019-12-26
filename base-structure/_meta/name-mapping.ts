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
import * as shell from 'shelljs';

import chalk = require('chalk');

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
        chalk.yellow(' (without @) ') +
        chalk.gray(
          "(If you want to publish at global scope, leave this field empty(or empty string '')."
        ) +
        chalk.gray(' It is always nice to publish packages under a scope. ') +
        chalk.gray(
          'Learn more about scopes here: https://docs.npmjs.com/misc/scope)'
        ),
      store: true
    },
    {
      _key: '__tsnp_github_scope',

      type: 'input',
      name: 'githubUsername',
      message:
        'What is your Github username? ' +
        chalk.gray(
          '(This will be your GitHub scope, if you want to publish this package'
        ) +
        chalk.gray(' to GitHub Package Registry)'),
      ...(shell.which('git') &&
      shell
        .exec('git config --get user.email', {
          silent: true,
          cwd: this.destinationRoot()
        })
        .stdout.trim()
        ? { default: this.user.github.username }
        : { default: '' })
    },
    {
      _key: '__tsnp_github_repo',

      type: 'input',
      name: 'githubRepositoryName',
      message: 'The Github repository name?',
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
        'The compatible node versions spec' +
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

  return { queries, scopedPackageNameKey: 'tsnp__scoped_npm_package_name' };
}
