<script>
    import RadialGauge from "../../Components/RadialGauge.svelte";

    export let data = {};
    export let id = null;

</script>
<style>
    main {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    div {
        flex: 1;
        flex-basis: 0;
        overflow: hidden;
    }
</style>
<main>
    Brake Pressure!
    <div>
        <pre>{JSON.stringify(data)}</pre>
        <pre>{id}</pre>
        <RadialGauge value={data[id]?.psi ?? -1} minValue="0" maxValue="1024"/>
    </div>
</main>
