import { configure, addDecorator, addParameters } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

import Provider from './Provider';

addParameters({
  options: {
    showPanel: false,
  }
});

addDecorator((story) => {
    return <Provider story={story()} />;
});
