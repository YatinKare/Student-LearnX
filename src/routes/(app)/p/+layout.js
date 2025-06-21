import { PUBLIC_SUPABASE_API_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import { load_helper } from "$lib/load_helpers.js";
import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr";
import { redirect } from "@sveltejs/kit";

export const load = async ({ fetch, data, depends, url }) => {
    depends("supabase:auth")

    const supabase = isBrowser()
        ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_API_KEY, {
            global: {
                fetch,
            },
        })
        : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_API_KEY, {
            global: {
                fetch
            },
            cookies: {
                getAll() {
                    return data.cookies
                },
            },
        })

    const { session, user } = await load_helper(data.session, supabase)
    if (!session || !user) {
        redirect(303, "/login");
    }

    return { supabase, session, url: data.url }
}
