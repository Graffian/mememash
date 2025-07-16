
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { supabase } from "./supabaseClient";



export async function loadUserInfo(user_uid : string , router:AppRouterInstance){

    const {data,error}  = await supabase.from("user_profile_info").select("*").eq("user_uid" , user_uid).single()
    if(data){
        console.log("the reqd user is verified" , data)
        router.push("/main")
        return data

    }else{
        console.log("Unsuccesful data fetch the user is not verified" , error)
        return error
    }
}