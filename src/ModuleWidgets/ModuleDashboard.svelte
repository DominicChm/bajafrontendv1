<script>
    import brake_pressure from "./BrakePressure/Dashboard.svelte"
    import {createEventDispatcher} from "svelte";
    import {dataStore} from "../stores";
    const dispatch = createEventDispatcher();

    export let typename;
    export let id;

    const typeMap = {
        brake_pressure
    }
</script>

{#if (typeMap[typename])}
    <svelte:component this={typeMap[typename]} data={$dataStore} bind:id={id}/>
{:else}
    <p>Unknown typename {typename}</p>
{/if}
