import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const files = formData.getAll('uploadedFiles');

        // Basic validation: check if files are present
        if (!files || files.length === 0) {
            return fail(400, {
                error: true,
                message: 'No files were uploaded.',
            });
        }

        // Log information about the received files
        console.log('Received files on server:');
        for (const file of files) {
            console.log(`- ${file.name} (${file.type}, ${file.size} bytes)`);
            // Here you would typically save the file or process it further
            // For example, using Node.js fs module to save:
            // import fs from 'fs/promises';
            // import path from 'path';
            // const filePath = path.join('uploads', file.name); // Ensure 'uploads' directory exists
            // await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
        }

        // For now, just returning a success message
        return {
            success: true,
            message: 'Files received by server and logged.',
            uploadedFileNames: files.map(f => f.name)
        };
    },
};

