import React from 'react';
import IconChrome from '~icons/logos/chrome'
import IconNode from '~icons/logos/nodejs-icon'
import IconVite from '~icons/logos/vitejs'
import ElectronIcon from '~icons/logos/electron'
import IconReact from '~icons/eos-icons/atom-electron'

import './app-bottom-bar.css';


const BottomInfo = () => {
  const chromeVersion = versions.chrome();
  const nodeVersion = versions.node();
  const electronVersion = versions.electron();
  return (
    <div className="app-bottom-info-outer">
      <p className="info-bar">
        <span>powered by</span>&nbsp;&nbsp;<IconChrome className="logo" /><span>{ chromeVersion }</span>&nbsp;&nbsp;<IconNode /><span>{ nodeVersion }</span>&nbsp;&nbsp;<ElectronIcon className="logo" /><span>{ electronVersion }</span>
        &nbsp;&nbsp;<IconReact /><span>18.2.0</span>&nbsp;&nbsp;<IconVite /><span>4.2.1</span>
      </p>
    </div>
  );
}

export default BottomInfo;