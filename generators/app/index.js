'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Scaffold your next node package with ' + chalk.red('ts-np') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'packageName',
      message: 'Package Name',
      default: this.appname
    }, {
      type: 'input',
      name: 'packageDescription',
      message: 'Package Description'
    }, {
      type: 'input',
      name: 'githubUsername',
      message: 'Github Username',
      store: true
    }, {
      type: 'input',
      name: 'githubRepository',
      message: 'Github Repository Name',
      default: this.appname
    }, {
      type: 'input',
      name: 'email',
      message: 'Your Email',
      store: true
    }, {
      type: 'input',
      name: 'twitterUsername',
      message: 'Twitter Username without @',
      store: true
    }, {
      type: 'input',
      name: 'fullName',
      message: 'Your full name to appear in README',
      store: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('render/**'),
      this.destinationPath(), {
        packageName: this.props.packageName,
        packageDescription: this.props.packageDescription,
        githubUsername: this.props.githubUsername,
        githubRepository: this.props.githubRepository,
        email: this.props.email,
        twitterUsername: this.props.twitterUsername,
        fullName: this.props.fullName
      }
    );

    this.fs.copy(
      this.templatePath('statics/**'),
      this.destinationPath(), {globOptions: {dot: true}}
    );
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
