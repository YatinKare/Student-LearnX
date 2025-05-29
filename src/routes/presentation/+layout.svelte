<script>
    import Sidebar from "$lib/components/Sidebar.svelte";
    import ThumbnailNav from "$lib/components/ThumbnailNav.svelte";
    let { children } = $props();
</script>

<div data-theme="cupcake">
    <div class="min-h-screen flex items-center justify-center bg-primary">
        <div
            class="flex h-screen w-full overflow-hidden bg-base-100 p-8 font-sans border-[15px] border-primary rounded-sm"
        >
            <Sidebar />
            <divider class="divider divider-horizontal"></divider>

            <main class="flex-1 flex flex-col overflow-hidden">
                <div class="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                    {@render children()}
                </div>
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
