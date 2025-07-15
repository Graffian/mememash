import { supabase } from "./supabaseClient";

export async function loadUserInfo(user_uid){
    const {data,error}  = await supabase.from("user_profile_info").select("*").eq("user_uid" , user_uid).single()
    if(data){
        console.log("the reqd user : " , data.name)
        return data
    }else{
        console.log("Unsuccesful data fetch" , error)
        return error
    }
}