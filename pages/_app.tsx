import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { Provider } from 'react-redux';
import store from '../store/store';
import firebase from 'firebase/app';
import 'firebase/firestore';

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        apiKey: 'AIzaSyCBmWHuqULdK-F3FCMfBBbD1kx0-Ak1_GY',
        authDomain: 'gameoflife-b8508.firebaseapp.com',
        projectId: 'gameoflife-b8508',
        storageBucket: 'gameoflife-b8508.appspot.com',
        messagingSenderId: '864859317593',
        appId: '1:864859317593:web:9c17d13c5b437f22cf9848',
        measurementId: 'G-EL115BJG9T',
    });
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
