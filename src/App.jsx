import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

import { Tooltip } from 'antd';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Page2 from './pages/OtherPage';
import IconAccessibility from '~icons/carbon/accessibility';
import IconSharpImage from '~icons/ion/images-sharp';
import IconAperture from '~icons/carbon/aperture';
import IconResetImageSharp from '~icons/material-symbols/reset-image-sharp';
// import Menu from "./components/Menu";
import BottomInfoBar from './components/BottomBar/info.jsx';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { Layout, Menu, theme } from 'antd';

const apps = [
  {
    label: '页面1',
    key: 'page-1',
    icon: <IconResetImageSharp />,
    path: '/'
  },
  {
    label: '页面2',
    key: 'page-2',
    icon: <IconAperture />,
    path: '/page2'
  }
];

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  console.log(colorBgContainer);

  const toggleTheme = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    let isDark;

    const transition = document.startViewTransition(() => {
      const root = document.documentElement;
      isDark = root.classList.contains('theme-dark');
      root.classList.remove(isDark ? 'theme-dark' : 'theme-light');
      root.classList.add(isDark ? 'theme-light' : 'theme-dark');
    });
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 300,
          easing: 'ease-in',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      );
    });
  };
  return (
    <BrowserRouter>
      <div className="root-app">
        <div className="app-select">
          {apps.map((app, index) => {
            return (
              <Tooltip
                key={app.key}
                title={app.label}
                placement="right"
                color="rgba(0,0,0,.7)"
              >
                <NavLink to={app.path} className="app-nav-link">
                  <div key={app.key} className="app-item-container">
                    <div className="icon-container">{app.icon}</div>
                    <div className="text-container">{app.label}</div>
                  </div>
                </NavLink>
              </Tooltip>
            );
          })}
        </div>
        <div className="right-outlet">
          <Routes>
            <Route path="/page2" element={<Page2 />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
