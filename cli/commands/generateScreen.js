#! /usr/bin/env node
var shell = require("shelljs");
var readlineSync = require('readline-sync');
var utils = require("../utils");
var asciiTextGenerator = require('ascii-text-generator');

var componentName = "";

shell.echo("\n" + asciiTextGenerator("Dacast","2") + "\n");
while(componentName === "") {
    var componentName = readlineSync.question("What's your components name? ");
    if(componentName === "") {
        shell.echo("You need to provide a name for your component.")
    }
    if(!utils.isValidComponentName(componentName)) {
        shell.echo("Invalid component name (no numbers/space and CamelCase)")
        componentName = "";
    }
}
shell.echo(" Your component name: "+componentName);
var isReduxLogic = readlineSync.keyInYNStrict("Is your component need a Redux logic? ");

shell.echo('-n', '                     (0%)\r');
shell.exec('dacast-generate-component-files --cn '+componentName, {async: true}, (code) => {
    if(code === 1 ) {
        shell.echo('Exit generator');
        shell.exit(1);
    }
    if(isReduxLogic) {
        shell.echo('-n', '#####                     (33%)\r');
        shell.exec('dacast-generate-redux-files --cn '+componentName, {async: true}, () => {
            shell.echo('-n', '#############             (66%)\r');
            shell.exec('dacast-generate-container-files --cn '+componentName, {async: true}, () => {
                shell.echo('-n', '#######################   (100%)\r');
            })
        })
    } else {
        shell.echo('-n', '#######################   (100%)\r');
    }
})

