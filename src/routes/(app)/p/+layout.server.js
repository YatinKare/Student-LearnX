import { fail } from '@sveltejs/kit';
export const load = async ({ locals: { session, supabase }, cookies, }) => {

    const safeGetSession = async () => {
        const {
            data: { session },
            error
        } = await supabase.auth.getSession()
        if (!session) {
            return { session: null, user: null }
        }

        const {
            data: { user }
        } = await supabase.auth.getUser()
        if (error) {
            return { session: null, user: null }
        }

        return { session, user }
    }


    if (session != null) {

        const response = await safeGetSession();
        const access_token = response.session.access_token;
        try {
            const response = await fetch('http://127.0.0.1:8000/presentations', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            });

            const result = await response.json();
            console.log(result);

            if (!response.ok) {
                return fail(response.status, {
                    error: true,
                    message: result.detail || 'Upload failed on FastAPI server.',
                });
            }


        } catch (error) {
            console.error('Error getting from FastAPI:', error);
            return fail(500, {
                error: true,
                message: 'Server error during upload.',
            });
        }
    }
    return {
        session,
        cookies: cookies.getAll(),
    }
}
