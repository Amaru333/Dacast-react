import { addParameters, configure } from '@storybook/react';
import { Theme } from '../src/styled/themes/dacast-theme';
const { addDecorator } = require('@storybook/react');
import { ThemeProvider } from 'styled-components';
import {Provider } from 'react-redux';
import configureStore from '../src/redux-flow/configureStore';
import React from 'react';
import "../src/scss/style.scss";
import { globalDefaultState } from "../src/redux-flow/store";
import { withA11y } from '@storybook/addon-a11y';

const initialState = globalDefaultState;
const store = configureStore(initialState);
// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}
addDecorator(withA11y);

addDecorator((story) => (
    <Provider store={store}>
        <ThemeProvider theme={Theme}>
            {story()}
        </ThemeProvider>
    </Provider>
))

configure(loadStories, module);