import { error } from '@sveltejs/kit';
import { mockPresentation } from '$lib/mockData.js';
export function load({ params }) {
    if (params.presId != "36b7a0b1-7a63-4632-a95d-a179495f6236") {
        error(404, {
            message: 'Page Not Found'
        })
    }
    console.log(`current slug: ${params.presId}`);
    return mockPresentation;
}
