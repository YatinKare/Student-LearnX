<script>
    import { onMount } from "svelte";
    let {
        slidesSrc,
        currentSlide,
        updateSlide,
        increaseSlide,
        decreaseSlide,
        totalSlides,
    } = $props();

    let total_width = $state();
    let thumbnail_width = $state();

    let visableThumbnails = $derived(
        Math.min(5, Math.floor(total_width / (thumbnail_width + 20.423))),
    );

    // How many visable slides there should be.
    let visableCount = $state(5);
    // the subarray that has the visable slides
    let currentSlidesRange = $derived(slidesSrc.slice(0, visableCount));

    $effect(() => {
        currentSlidesRange = slidesSrc.slice(0, visableThumbnails);
        visableCount = visableThumbnails;
    });

    // BOTH FUNCS: Check if the next slide is out of view and
    // updates the visbable slides.
    function overflowRight() {
        const lastIndex = currentSlidesRange[currentSlidesRange.length - 1];
        if (lastIndex.slideNumber + 1 < totalSlides) {
            currentSlide = lastIndex.slideNumber + 1;
            currentSlidesRange = slidesSrc.slice(
                lastIndex.slideNumber,
                lastIndex.slideNumber + visableThumbnails,
            );
            updateSlide(currentSlide);
        }
    }

    function overflowLeft() {
        if (currentSlidesRange[0].slideNumber - visableThumbnails > 0) {
            currentSlide =
                currentSlidesRange[0].slideNumber - visableThumbnails;
            currentSlidesRange = slidesSrc.slice(
                currentSlidesRange[0].slideNumber - visableThumbnails - 1,
                currentSlidesRange[0].slideNumber - 1,
            );
            updateSlide(currentSlide);
        }
    }
</script>

<div
    class="bg-base-300 filter drop-shadow-lg p-2 md:p-3 flex flex-row items-center shadow-md h-24 md:h-28 shrink-0 rounded-sm"
>
    {#if slidesSrc.length > visableCount}
        <button
            onclick={() => {
                overflowLeft();
            }}
            class="p-2 text-black hover:bg-primary rounded-full"
            aria-label="Scroll left"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 md:w-6 md:h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                />
            </svg>
        </button>
    {/if}

    <div
        bind:clientWidth={total_width}
        id="thumbnail-container"
        class="flex-1 flex flex-wrap overflow-hidden space-x-2 px-2 mx-1 md:mx-2 scrollbar-hide h-full items-center justify-center"
    >
        {#each currentSlidesRange as slide}
            <button
                bind:clientWidth={thumbnail_width}
                onclick={() => updateSlide(slide.slideNumber)}
                class="flex-shrink-0 rounded border-4 h-[100%] aspect-[4/3]
				       {currentSlide === slide.slideNumber
                    ? 'border-primary'
                    : 'border-transparent hover:border-neutral'}
				       transition-all duration-150 ease-in-out overflow-hidden bg-gray-300"
                title="Go to slide: {slide.SlideNumber}"
            >
                <img
                    src={slide.ThumbnailSrc}
                    alt="Slide Thumbnail {(slide.slideNumber + 1).toString()}"
                    class="h-fit w-fit object-cover"
                />
            </button>
        {/each}
    </div>

    {#if slidesSrc.length > visableCount}
        <button
            onclick={() => {
                overflowRight();
            }}
            class="p-2 text-black hover:bg-primary rounded-full"
            aria-label="Scroll right"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 md:w-6 md:h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
        </button>
    {/if}
</div>

<style>
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>
