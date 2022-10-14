import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';

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