import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import initializeAuthentication from './../Pages/Login/Firebase/firebase.init';

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    const signInUsingFacebook = () => {
        setIsLoading(true);
        const fbProvider = new FacebookAuthProvider();

        return signInWithPopup(auth, fbProvider)
            // .finally(() => { setIsLoading(false) });
            .then(result => {
                setUser(result.user);
            })
            .finally(() => setIsLoading(false));
    }

    const signInUsingGoogle = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();

        return signInWithPopup(auth, googleProvider)
            // .finally(() => { setIsLoading(false) });
            .then(result => {
                setUser(result.user);
            })
            .finally(() => setIsLoading(false));
    }

    // observe user state change
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])

    const logOut = () => {
        setIsLoading(true);
        return signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    }

    return {
        user,
        isLoading,
        signInUsingGoogle,
        signInUsingFacebook,
        logOut
    }
}

export default useFirebase;