<script>
    import BrakePressure from "./BrakePressure.svelte";
    import DefaultDataView from "./DefaultDataView.svelte";
    import {DAQSchema} from "./stores";

    const typeMap = {
        "brake_pressure": BrakePressure
    }

    let components = [];
    $: {
        components = $DAQSchema?.modules?.map(s => ({
            component: typeMap[s.type] ?? DefaultDataView,
            uuid: s.uuid,
        })) ?? [];
    }

</script>

<div>
    {#each components as comp}
        <svelte:component this={comp.component} data={{}} uuid={comp.uuid}/>
    {/each}
</div>
