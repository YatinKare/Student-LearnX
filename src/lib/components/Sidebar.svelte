<script>
    // Placeholder navigation items, as discussed
    import { mockPresentation } from "$lib/mockData";
    const navItems = [{ href: "/presentation", label: mockPresentation.title }];
</script>

<aside
    class="drawer w-60 md:w-64 bg-base-300 p-4 md:p-5 flex flex-col justify-between rounded-sm"
>
    <div class="drawer-content">
        <div>
            <div class="mb-10 pt-3 pb-3 text-center">
                <h1 class="text-xl md:text-2xl font-semibold">LearnX</h1>
            </div>

            <nav class="space-y-2">
                {#each navItems as item}
                    <a
                        href={item.href}
                        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-neutral hover:text-neutral-content text-sm md:text-base"
                    >
                        {item.label}
                    </a>
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
