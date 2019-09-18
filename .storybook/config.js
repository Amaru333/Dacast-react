import { addParameters, configure } from '@storybook/react';
import { Theme } from '../src/styled/themes/dacast-theme';
const { addDecorator } = require('@storybook/react');
import { ThemeProvider } from 'styled-components';
import React from 'react';

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}

addDecorator((story) => (
    <ThemeProvider theme={Theme}>
        {story()}
    </ThemeProvider>
))

configure(loadStories, module);