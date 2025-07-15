import { supabase } from "./supabaseClient"

export const userInfo = async(name:string , email:string , given_name:string , picture_link:string , user_uid:string)=>{

    const {data , error} = await supabase.from("user_profile_info").insert([{ name , email , given_name , picture_link , user_uid}])
    return {data , error}

}