import * as Generator from "yeoman-generator";
import * as chalk from "chalk";
import * as yosay from "yosay";

const GEN_VER = require("../../package.json").version;

export = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Scaffold your next node package with ${chalk.red("ts-np")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "packageName",
        message: "Package Name",
        default: this.appname
      },
      {
        type: "input",
        name: "packageDescription",
        message: "Package Description",
        default: this.appname + " Description"
      },
      {
        type: "input",
        name: "githubUsername",
        message: "Github Username",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "githubRepository",
        message: "Github Repository Name",
        default: this.appname
      },
      {
        type: "input",
        name: "email",
        message: "Your Email",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "twitterUsername",
        message: "Twitter Username without @",
        default: "",
        store: true
      },
      {
        type: "input",
        name: "fullName",
        message: "Your full name to appear in README",
        default: "",
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath("render/**"), this.destinationPath(), {
      packageName: this.props.packageName,
      packageDescription: this.props.packageDescription,
      githubUsername: this.props.githubUsername,
      githubRepository: this.props.githubRepository,
      email: this.props.email,
      twitterUsername: this.props.twitterUsername,
      fullName: this.props.fullName,
      generatorVersion: GEN_VER
    });

    this.fs.copy(this.templatePath("static/**"), this.destinationPath(), {
      globOptions: { dot: true }
    });

    // Treate special files
    this.fs.copy(
      this.templatePath("special/npmignore"),
      this.destinationPath(".npmignore")
    );
    this.fs.copy(
      this.templatePath("special/gitignore"),
      this.destinationPath(".gitignore")
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
