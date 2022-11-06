import { initializeApp } from 'firebase/app';
import { useState, useEffect, useCallback } from 'react';
import { getDatabase, onValue, ref, update, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithCredential, connectAuthEmulator } from 'firebase/auth';

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ));

  return [user];
};

const firebaseConfig = {
    apiKey: "AIzaSyCSk1eT68pXfMdQzCA0-XYXTTZEdcawMHs",
    authDomain: "course18.firebaseapp.com",
    projectId: "course18",
    storageBucket: "course18.appspot.com",
    messagingSenderId: "587090127869",
    appId: "1:587090127869:web:2dc2ca25e31bcd5610c794"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

console.log(window.location.hostname)
if (window.location.hostname === '127.0.0.1') {
  console.log('hello')
  console.log(auth)
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "qq9Dmpwk66hCbwOBLF073lKmT63g", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};