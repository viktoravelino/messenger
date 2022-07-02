import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import { AuthProvider } from './context/AuthContext';
import { ContactsProvider } from './context/ContactsContext';
import { ConversationsProvider } from './context/ConversationsContext';
import { SocketProvider } from './context/SocketContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <ContactsProvider>
          <ConversationsProvider>
            <App />
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
