"use client"
import { createClient } from "@supabase/supabase-js"
const url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(url , key)