import React from 'react';
import ReactDOM from 'react-dom';
import { firebaseConfig } from '../firebase';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirestorProvider } from '@react-firebase/firestores';
import firebase from 'firebase';
import { CometChat } from '@cometchat-pro/chat';


import './styles/index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
