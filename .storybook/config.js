import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';
const { addDecorator } = require('@storybook/react');
const { withPropsTable } = require('storybook-addon-react-docgen');

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}
addDecorator(withPropsTable);
addParameters({
    options: {
      theme: themes.normal,
    },
});

configure(loadStories, module);
