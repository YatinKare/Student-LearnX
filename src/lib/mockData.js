export const mockPresentation = {
    id: 'pres1',
    title: 'Effective Delivery Techniques',
    slides: [
        {
            id: 'slide1',
            slideNumber: 0,
            title: 'EFFECTIVE DELIVERY TECHNIQUES',
            bulletPoints: [
                { id: 'bp1-1', text: 'bulet point 1', transcription: 'This is a powerful tool in public speaking. It involves varying pitch, tone, and volume to convey emotion, emphasize points, and maintain interest.' }, // Made this one longer as per design.
                { id: 'bp1-2', text: 'Pitch variation', transcription: 'bullet point 2' },
                { id: 'bp1-3', text: 'Tone inflection', transcription: 'bullet point 3' },
                { id: 'bp1-4', text: 'Volume control', transcription: 'bullet point 4' } // Added a fourth to better match screenshot
            ],
            // Placeholder for where a background image or more complex content might go
            // For now, we'll render title and bulletPoints directly.
            contentImageUrl: 'https://via.placeholder.com/800x600/f0f0f0/333333?text=Slide+1+Background'
        },
        {
            id: 'slide2',
            slideNumber: 1,
            title: 'Understanding Your Audience',
            bulletPoints: [
                { id: 'bp2-1', text: 'Analyze demographics and psychographics.', transcription: 'bullet point 1' },
                { id: 'bp2-2', text: 'Identify their needs and expectations.', transcription: 'bullet point 2' },
                { id: 'bp2-3', text: 'Tailor your message accordingly.', transcription: 'bullet point 3' }
            ],
            contentImageUrl: 'https://via.placeholder.com/800x600/e0e0e0/333333?text=Slide+2+Background'
        },
        {
            id: 'slide3',
            slideNumber: 2,
            title: 'Visual Aids Best Practices',
            bulletPoints: [
                { id: 'bp3-1', text: 'Keep visuals simple and clear.', transcription: 'bullet point 1' },
                { id: 'bp3-2', text: 'Use high-quality images and graphics.', transcription: 'bullet point 2' },
                { id: 'bp3-3', text: 'Ensure text is readable from a distance.', transcription: 'bullet point 3' }
            ],
            contentImageUrl: 'https://via.placeholder.com/800x600/d0d0d0/333333?text=Slide+3+Background'
        }
    ]
};
