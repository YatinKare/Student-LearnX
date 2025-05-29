<script>
    // This page will manage the currently displayed slide and the pop-up logic.
    // We'll add $state, $derived, etc., here as needed in the next steps.
    // For example:
    // import { mockPresentation, mockTranscriptions } from '$lib/mockData.js';
    // import { page } from '$app/stores'; // To get layout's activeSlideId or manage its own
    //
    // let currentSlideData = $state(mockPresentation.slides[0]);
    // let showPopup = $state(false);
    // let popupContent = $state('');
    //
    // Will need to sync with activeSlideId from the layout, perhaps via a store or by
    // making activeSlideId in the layout a prop passed down through the page.
    // For now, this page is just a placeholder for the main content area.
    //
    import Popup from "$lib/components/Popup.svelte";
    import ThumbnailNav from "$lib/components/ThumbnailNav.svelte";
    let showModel = $state(false);
    let { data } = $props();
    let currentSlide = $state(0);

    let activeModalId = $state(null);
    let title = $derived(data.slides[currentSlide].title);
    let slidesSrc = data.slides.map((slides) => ({
        slideNumber: slides.slideNumber,
        contentImageUrl: slides.contentImageUrl,
    }));

    const updateSlide = (slideNumber) => {
        currentSlide = slideNumber;
        data = data;
    };
    const decreaseSlide = () => {
        currentSlide--;
        data = data;
    };
    const increaseSlide = () => {
        currentSlide++;
        data = data;
    };
</script>

<div class="flex flex-col h-[80vh] w-full overflow-hidden bg-base-100 gap-3">
    <div class="flex-1 w-full bg-white rounded-lg shadow-md p-6">
        <h1 class="text-2xl font-semibold text-gray-700">{title}</h1>
        <ul class="text-gray-600 mt-2 list-disc ml-[2em]">
            {#each data.slides[currentSlide].bulletPoints as list}
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
    />
</div>

<svelte:head>
    <title>Presentation View</title>
</svelte:head>
