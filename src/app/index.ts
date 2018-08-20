import { join as pathJoin } from 'path';
import * as Generator from 'yeoman-generator';
import yosay = require('yosay');

const chalk = require('chalk'); // tslint:disable-line:no-var-requires
const GEN_VER = require('../../package.json').version; // tslint:disable-line:no-var-requires

const templatePath = pathJoin(__dirname, '../', '../', 'template');

class K extends Generator {
  public props: any;

  constructor(args: any, opts: any) {
    super(args, opts);
  }

  public async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Scaffold your next node package with ${chalk.red('ts-np')} generator!
        template path: ${templatePath}`,
      ),
    );

    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: 'Package Name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Package Description',
        default: this.appname + ' cool description',
      },
      {
        type: 'input',
        name: 'githubUsername',
        message:
          'Github Username (this will help scaffolding the package.json)',
        default: 'non-existent-voldemort',
        store: true,
      },
      {
        type: 'input',
        name: 'githubRepository',
        message:
          'Github Repository Name (this will help scaffolding the package.json)',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your Email',
        default: 'voldemort@hogwarts.dementors',
        store: true,
      },
      {
        type: 'input',
        name: 'twitterUsername',
        message: 'Twitter Username without @',
        default: '__call_me_Vol',
        store: true,
      },
      {
        type: 'input',
        name: 'fullName',
        message: 'Your full name to appear in README',
        default: 'Tom Marvolo Riddle',
        store: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which Package manager you like to use',
        choices: ['yarn', 'npm'],
        default: 'yarn',
        store: true,
      },
    ];

    this.props = await this.prompt(prompts);
  }

  public writing() {
    this.fs.copyTpl(
      this.templatePath(`${templatePath}/render/**`),
      this.destinationPath(),
      {
        packageName: this.props.packageName,
        packageDescription: this.props.packageDescription,
        githubUsername: this.props.githubUsername,
        githubRepository: this.props.githubRepository,
        email: this.props.email,
        twitterUsername: this.props.twitterUsername,
        fullName: this.props.fullName,
        generatorVersion: GEN_VER,
      },
    );

    // move static files
    this.fs.copy(
      this.templatePath(`${templatePath}/static/**`),
      this.destinationPath(),
      {
        globOptions: { dot: true },
      },
    );

    // Treate special files
    // this.fs.copy(
    //   this.templatePath('special/npmignore'),
    //   this.destinationPath('.npmignore'),
    // );
    // this.fs.copy(
    //   this.templatePath('special/gitignore'),
    //   this.destinationPath('.gitignore'),
    // );
  }

  public install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
    });
  }
}

export = K;
