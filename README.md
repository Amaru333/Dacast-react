# Dacast React Backoffice

## What is this
This is a base project for the React Backoffice project

## How to install

```
$ npm install
```

```
$ npm start
```

## Project structure


```
*root*
|
├── */src/*
│   ├── */components/* UI components used for the admin and the backoffice SPA
│   ├── */admin/* Admin webapp
│   ├── */app/* Backoffice webapp
│   ├── */DacastSdk/* endpoints sdk to match the backend types
│   ├── */scss/* common styles
│   ├── */shared/* styled components common to both webapps
│   ├── */stories/* Storybook stories
│   ├── */styled/* common themes
│   ├── */utils/* utils functions common to both webapps
│   ├── *deploy.js* Deployment config
├── *package.json* the whole package.json with every dependency and script
├── *.eslintrc.js* eslint config
├── *tsconfig.json* typescript config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```
common structure for both admin and app webapps

├── */constants/* constants used for the project
├── */containers/* webapp page with Redux logic (mapStateToProps and mapDispatchToProps)
├── */pages/* webapp page
├── */redux-flow/* Redux logic with actions, reducers, viewModels and types
├── */shared/* webapp common components
├── */utils/* webapp utils functions

## Eslint

This project uses @typescript-eslint and plugin:react/recommended specs so you can write clean react and typescript code, if you use Visual Studio Code, you can install eslint from the extension tab to activate this function, other editors just google _name of the editor + eslint_ you will find how to enable it for your editor.

## Storybook

This project uses Storybook. You can write new stories in /stories. To launch storybook locally, just type 'npm run storybook' on your terminal.

## Using data coming from the backend

Whenever you want to use data coming from an endpoint the following needs to be done:

Add the endpoint itself in the DacastSdk/sdk file like this 

```
public getAccounts = async (input: string): Promise<GetAccountsListOutput> => await this.axiosClient.get('/accounts?' + input).then(this.checkExtraData)
```
then if the input and/or the output are an object add the types in the proper file (the separation is done following the navigation bar sections)

Then use the applyViewModel function in the proper actions.ts file (the one matching the page where you want to use the data) under the redux-flow folder like this

```
export const getAccountsAction = applyAdminViewModel(dacastSdk.getAccounts, formatGetAccountsInput, formatGetAccountsOutput, ActionTypes.GET_ACCOUNTS, null,  'User\'s plan couldn\'t be retrieved')
```

the 2 formatting functions are under the viewModel file. 
The formatInput one is to format the data to match the backend types. 
The formatOuput one is to format the endpoint data to the types you decided in the frontend (in the types.ts file)

Once this is done add the formatted data to the reducer and you can access it from your page component 


## External docs

https://basscss.com/

https://material-ui.com/components/material-icons/

https://www.styled-components.com/docs