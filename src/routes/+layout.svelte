<script>
    import "../app.css";
    import {
        PUBLIC_SUPABASE_URL,
        PUBLIC_SUPABASE_API_KEY,
    } from "$env/static/public";
    import { createBrowserClient } from "@supabase/ssr";
    import { onMount } from "svelte";
    import { invalidateAll } from "$app/navigation";

    let { children, data } = $props();
    let supabase = $state(null);

    onMount(() => {
        supabase = createBrowserClient(
            PUBLIC_SUPABASE_URL,
            PUBLIC_SUPABASE_API_KEY,
            {
                global: { fetch },
                cookies: {
                    getAll() {
                        // Return an array of { name, value } for all cookies
                        return document.cookie
                            .split("; ")
                            .filter(Boolean)
                            .map((cookieStr) => {
                                const [name, ...rest] = cookieStr.split("=");
                                return { name, value: rest.join("=") };
                            });
                    },
                    setAll(cookiesToSet) {
                        // Set each cookie with its options
                        cookiesToSet.forEach(({ name, value, options }) => {
                            let cookie = `${name}=${value}`;
                            if (options?.path)
                                cookie += `; path=${options.path}`;
                            if (options?.expires)
                                cookie += `; expires=${options.expires}`;
                            if (options?.maxAge)
                                cookie += `; max-age=${options.maxAge}`;
                            if (options?.domain)
                                cookie += `; domain=${options.domain}`;
                            if (options?.secure) cookie += `; secure`;
                            if (options?.sameSite)
                                cookie += `; samesite=${options.sameSite}`;
                            document.cookie = cookie;
                        });
                    },
                },
            },
        );

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.expires_at !== data.session?.expiresAt) {
                invalidateAll();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    });
</script>

<div class="" data-theme="cupcake">
    {@render children?.({ supabase })}
</div>
