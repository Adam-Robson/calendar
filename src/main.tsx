import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { client } from './services/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { EventProvider } from './lib/context/EventContext.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={client}>
      <EventProvider>
        <App />
      </EventProvider>
    </SessionContextProvider>
  </React.StrictMode>,
);
