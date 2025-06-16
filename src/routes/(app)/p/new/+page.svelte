<script>
    let { data, params } = $props();
</script>

<div class="flex flex-col h-full w-full overflow-hidden bg-base-100 gap-3">
    <div class="flex flex-1 w-full bg-white rounded-lg shadow-md p-6">
        <fieldset class="fieldset">
            <legend class="fieldset-legend">Pick a file</legend>
            <input type="file" class="file-input" />
            <label class="label">Max size 2MB</label>
        </fieldset>
    </div>
</div>

<svelte:head>
    <title>Presentation View</title>
</svelte:head>
