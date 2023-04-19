import React from 'react';
const Home = () => {
  const chromeVersion = versions.chrome();
  const nodeVersion = versions.node();
  const electronVersion = versions.electron();
  return (
    <div>
      <h1>
        页面1 此应用版本为: chrome：{chromeVersion} Node: {nodeVersion}{' '}
        Electron: {electronVersion}
      </h1>
    </div>
  );
};

export default Home;
