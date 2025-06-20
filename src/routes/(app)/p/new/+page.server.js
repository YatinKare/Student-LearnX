import { fail } from '@sveltejs/kit';
import { FormData } from 'undici';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const files = formData.getAll('uploadedFiles');

        if (!files || files.length === 0) {
            return fail(400, {
                error: true,
                message: 'No files were uploaded.',
            });
        }

        let pptFile, audioFile;

        for (const file of files) {
            const mimeType = file.type;
            const name = file.name;

            if (
                mimeType.includes('presentation') ||
                name.endsWith('.ppt') ||
                name.endsWith('.pptx')
            ) {
                pptFile = file;
            } else if (
                mimeType.startsWith('audio/') ||
                name.endsWith('.mp3') ||
                name.endsWith('.wav')
            ) {
                audioFile = file;
            }
        }

        if (!pptFile || !audioFile) {
            return fail(400, {
                error: true,
                message: 'Both PowerPoint and audio files are required.',
            });
        }

        const forwardForm = new FormData();
        forwardForm.append('ppt_file', pptFile, pptFile.name);
        forwardForm.append('audio_file', audioFile, audioFile.name);

        try {
            const response = await fetch('http://127.0.0.1:8000/upload', {
                method: 'POST',
                body: forwardForm,
                headers: forwardForm.headers,
            });

            const result = await response.json();

            if (!response.ok) {
                return fail(response.status, {
                    error: true,
                    message: result.detail || 'Upload failed on FastAPI server.',
                });
            }

            return {
                success: true,
                message: 'Files uploaded successfully!',
                data: result,
            };
        } catch (error) {
            console.error('Error uploading to FastAPI:', error);
            return fail(500, {
                error: true,
                message: 'Server error during upload.',
            });
        }
    },
};

