// src/hooks.server.js
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_API_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

// First handle: sets up the Supabase client and safeGetSession
const supabase = async ({ event, resolve }) => {
    event.locals.supabase = createServerClient(
        PUBLIC_SUPABASE_URL,
        PUBLIC_SUPABASE_API_KEY,
        {
            cookies: {
                getAll: () => event.cookies.getAll(),
                setAll: (cookiesToSet) => {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        event.cookies.set(name, value, { ...options, path: '/' })
                    })
                },
            },
        }
    )

    event.locals.safeGetSession = async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user },
            error,
        } = await event.locals.supabase.auth.getUser()
        if (error) {
            return { session: null, user: null }
        }

        return { session, user }
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range' || name === 'x-supabase-api-version'
        },
    })
}

// Second handle: protects routes
const authGuard = async ({ event, resolve }) => {
    const { session, user } = await event.locals.safeGetSession()
    event.locals.session = session
    event.locals.user = user

    if (event.url.pathname.startsWith('/account')) {
        if (!event.locals.session) {
            throw redirect(303, '/login')
        }
    }

    if (event.url.pathname.startsWith('/login')) {
        if (event.locals.session) {
            throw redirect(303, '/p/36b7a0b1-7a63-4632-a95d-a179495f6236')
        }
    }

    return resolve(event)
}

// Export the sequenced handlers as the single `handle` function
export const handle = sequence(supabase, authGuard)
