<script>
    import Popup from "$lib/components/Popup.svelte";
    import ThumbnailNav from "$lib/components/ThumbnailNav.svelte";
    import Type1slide from "$lib/components/slides/type1slide.svelte";
    import Type2slide from "$lib/components/slides/type2slide.svelte";
    import Type3slide from "$lib/components/slides/type3slide.svelte";
    import Type4slide from "$lib/components/slides/type4slide.svelte";
    import Type5slide from "$lib/components/slides/type5slide.svelte";
    import TypeErrorSlide from "$lib/components/slides/typeErrorSlide.svelte";
    import { createRawSnippet } from "svelte";
    let { data, params } = $props();

    let currentSlide = $state(1);
    let totalSlides = $derived(data.totalSlides);

    let activeModalId = $state(null);
    let title = $derived(data.slides[currentSlide - 1].title);
    let currentSlideType = $derived(data.slides[currentSlide - 1].slideType);
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

{#snippet Slide(type)}
    {#if type === 1}
        <Type1slide
            {title}
            currentSlideData={data.slides[currentSlide - 1].bulletPoints}
            {activeModalId}
        />
    {:else if type === 2}
        <Type2slide
            {title}
            currentSlideData={data.slides[currentSlide - 1]}
            {activeModalId}
        />
    {:else if type === 3}
        <Type3slide
            {title}
            currentSlideData={data.slides[currentSlide - 1]}
            {activeModalId}
        />
    {:else if type === 4}
        <Type4slide
            {title}
            currentSlideData={data.slides[currentSlide - 1]}
            {activeModalId}
        />
    {:else if type === 5}
        <Type5slide
            {title}
            currentSlideData={data.slides[currentSlide - 1]}
            {activeModalId}
        />
    {:else}
        <TypeErrorSlide />
    {/if}
{/snippet}

<div class="flex flex-col h-full w-full overflow-hidden bg-base-100 gap-3">
    <div class="flex flex-1 w-full bg-white rounded-lg shadow-md p-6">
        {@render Slide(currentSlideType)}
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
