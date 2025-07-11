import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const provider = new GoogleAuthProvider();
const AuthProvide = ({ children }) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singinUser =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

  const signOutUser =()=>{
    setLoading(true)
    return signOut(auth)
  }

  const updateProfileUser =profileInfo =>{
    return updateProfile(auth.currentUser,profileInfo)
  }

  const googleLogin =()=>{
    return signInWithPopup(auth, provider)
  }

  useEffect(()=>{
    const unSubscribe =onAuthStateChanged(auth,currentUser=>{
        setUser(currentUser)
        setLoading(false)
    })
    return ()=>{
        unSubscribe()
    }
  },[])

  const authInfo = {
    createUser,
    singinUser,
    signOutUser,
    user,
    loading,
    googleLogin,
    updateProfileUser
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvide;
