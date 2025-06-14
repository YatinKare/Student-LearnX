<script>
    import Popup from "$lib/components/Popup.svelte";
    let { title, currentSlideData, activeModalId } = $props();

    $inspect(currentSlideData);
</script>

<div>
    <h1 class="text-2xl font-semibold text-gray-700">{title}</h1>
    <div class="flex flex-row gap-2">
        <ul class="text-gray-600 mt-2 list-disc ml-[2em]">
            {#each currentSlideData.bulletPoints as list}
                <li
                    class="transition duration-150 hover:bg-primary w-fit rounded-sm p-1.5"
                >
                    <div
                        role="button"
                        tabindex="0"
                        onclick={() => (activeModalId = list.id)}
                        onkeydown={() => {}}
                        onkeyup={() => {}}
                        class="w-fit"
                    >
                        {list.text}
                    </div>
                </li>
                <Popup
                    showModel={activeModalId === list.id}
                    audioSrc={Object.hasOwn(list, "src") ? list["src"] : ""}
                    onClose={() => (activeModalId = null)}
                    content={list.transcription}
                    class="flex justify-center items-center"
                ></Popup>
            {/each}
        </ul>
        {#each currentSlideData.images as image}
            <div
                role="button"
                tabindex="0"
                onclick={() => (activeModalId = image.id)}
                onkeydown={() => {}}
                onkeyup={() => {}}
                class="transition duration-150 hover:brightness-50 w-fit rounded-sm p-0.5"
            >
                <img
                    class="rounded-sm m-2 border-4 border-primary aspect-[auto] overflow-hidden min-w-[350px]"
                    src={image.imageSrc}
                    alt={image.alt}
                />
            </div>
            <Popup
                showModel={activeModalId === image.id}
                audioSrc={Object.hasOwn(image, "src") ? image["src"] : ""}
                onClose={() => (activeModalId = null)}
                content={image.transcription}
                class="flex justify-center items-center"
            ></Popup>
        {/each}
    </div>
</div>
