import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import ptBR from 'antd/es/locale/pt_BR';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { router } from './router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
