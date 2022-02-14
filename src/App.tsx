import React from 'react';

import MobileLayout from './components/layout/Layout';
import Music from './components/music/Music';

function App() {
  return (
    <MobileLayout theme="ios" server={false}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Music />
      </React.Suspense>
    </MobileLayout>
  );
}

export default App;
