#! /usr/bin/env node
var utils = require("../utils");
var shell = require("shelljs");
var argv = require('yargs')
    .option('component-name', {
        alias: 'cn',
        describe: 'Your component name.'
    })
    .check( (argv) => {
        if(!utils.isValidComponentName(argv['component-name'])) {
            throw("Invalid component name (no numbers/space and CamelCase)")
        } else {
            return true
        }
    } )
    .demandOption(['component-name'], 'Please provide a component name to run this command.')
    .help()
    .argv

var componentName = argv['component-name'];
var topLevel = shell.exec('git rev-parse --show-toplevel', {silent: true});
var topLevel = topLevel.stdout.replace('\n', '');

var containersPath = topLevel+'/src/containers';
var newContainerPath = containersPath+'/'+componentName+'.tsx';

shell.touch( newContainerPath );

var modelContainerPath = topLevel+'/cli/models/ContainerModel.txt';
var containerContent = shell.sed(/@@COMPONENT_NAME@@/g, componentName, modelContainerPath );
shell.exec(" echo '"+ containerContent +"' >> "+ newContainerPath +" ", {silent: true, async: true});