<script>
    import BrakePressure from "./BrakePressure.svelte";
    import DefaultDataView from "./DefaultDataView.svelte";

    export let schema = [];
    export let data = {};

    const typeMap = {
        "brake_pressure": BrakePressure
    }

    let components = [];
    $: {
        components = schema?.modules?.map(s => ({
            component: typeMap[s.type] ?? DefaultDataView,
            uuid: s.uuid,
        })) ?? [];
    }

</script>

<div>

    {#each components as comp}
        <svelte:component this={comp.component} data={data} uuid={comp.uuid}/>
    {/each}
</div>
