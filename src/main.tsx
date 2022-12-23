import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import ptBR from 'antd/es/locale/pt_BR';
import type { ValidateMessages } from 'rc-field-form/lib/interface';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { router } from './router';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
});

const validateMessages: ValidateMessages = {
  required: 'Campo ${label} é obrigatório',
  string: {
    len: '${label} deve possuir ${len} caracteres'
  }
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR} form={{ validateMessages }}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  </React.StrictMode>
);
