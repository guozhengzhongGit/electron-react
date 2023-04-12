import React, { useState } from 'react';

const HomePage = () => {
  const chromeVersion = versions.chrome();
  const nodeVersion = versions.node();
  const electronVersion = versions.electron();
  return (
    <div>
      <p>app is using Chrome { chromeVersion }, Node { nodeVersion }, Electron { electronVersion }</p>
    </div>
  )
}

export default HomePage;