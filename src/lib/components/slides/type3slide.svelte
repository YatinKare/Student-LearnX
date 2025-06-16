<script>
    import Popup from "$lib/components/Popup.svelte";
    let { title, currentSlideData, activeModalId } = $props();
</script>

<div class="flex flex-col grow">
    <h1 class="text-2xl font-semibold text-gray-700">{title}</h1>
    <div class="flex flex-row grow gap-2">
        <div
            class=" border-2 border-gray-200 rounded-sm transition duration-100 hover:border-gray-400 grow"
        >
            <ul class="text-gray-600 mt-2 list-disc ml-[2em] w-1/2">
                {#each currentSlideData.leftColumn as item}
                    <li
                        class="transition duration-150 hover:bg-primary w-fit rounded-sm p-1.5"
                    >
                        <div
                            role="button"
                            tabindex="0"
                            onclick={() => (activeModalId = item.id)}
                            onkeydown={() => {}}
                            onkeyup={() => {}}
                            class="w-fit"
                        >
                            {item.text}
                        </div>
                    </li>
                    <Popup
                        showModel={activeModalId === item.id}
                        audioSrc={Object.hasOwn(item, "src") ? item["src"] : ""}
                        onClose={() => (activeModalId = null)}
                        content={item.transcription}
                        class="flex justify-center items-center"
                    ></Popup>
                {/each}
            </ul>
        </div>

        <div
            class=" border-2 border-gray-200 rounded-sm transition duration-100 hover:border-gray-400 grow"
        >
            <ul class="text-gray-600 mt-2 list-disc ml-[2em] w-1/2">
                {#each currentSlideData.rightColumn as item}
                    <li
                        class="transition duration-150 hover:bg-primary w-fit rounded-sm p-1.5"
                    >
                        <div
                            role="button"
                            tabindex="0"
                            onclick={() => (activeModalId = item.id)}
                            onkeydown={() => {}}
                            onkeyup={() => {}}
                            class="w-fit"
                        >
                            {item.text}
                        </div>
                    </li>
                    <Popup
                        showModel={activeModalId === item.id}
                        audioSrc={Object.hasOwn(item, "src") ? item["src"] : ""}
                        onClose={() => (activeModalId = null)}
                        content={item.transcription}
                        class="flex justify-center items-center"
                    ></Popup>
                {/each}
            </ul>
        </div>
    </div>
</div>
