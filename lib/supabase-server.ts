import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./supabase";

export const createServerClient = async () =>
  createServerComponentClient<Database>({ cookies });
