import { supabase } from "./supabaseClient";

export const userInfo = async (
  name: string,
  email: string,
  given_name: string,
  picture_link: string,
  user_uid: string,
) => {
  try {
    const { data, error } = await supabase
      .from("user_profile_info")
      .insert([{ name, email, given_name, picture_link, user_uid }]);
    if (data) {
      console.log("user update success", data);
      return data;
    } else {
      console.error("Supabase error:", error);
      return error;
    }
  } catch (err) {
    console.error(
      "Failed to connect to Supabase. Please check your environment variables.",
      err,
    );
    return { error: "Supabase not configured" };
  }
};
