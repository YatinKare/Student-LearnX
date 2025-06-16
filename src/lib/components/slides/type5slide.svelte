<script>
    import Popup from "$lib/components/Popup.svelte";
    let { title, currentSlideData, activeModalId } = $props();
</script>

<div class="flex flex-col items-center justify-center w-[100%] gap-6">
    <h1 class="text-4xl font-semibold text-gray-700">{title}</h1>
    <h2 class="text-2xl font-semibold text-gray-700">
        {currentSlideData.subtitle}
    </h2>
</div>
