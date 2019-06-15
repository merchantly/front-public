import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';

let store = {};

export default function Provider({story}) {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  );
};
