import { mockPresentation } from '$lib/mockData.js';
export function load({ params }) {
    console.log(params.presId);
    return mockPresentation;
}
