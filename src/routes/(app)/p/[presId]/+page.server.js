import { error } from '@sveltejs/kit';
export async function load({ fetch, params }) {
    const res = await fetch(`http://127.0.0.1:8000/presentation/${params.presId}`);

    if (!res.ok) {
        throw error(res.status, { message: 'Error fetching presentation' })
    }

    const data = (await res.json());
    return data;
}
