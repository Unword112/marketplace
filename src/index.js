import React from 'react';
    import ReactDOM from 'react-dom';
    import { firebaseConfig } from './firebase';
    import { FirebaseAuthProvider } from '@react-firebase/auth';
    import { FirestoreProvider } from '@react-firebase/firestore';
    import firebase from 'firebase';
    import { CometChat } from '@cometchat-pro/chat';
    import './styles/index.css';
    import './styles/tailwind.css';
    import App from './App';
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(process.env.REACT_APP_COMETCHAT_REGION)
  .build()
CometChat.init(process.env.REACT_APP_COMETCHAT_APP_ID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    ReactDOM.render(
      <React.StrictMode>
        <FirebaseAuthProvider { ...firebaseConfig } firebase={firebase} >
          <FirestoreProvider { ...firebaseConfig } firebase={firebase} >
            <App />
          </FirestoreProvider>
        </FirebaseAuthProvider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  },
  (error) => {
    console.log('Initialization failed with error: ', error);
  }
)

export default appSetting

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

