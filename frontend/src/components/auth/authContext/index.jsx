import React, { useContext, useEffect, useState } from "react";
import {auth} from "../firebase/firebaseConfig";
import {onAuthStateChanged} from "firebase/auth"
import { getDatabase, ref, get } from "firebase/database";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const db = getDatabase();

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if (user){
            const userRef = ref(db, `users/${user.uid}`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setCurrentUser({
                        uid: user.uid,
                        email: user.email,
                        username: userData.username,
                    });
                    setUserLoggedIn(true);
                } else {
                    console.log("No user data found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser, 
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}