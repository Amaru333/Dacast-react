#! /usr/bin/env node
var shell = require("shelljs");
var readlineSync = require('readline-sync');

var componentName = "";
shell.echo('==== Dacast Component Generator ====');
shell.echo('');
while(componentName === "") {
    //TODO: Check if first letter capital, no space, no special character
    var componentName = readlineSync.question("What's your components name? ");
    if(componentName === "") {
        shell.echo("You need to provide a name for your component.")
    }
}
shell.echo(" Your component name: "+componentName);
var isReduxLogic = readlineSync.keyInYNStrict("Is your component need a Redux logic? ");

shell.exec('dacast-generate-component-files --cn '+componentName)

if(isReduxLogic) {
    shell.exec('dacast-generate-redux-files --cn '+componentName)
    shell.exec('dacast-generate-container-files --cn '+componentName)
}