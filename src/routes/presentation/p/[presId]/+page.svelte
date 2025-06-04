<script>
    import Popup from "$lib/components/Popup.svelte";
    import ThumbnailNav from "$lib/components/ThumbnailNav.svelte";
    let { data, params } = $props();

    let currentSlide = $state(1);
    let totalSlides = $derived(data.totalSlides);

    let activeModalId = $state(null);
    let title = $derived(data.slides[currentSlide - 1].title);
    let slidesSrc = data.slides.map((slides) => ({
        slideNumber: slides.slideNumber,
        ThumbnailSrc:
            "/src/lib/images/thumbnails/" + encodeURI(slides.ThumbnailSrc),
    }));

    function updateSlide(slideNumber) {
        currentSlide = slideNumber;
        data = data;
    }
    function decreaseSlide() {
        if (currentSlide > 1) {
            currentSlide--;
            data = data;
        }
    }
    function increaseSlide() {
        if (currentSlide < data.totalSlides) {
            currentSlide++;
            data = data;
        }
    }
</script>

<div class="flex flex-col h-full w-full overflow-hidden bg-base-100 gap-3">
    <div class="flex-1 w-full bg-white rounded-lg shadow-md p-6">
        <h1 class="text-2xl font-semibold text-gray-700">{title}</h1>
        <ul class="text-gray-600 mt-2 list-disc ml-[2em]">
            {#each data.slides[currentSlide - 1].bulletPoints as list}
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

    <ThumbnailNav
        {updateSlide}
        {currentSlide}
        {slidesSrc}
        {decreaseSlide}
        {increaseSlide}
        {totalSlides}
    />
</div>

<svelte:head>
    <title>Presentation View</title>
</svelte:head>
