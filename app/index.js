'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var WtGenerator = module.exports = function WtGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WtGenerator, yeoman.generators.Base);

WtGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);

  var prompts = [{
    name: 'domainName',
    message: 'What is the assets domain name?',
  	default: 'http://g.tbcdn.cn'
  }, {
  	name: 'group',
	message: 'What is the group name?',
  	default: 'wt'
  }, {
  	name: 'project',
	message: 'What is the project name?',
  	default: path.basename(process.cwd())
  }, {
  	name: 'version',
	message: 'What is the default version you try to initialize your project?',
	default: '1.0.0'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

	this.domainName = props.domainName;
	this.group = props.group;
	this.project = props.project;
	this.version = props.version;

    cb();
  }.bind(this));
};

WtGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/lib');
  this.mkdir('src/mock');
  this.mkdir('src/page');
  this.mkdir('src/widget');
  this.mkdir('src/widget/demo');
  this.mkdir('src/widget/tb-assets');
  this.mkdir('src/widget/tb-header');
  this.mkdir('src/widget/tb-footer');
  this.mkdir('src/util');
  this.mkdir('src/util/demo');

  this.template('src/page/index.shtml', 'src/page/index.shtml');
  this.template('src/widget/demo/demo.js', 'src/widget/demo/demo.js');
  this.template('src/widget/demo/demo.less', 'src/widget/demo/demo.less');
  this.template('src/widget/demo/demo.html', 'src/widget/demo/demo.html');
  this.template('src/widget/tb-assets/tb-assets.html', 'src/widget/tb-assets/tb-assets.html');
  this.template('src/widget/tb-header/tb-header.html', 'src/widget/tb-header/tb-header.html');
  this.template('src/widget/tb-footer/tb-footer.html', 'src/widget/tb-footer/tb-footer.html');
  this.template('src/util/demo/demo.js', 'src/util/demo/demo.js');
  this.template('src/mock/demoData.json', 'src/mock/demoData.json');
  this.template('src/config.js', 'src/config.js');

  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('gitignore', '.gitignore');
  this.template('_package.json', 'package.json');
  //this.template('_bower.json', 'bower.json');
};
/*
WtGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};*/
