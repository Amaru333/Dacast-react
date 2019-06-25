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
var componentNameLow = componentName.charAt(0).toLowerCase() + componentName.slice(1);
var topLevel = shell.exec('git rev-parse --show-toplevel', {silent: true});
var topLevel = topLevel.stdout.replace('\n', '');

var reduxFlowPath = topLevel+'/src/redux-flow';
var newFolderPath = reduxFlowPath+'/store/'+componentName;

shell.mkdir('-p', newFolderPath);

var newActionsFile = newFolderPath+'/actions.ts';
var newIndexFile = newFolderPath+'/index.ts';
var newReducerFile = newFolderPath+'/reducer.ts';
var newTypesFile = newFolderPath+'/types.ts';

shell.touch( newActionsFile, newIndexFile, newReducerFile, newTypesFile );

var actionsModel = topLevel+'/cli/models/store/actions.txt';
var indexModel = topLevel+'/cli/models/store/index.txt';
var reducerModel = topLevel+'/cli/models/store/reducer.txt';
var typesModel = topLevel+'/cli/models/store/types.txt';


var typesContent = shell.sed(/@@COMPONENT_NAME@@/g, componentName, typesModel );
var reducerContent = shell.sed(/@@COMPONENT_NAME@@/g, componentName, reducerModel );

shell.cat(indexModel).to(newIndexFile);
shell.cat(actionsModel).to(newActionsFile);

shell.exec(" echo '"+ reducerContent +"' >> "+ newReducerFile +" ", {silent: true}, () => {
    shell.sed('-i', /@@COMPONENT_NAME_LOW@@/g, componentNameLow, newReducerFile );
})
shell.exec(" echo '"+ typesContent +"' >> "+ newTypesFile +" ", {silent: true, async: true}, () => {
    shell.sed('-i', /@@COMPONENT_NAME_LOW@@/g, componentNameLow, newTypesFile );
});

var rootIndexRedux = reduxFlowPath+'/store/index.ts';

var importString = 'import {  '+componentNameLow+'InitialState, '+componentName+'State, '+componentName+'Reducer } from "./'+componentName+'";';
shell.sed('-i', /from "redux";/g, 'from "redux";\n'+importString, rootIndexRedux );
shell.sed('-i', /combineReducers\({/g, "combineReducers({\n\t\t"+componentNameLow+":"+componentName+"Reducer,", rootIndexRedux );
shell.sed('-i', /globalDefaultState: ApplicationState = {/g, "globalDefaultState: ApplicationState = {\n\t"+componentNameLow+":"+componentNameLow+"InitialState,", rootIndexRedux );
shell.sed('-i', /interface ApplicationState {/g, "interface ApplicationState {\n\t"+componentNameLow+":"+componentName+"State;", rootIndexRedux );