
import { supabase } from "./supabaseClient";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export async function loadUserInfo(user_uid : string , router:AppRouterInstance){

    const {data,error}  = await supabase.from("user_profile_info").select("*").eq("user_uid" , user_uid).single()
    if(data){
        console.log("the reqd user : " , data.name)
        router.push("/main")

    }else{
        console.log("Unsuccesful data fetch" , error)
        return error
    }
}