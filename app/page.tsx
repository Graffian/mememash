"use client"
import "./globals.css"
import styles from "./page.module.css"
import { auth , googleProvider , githubProvider } from "./firebaseConfig"
import { AuthError, GithubAuthProvider, GoogleAuthProvider , signInWithPopup, signInWithRedirect } from "firebase/auth"
import { userInfo } from "@/supabase/userInfo"
import { loadUserInfo } from "@/supabase/dbLoad"
import { useEffect } from "react"

interface GoogleUserInfo{
  email : string
  email_verified : boolean
  given_name : string
  name : string
  picture : string
  sub : string
}

export default function Home() {
  useEffect(()=>{
    googleSignIn()
  } , [])

  const googleSignIn = async()=>{
    try {
      const popup = await signInWithPopup(auth , googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(popup)
      const loadResult = await loadUserInfo(popup?.user?.uid)
      
      console.log(credential)
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo" , {
        method : "GET",
        headers:{
          "Authorization" : `Bearer ${credential?.accessToken}`
        }
      })
      const response : GoogleUserInfo = await res.json()
      console.log("USer info : " , response)

      console.log(loadResult)
      const {data , error} = await userInfo(response?.name , response?.email , response?.given_name , response?.picture , popup?.user?.uid)
      if (data) {console.log("no err" , data)}
      else {console.log("error" , error)}
    } catch (error : AuthError) {
      const credentialError = GoogleAuthProvider.credentialFromError(error)
      console.log("Signup error : " , credentialError)
    }
  }



  const githubSignIn = async()=>{
    try {
      const popup = await signInWithPopup(auth , githubProvider)
      const credential = GithubAuthProvider.credentialFromResult(popup)
      console.log(credential)
      const data = await fetch("https://api.github.com/user" , {
        method : "GET" , 
        headers:{
          "Authorization" : `Bearer ${credential?.accessToken}`
        }
      })
      const response  = await data.json()
      console.log("Github user info : " , response)
      
    } catch (error : AuthError) {
      const credentialError = GithubAuthProvider.credentialFromError(error)
      console.log("Github Login Error" , credentialError)
    }
  }



  
  return (
    <>
      <div className={styles.landingPage}>
        <h1>MEMEMASH</h1>
        <p> - Upload memes and choose what you like 🙌</p>
        <div className={styles.signIn}>
          <button onClick={googleSignIn} style={{cursor:"pointer"}}>SignIn With Google</button>
          <button onClick={githubSignIn} style={{cursor:"pointer"}}>SignIn with Github</button>
        </div>
      </div>
    </>
  )
}