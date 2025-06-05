<script>
    // Placeholder navigation items, as discussed
    import { mockPresentation } from "$lib/mockData";
    import { page } from "$app/state";
    const navItems = [
        {
            id: mockPresentation.id,
            href: `/presentation/p/${mockPresentation.id}`,
            label: mockPresentation.title,
        },
    ];
    const showModal = () => {
        document.getElementById("my_modal_1").showModal();
    };
</script>

<aside
    class="drawer w-60 md:w-64 bg-base-300 p-4 md:p-5 flex flex-col justify-between rounded-sm"
>
    <div class="drawer-content flex flex-col justify-between h-full">
        <div>
            <div class="mb-10 pt-3 pb-3 text-center">
                <h1 class="text-xl md:text-2xl font-semibold">LearnX</h1>
            </div>

            <div class="">
                <button
                    class="btn accent-primary-content flex w-full py-2.5 px-4 mb-5 rounded transition duration-200 hover:bg-neutral hover:text-neutral-content text-sm md:text-base text-center items-center justify-center bg-primary"
                    onclick={showModal}>New Chat</button
                >
            </div>
            <dialog id="my_modal_1" class="modal">
                <div class="modal-box">
                    <h3 class="text-xl font-bold">Create New Chat</h3>
                    <p class="py-4">Here you can create a new chat!</p>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <nav class="space-y-2">
                {#each navItems as item}
                    {#if page.url.pathname === `/presentation/p/${mockPresentation.id}`}
                        <a
                            href={item.href}
                            class="bg-base-100 block py-2.5 px-4 rounded transition duration-200 hover:bg-neutral hover:text-neutral-content text-sm md:text-base"
                        >
                            {item.label}
                        </a>
                    {:else}
                        <a
                            href={item.href}
                            class="block py-2.5 px-4 rounded transition duration-200 hover:bg-neutral hover:text-neutral-content text-sm md:text-base"
                        >
                            {item.label}
                        </a>
                    {/if}
                {/each}
            </nav>
        </div>
        <div>
            <a
                href="/account"
                class="block py-2.5 px-4 rounded transition duration-200 hover:bg-neutral hover:text-neutral-content text-sm md:text-base"
            >
                My Account
            </a>
        </div>
    </div>
</aside>
