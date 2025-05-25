<script>
    let { slides = [], currentSlideId = "", onNavigate } = $props();

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
    class="bg-base-300 filter drop-shadow-lg p-2 md:p-3 flex items-center justify-between shadow-md h-24 md:h-28 shrink-0 rounded-sm"
>
    <button
        onclick={() => scrollThumbnails(-1)}
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

    <div
        id="thumbnail-container"
        class="flex-1 flex overflow-x-auto space-x-2 px-2 mx-1 md:mx-2 scrollbar-hide h-full items-center"
    >
        {#each slides as slide (slide.id)}
            <button
                onclick={() => selectSlide(slide.id)}
                class="flex-shrink-0 rounded border-2 h-[calc(100%-1rem)] aspect-[4/3]
				       {currentSlideId === slide.id
                    ? 'border-blue-500 scale-105'
                    : 'border-transparent hover:border-slate-500'}
				       transition-all duration-150 ease-in-out overflow-hidden bg-gray-300"
                title="Go to slide {slide.thumbnailUrl.match(/S(\d+)/)?.[1] ||
                    ''}"
            >
                <img
                    src={slide.thumbnailUrl}
                    alt="Slide Thumbnail {slide.id}"
                    class="h-full w-full object-cover"
                />
            </button>
        {/each}
    </div>

    <button
        onclick={() => scrollThumbnails(1)}
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
