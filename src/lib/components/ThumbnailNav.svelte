<script>
    import { slide } from "svelte/transition";

    let { slidesSrc, currentSlide, updateSlide, increaseSlide, decreaseSlide } =
        $props();

    function selectSlide(slideId) {
        if (onNavigate) {
            onNavigate({ slideId }); // Call the callback prop
        } else {
            // Optional: Warn if the callback wasn't provided, though typically it should be.
            console.warn(
                "ThumbnailNav: onNavigate callback was not provided but selectSlide was called.",
            );
        }
    }

    function scrollThumbnails(direction) {
        const container = document.getElementById("thumbnail-container");
        if (container) {
            const scrollAmount = direction * (container.offsetWidth * 0.75);
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    }
</script>

<div
    class="bg-base-300 filter drop-shadow-lg p-2 md:p-3 flex items-center shadow-md h-24 md:h-28 shrink-0 rounded-sm"
>
    <!--
    <button onclick={() => updateSlide(1)}>updateSlide</button>
-->
    {#if slidesSrc.length > 5}
        <button
            onclick={() => decreaseSlide()}
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
        class="flex-1 flex space-x-2 px-2 mx-1 md:mx-2 scrollbar-hide h-full items-center justify-center"
    >
        {#each slidesSrc as slide}
            <button
                onclick={() => updateSlide(slide.slideNumber)}
                class="flex-shrink-0 rounded border-2 h-[calc(100%-1rem)] aspect-[4/3]
				       {currentSlide === slide.slideNumber
                    ? 'border-primary'
                    : 'border-transparent hover:border-neutral'}
				       transition-all duration-150 ease-in-out overflow-hidden bg-gray-300"
                title="Go to slide {slide.contentImageUrl.match(
                    /S(\d+)/,
                )?.[1] || ''}"
            >
                <img
                    src={slide.contentImageUrl}
                    alt="Slide Thumbnail {slide.slideNumber + 1}"
                    class="h-full w-full object-cover"
                />
            </button>
        {/each}
    </div>

    {#if slidesSrc.length > 5}
        <button
            onclick={() => increaseSlide()}
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
