<script>
    let { showModel, content, onClose, audioSrc } = $props();
    $inspect(audioSrc);
    import AudioPlayer from "$lib/components/AudioPlayerSimple.svelte";
    let dialog = $state();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
{#if showModel}
    <div
        role="dialog"
        tabindex="0"
        bind:this={dialog}
        onclose={() => (showModel = false)}
        onclick={(e) => {
            if (e.target === e.currentTarget) onClose?.();
        }}
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 border-none backdrop:backdrop-blur-sm"
    >
        <div
            class="bg-primary p-6 rounded shadow-lg max-w-[60%] text-primary-content"
        >
            <h1 class="decoration-black text-xl underline underline-offset-4">
                Transcript
            </h1>
            <p class="accent-gray-100 italic">{content}</p>
            <h1
                class="mt-3 mb-1 decoration-black text-xl underline underline-offset-4"
            >
                Audio
            </h1>
            <div class="flex flex-col justify-center align-items">
                <audio src={audioSrc} controls autoplay class="rounded-sm"
                ></audio>
            </div>
        </div>
    </div>
{/if}
