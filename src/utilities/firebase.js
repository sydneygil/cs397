import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
const firebaseSignOut = () => signOut(getAuth(firebase));
export { firebaseSignOut as signOut };


const firebaseConfig = {
    apiKey: "AIzaSyAKq2_hXgjmmngDWLFiPcK16Vu455paNv4",
    authDomain: "cs397-5b5fa.firebaseapp.com",
    databaseURL: "https://cs397-5b5fa-default-rtdb.firebaseio.com",
    projectId: "cs397-5b5fa",
    storageBucket: "cs397-5b5fa.appspot.com",
    messagingSenderId: "487582522150",
    appId: "1:487582522150:web:c55f2156371ff549323fe7",
    measurementId: "G-SMPZJBWVS7"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

export const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
  
    return [user];
  };