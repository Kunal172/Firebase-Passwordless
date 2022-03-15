import React,{useState, useEffect, useContext, createContext} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyDIxmo9QN__LPO488_UBmGbUPfFwPfIS70",
    // apiKey: process.env.REACT_APP_FB_API,
    authDomain: process.env.REACT_APP_FB_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT,
    storageBucket: process.env.REACT_APP_FB_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_SENDER,
    appId: process.env.REACT_APP_FB_APP,
})

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const sendSignInLinkToEmail = email => {
        return firebase.auth().sendSignInLinkToEmail(email, {
                url: 'https://firebase-passwordless.vercel.app/confirm', 
                handleCodeInApp: true,
        }).then(()=>{
            return true;
        });
    };

    const signInWithEmailLink = (email, code) => {
        return firebase.auth().signInWithEmailLink(email,code).then(result => {
            setUser(result.user)
            return true;
        });
    };

    const logout = () => {
        return firebase.auth().signOut().then(()=>{
            setUser(null);
        });
    };

    useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            setUser(user);
            setIsAuthenticating(false);
        })

        return () => unsuscribe();
    },[]);

    const values = {
        user, isAuthenticating, sendSignInLinkToEmail, signInWithEmailLink, logout
    }

    return (
        <AuthContext.Provider value={values}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    );
};
