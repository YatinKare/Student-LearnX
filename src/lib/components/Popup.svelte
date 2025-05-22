<script>
    let { showModel, content, onClose } = $props();
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
        <div class="bg-white p-6 rounded shadow-lg max-w-[60%]">
            <h1 class="decoration-black text-xl">Transcript:</h1>
            <p class="accent-gray-100 italic">{content}</p>
        </div>
    </div>
{/if}
