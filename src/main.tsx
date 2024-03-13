import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { client } from './services/client'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={client}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>,
)
