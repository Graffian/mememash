"use client";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if environment variables are provided
if (!url || !key) {
  console.warn(
    "Supabase environment variables are not configured. Please set NEXT_PUBLIC_SUPABASE_PROJECT_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file",
  );
}

// Create client with fallback values to prevent crashes
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  key || "placeholder-key",
);
