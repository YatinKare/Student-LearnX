export const load = async ({ locals: { safeGetSession }, cookies, url }) => {
    const { session, user } = await safeGetSession()
    return {
        session,
        cookies: cookies.getAll(),
        url: url.origin,
    }
}
