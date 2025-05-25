<script>
    import Sidebar from "$lib/components/Sidebar.svelte";
    import ThumbnailNav from "$lib/components/ThumbnailNav.svelte";
    import { mockPresentation } from "$lib/mockData.js";

    // This state would ideally be managed more globally or passed down if slides change
    // For now, just passing mock slides to ThumbnailNav
    let slidesForNav = mockPresentation.slides.map((s) => ({
        id: s.id,
        thumbnailUrl: `https://via.placeholder.com/100x75/eff6ff/3b82f6?text=S${s.slideNumber}`, // Generic thumbnail
    }));

    // In a real app, currentSlideId would be reactive and affect the main content view.
    // We'll manage this more directly in the +page.svelte for now.
</script>

<div data-theme="cupcake">
    <div class="min-h-screen flex items-center justify-center bg-primary">
        <div
            class="flex h-screen w-full h-[90vh] overflow-hidden bg-base-100 p-8 font-sans border-[15px] border-primary rounded-sm"
        >
            <Sidebar />
            <divider class="divider divider-horizontal"></divider>

            <main class="flex-1 flex flex-col overflow-hidden">
                <div class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                    <slot />
                </div>

                <ThumbnailNav slides={slidesForNav} />
            </main>
        </div>
    </div>
</div>
<!-->
<div class="min-h-screen bg-purple-900 p-0">
    <div
        class="border-[5vw] border-purple-900 bg-[#DBD1D1] min-h-screen w-full font-sans"
    >
        <div class="flex h-full">
            <Sidebar />

            <main class="flex-1 flex flex-col overflow-hidden">
                <div class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                    <slot />
                </div>

                <ThumbnailNav slides={slidesForNav} />
            </main>
        </div>
    </div>
</div>
</-->
