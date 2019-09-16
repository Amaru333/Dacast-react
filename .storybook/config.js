import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';
// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach(req);
}

addParameters({
    options: {
      theme: themes.dark,
    },
});

configure(loadStories, module);
