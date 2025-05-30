<script>
    let { slidesSrc, currentSlide, updateSlide, increaseSlide, decreaseSlide } =
        $props();

    // How many visable slides there should be.
    const visableCount = 5;
    // the subarray that has the visable slides
    let currentSlidesRange = $derived(slidesSrc.slice(0, visableCount));

    // BOTH FUNCS: Check if the next slide is out of view and
    // updates the visbable slides.
    function overflowRight() {
        if (currentSlide % (visableCount + 1) === 0) {
            currentSlidesRange = slidesSrc.slice(
                currentSlide - 1,
                currentSlide + visableCount - 1,
            );
        }
    }

    function overflowLeft() {
        if (currentSlide % visableCount === 0) {
            currentSlidesRange = slidesSrc.slice(
                currentSlide - visableCount,
                currentSlide,
            );
        }
    }
</script>

<div
    class="bg-base-300 filter drop-shadow-lg p-2 md:p-3 flex flex-row items-center shadow-md h-24 md:h-28 shrink-0 rounded-sm"
>
    {#if slidesSrc.length > visableCount}
        <button
            onclick={() => {
                decreaseSlide();
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
        id="thumbnail-container"
        class="flex-1 flex flex-wrap overflow-hidden space-x-2 px-2 mx-1 md:mx-2 scrollbar-hide h-full items-center justify-center"
    >
        {#each currentSlidesRange as slide}
            <button
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
                    alt="Slide Thumbnail {slide.slideNumber + 1}"
                    class="h-fit w-fit object-cover"
                />
            </button>
        {/each}
    </div>

    {#if slidesSrc.length > visableCount}
        <button
            onclick={() => {
                increaseSlide();
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
