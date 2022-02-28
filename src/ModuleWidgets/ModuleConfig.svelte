<script>
    import brake_pressure from "./BrakePressure/Config.svelte"

    export let typename;
    export let config;

    const typeMap = {
        brake_pressure
    }
</script>

{#if (typeMap[typename])}
    <svelte:component this={typeMap[typename]} bind:config={config} on:input/>
{:else}
    <p>Unknown typename {typename}</p>
{/if}
