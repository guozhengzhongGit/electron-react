import React from 'react'
import {ConfigProvider} from 'antd';
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider theme={{
        token: {
          colorBgContainer: '#fff',
          colorPrimary: '#2f54eb',
          colorPrimaryBg: '#f0f5ff',
          colorPrimaryBgHover: '#d6e4ff',
          colorPrimaryBorder: '#adc6ff',
          colorPrimaryBorderHover: '#85a5ff',
          colorPrimaryText: '#2f54eb',
          colorPrimaryTextActive: '#1d39c4',
          borderRadius: 4,
          borderRadiusXS: 4,
        },
      }}>
        <App />
        </ConfigProvider>
)
