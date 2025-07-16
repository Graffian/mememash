"use client";
import "./globals.css"
import styles from "./page.module.css"
import { auth , googleProvider , githubProvider } from "./firebaseConfig"
import { AuthError, GithubAuthProvider, GoogleAuthProvider , signInWithPopup } from "firebase/auth"
import { userInfo } from "@/supabase/userInfo"
import { loadUserInfo } from "@/supabase/dbLoad"
import { useEffect , useState } from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { useNameState } from "./layout";

interface GoogleUserInfo{
  email : string
  email_verified : boolean
  given_name : string
  name : string
  picture : string
  sub : string
  user_uid : string
}

export default function Home() {
  const {name , setName} = useNameState()
  const [userId , setUserId] = useState<string>("")
  const router = useRouter()
  const pathname = usePathname()


  const googleSignIn = async()=>{
    try {
      const popup = await signInWithPopup(auth , googleProvider)
      setUserId(popup?.user?.uid)
      const credential = GoogleAuthProvider.credentialFromResult(popup)
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo" , {
        method : "GET",
        headers:{
          "Authorization" : `Bearer ${credential?.accessToken}`
        }
      })
      const response : GoogleUserInfo = await res.json()
      if(!response){
        return
      }else{
        console.log("USER INFO" , response)
      }
      const userUpdate = await userInfo(response?.name , response?.email , response?.given_name , response?.picture , popup?.user?.uid)
      console.log(userUpdate)
    } catch (error : AuthError) {
      const credentialError = GoogleAuthProvider.credentialFromError(error)
      console.log("Signup error : " , credentialError)
    }
  }


useEffect(()=>{
  const newUserCheck = async()=>{
    console.log(pathname)
    try {
      if(userId != ""){
        console.log(pathname)
      const name:GoogleUserInfo = await loadUserInfo(userId , router)
      console.log("user name: "  , name.name)
      setName(name.name)
    }
    } catch (error) {
      console.log("err h")
      console.log(error)
    }
}
newUserCheck()
  } , [userId , pathname])



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
        <h2 style={{backgroundColor:"red"}}>{name}</h2>
      </div>
    </>
  )
}