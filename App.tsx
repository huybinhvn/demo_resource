import React from 'react';

import StackApp from './navigations/StackNavigations';

import ResourceProvider from './utils/useResource';

function App(): JSX.Element {

  return (
    <ResourceProvider>
      <StackApp />
    </ResourceProvider>
  );
}

export default App;
