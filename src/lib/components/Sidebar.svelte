<script>
    // Placeholder navigation items, as discussed
    const navItems = [
        { href: "/presentation", label: "New Presentation" }, // Assuming /presentation is the main view
    ];
</script>

<aside
    class="w-60 md:w-64 bg-[#DBD1D1] text-white p-4 md:p-5 border-r border-white border-opacity-40 flex flex-col justify-between"
>
    <div>
        <div class="mb-10 pt-3 pb-3 text-center">
            <h1 class="text-xl md:text-2xl font-semibold">Presentation Tool</h1>
        </div>
        <nav class="space-y-2">
            {#each navItems as item}
                <a
                    href={item.href}
                    class="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#736EAE] text-sm md:text-base"
                    class:bg-[#736EAE]={item.href === "/presentation"}
                >
                    {item.label}
                </a>
            {/each}
        </nav>
    </div>
    <div>
        <a
            href="/account"
            class="block py-2.5 px-4 rounded transition duration-200 hover:bg-[#736EAE] text-sm md:text-base"
        >
            My Account
        </a>
    </div>
</aside>
