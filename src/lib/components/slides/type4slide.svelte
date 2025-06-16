<script>
    import Popup from "$lib/components/Popup.svelte";
    let { title, currentSlideData, activeModalId } = $props();
</script>

<div class="flex flex-col">
    <h1 class="text-2xl font-semibold text-gray-700">{title}</h1>
    <div class="flex flex-row flex-grow">
        <div>
            <div
                role="button"
                tabindex="0"
                onclick={() => (activeModalId = currentSlideData.text.id)}
                onkeydown={() => {}}
                onkeyup={() => {}}
                class=" text-gray-600 mt-2 transition duration-150 hover:bg-primary w-fit rounded-sm p-1.5"
            >
                {currentSlideData.text.text}
            </div>
            <Popup
                showModel={activeModalId === currentSlideData.text.id}
                audioSrc={Object.hasOwn(currentSlideData.text, "src")
                    ? currentSlideData.text["src"]
                    : ""}
                onClose={() => (activeModalId = null)}
                content={currentSlideData.text.transcription}
                class="flex justify-center items-center"
            ></Popup>
        </div>
    </div>
</div>
