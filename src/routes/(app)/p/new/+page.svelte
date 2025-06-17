<script>
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import PricingModule from "../../../(marketing)/pricing/PricingModule.svelte";

    let { data, params } = $props();

    let selectedFiles = $state([]);
    let fileValidationMessage = $state("");

    const validPowerpointMimeTypes = [
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.ms-powerpoint",
    ];
    const validAudioMimeTypes = ["audio/mpeg", "audio/wav", "audio/aac"];

    function deleteFile(event) {
        console.log(event);
    }

    function handleFileChange(event) {
        const newFiles = Array.from(event.target.files);
        fileValidationMessage = "";

        // Add new files to the existing ones, avoiding duplicates by name
        for (const newFile of newFiles) {
            const existingIndex = selectedFiles.findIndex(
                (f) => f.name === newFile.name,
            );
            if (existingIndex === -1) {
                selectedFiles = [...selectedFiles, newFile];
            }
        }

        let powerpointFile = selectedFiles.find((file) =>
            validPowerpointMimeTypes.includes(file.type),
        );
        let audioFile = selectedFiles.find((file) =>
            validAudioMimeTypes.includes(file.type),
        );

        if (!powerpointFile && !audioFile) {
            fileValidationMessage =
                "Please upload one PowerPoint file and one audio file.";
        } else if (!powerpointFile) {
            fileValidationMessage =
                "PowerPoint file missing. Please upload one PowerPoint file.";
        } else if (!audioFile) {
            fileValidationMessage =
                "Audio file missing. Please upload one audio file.";
        } else {
            fileValidationMessage = "Files ready for upload.";
        }
    }
</script>

<div class="flex flex-col h-full w-full overflow-hidden bg-base-100 gap-3">
    <div
        class="flex flex-1 w-full bg-white rounded-lg shadow-md p-6 justify-center items-center"
    >
        <form
            method="POST"
            action="?/uploadFiles"
            use:enhance
            enctype="multipart/form-data"
        >
            <fieldset class="fieldset">
                <legend class="text-2xl font-semibold mb-4 text-center"
                    >Upload Your Files</legend
                >
                <input
                    type="file"
                    id="input"
                    class="file-input"
                    multiple
                    accept=".pptx, .ppt, .mp3, .wav, .mpeg, .aac"
                    onchange={handleFileChange}
                    name="uploadedFiles"
                />
                <label class="label" for="input">
                    Upload one PowerPoint and one Audio file.<br /> Max size 2MB
                    per file.
                </label>
                {#if fileValidationMessage}
                    <p
                        class="my-2 {fileValidationMessage ===
                        'Files ready for upload.'
                            ? 'text-success'
                            : 'text-error'}"
                    >
                        {fileValidationMessage}
                    </p>
                {/if}

                {#if true || (fileValidationMessage === "Files ready for upload." && selectedFiles.length > 0)}
                    <div class="mt-4">
                        <!--
                        <h3 class="text-lg font-medium mb-2">
                            Selected Files:
                        </h3>
                        -->
                        <ul class="menu bg-base-200 rounded-box text-sm">
                            <li class="menu-title text-lg font-medium">
                                Selected Files:
                            </li>
                            {#each selectedFiles as file}
                                <li class="flex flex-row">
                                    <button
                                        class="tooltip tooltip-right"
                                        data-tip="delete"
                                        onclick={deleteFile}
                                    >
                                        {file.name} ({Math.round(
                                            file.size / 1024,
                                        )} KB)
                                    </button>
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <button type="submit" class="btn btn-primary w-full mt-6"
                        >Upload Files</button
                    >
                {/if}
            </fieldset>
        </form>

        {#if $page.form}
            {#if $page.form.success}
                <div class="alert alert-success mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <div>
                        <span>{$page.form.message}</span>
                        {#if $page.form.uploadedFileNames}
                            <ul class="list-disc pl-5 text-sm">
                                {#each $page.form.uploadedFileNames as fileName}
                                    <li>{fileName}</li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                </div>
            {/if}
            {#if $page.form.error}
                <div class="alert alert-error mt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        /></svg
                    >
                    <span>Error: {$page.form.message}</span>
                </div>
            {/if}
        {/if}
    </div>
</div>

<svelte:head>
    <title>Upload New Presentation</title>
</svelte:head>
