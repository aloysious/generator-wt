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
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: 'Y/n',
    warning: 'Yes: Enabling this will be totally awesome!'
  }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.someOption = (/y/i).test(props.someOption);

    cb();
  }.bind(this));
};

WtGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('src/lib');
  this.mkdir('src/page');
  this.mkdir('src/widget');
  this.mkdir('src/widget/demo');
  this.mkdir('src/util');
  this.mkdir('src/util/demo');

  this.template('src/page/index.shtml', 'src/page/index.shtml');
  this.template('src/widget/demo/demo.js', 'src/widget/demo/demo.js');
  this.template('src/widget/demo/demo.less', 'src/widget/demo/demo.less');
  this.template('src/widget/demo/demo.html', 'src/widget/demo/demo.html');
  this.template('src/util/demo/demo.js', 'src/util/demo/demo.js');
  this.template('src/config.js', 'src/config.js');

  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  //this.template('_bower.json', 'bower.json');
};
/*
WtGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};*/
