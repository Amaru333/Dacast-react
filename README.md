# Dacast React Backoffice TODO LIST & Example

## What is this
This is a base project with basic examples for a React/Typescript frontend application

## How to install

```
$ npm install
```

```
$ npm start
```

## How to setup the CLI

```
$ cd cli
```

```
$ npm install
```

```
$ npm link
```

## How to use the CLI

```
$ dacast-generate-screen
```

Follow the step. Note: the component/container should not exist yet and the name should be CamelCase without spaces, numbers or specials characters.

If it's only a component:
- The command will create a file in src/components/YourComponentName/YourComponentName.tsx

If it's a container:
- The command will create a file in src/components/YourComponentName/YourComponentName.tsx
- The command will create a file in src/containers/YourComponentName.tsx
- The command will create the Redux logic at src/redux-flow/store/YourComponentName/[actions/index/reducer/types].tsx
- The command will add your containers inital-state/reducer/state at src/redux-flow/store/index.ts

Note: You can move the components or containers place without so much trouble. I will improve that later, still thinking about an easy way.

For any idea, bug report or inquiry about the CLI to make it easier to develop fast and clean React/TS/Redux application contact Quentin or make a merge-request.

## Other npm script : 

```
$ npm build
```
To build the app (a lint is run before the build)

```
$ npm lint
```
To lint the project and return errors and warning

```
$ npm lint-fix
```
To lint the project and fix what eslint can automatically fix 

```
$ npm lint-fix-dry
```
Dry run of the lint command


## Project structure (so far)


```
*root*
|
├── */src/*
│   ├── */components/* strictly presentationnal components
│   ├── */containers/* containers components
│   ├── *index.html* entry point
│   ├── *index.tsx* TS entry point
│   ├── *main.tsx* Main component with provider
│   └── */redux-flow/* contains all the redux flow logic
│       ├── */store/* contains store order by context and combineReducers at the root
│       └── *configureStore.ts* group all store apply middleware and create store
├── *package.json* the whole package.json with every dependency and script
├── *.eslintrc.js* eslint config
├── *tsconfig.json* typescript config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```


## Tests

The testing environment will probably be in Jest and Enzyme. Still to be define

## Eslint

This project uses @typescript-eslint and plugin:react/recommended specs so you can write clean react and typescript code, if you use Visual Studio Code, you can install eslint from the extension tab to activate this function, other editors just google _name of the editor + eslint_ you will find how to enable it for your editor.

