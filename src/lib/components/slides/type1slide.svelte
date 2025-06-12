<script>
    import Popup from "$lib/components/Popup.svelte";
    let { title, currentSlideData, activeModalId } = $props();
</script>

<div>
    <h1 class="text-2xl font-semibold text-gray-700">{title}</h1>
    <div class="flex flex-row">
        <ul class="text-gray-600 mt-2 list-disc ml-[2em]">
            {#each currentSlideData as list}
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
    </div>
</div>
