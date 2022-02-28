<script>
    import {onDestroy, onMount} from "svelte";
    import CG from "canvas-gauges"

    export let value = 3;
    export let minValue = 0;
    export let maxValue = 10;
    export let units = null;
    export let title = null;

    export let ticksAngle = 270;


    let canvas;
    let gauge;

    let width = 0;
    let height = 0;

    $: gauge?.update({width});
    $: gauge?.update({height});
    $: gauge?.update({value});
    $: gauge?.update({
        minValue,
        maxValue,
        units,
        title,
        ticksAngle,
    });

    let container;

    console.log(CG)
    onMount(() => {
        gauge = new CG.RadialGauge({
            renderTo: canvas,
            minValue,
            maxValue,
            units,
            title,
            ticksAngle
        }).draw()
    })



    onDestroy(() => {

    })
</script>

<style>
    canvas {
        background: red;
    }

    div {
        width: 100%;
        height: 100%;
    }
</style>
<div
        bind:this={container}
        bind:clientWidth={width}
        bind:clientHeight={height}
        {...$$restProps}>
    <canvas
            bind:this={canvas}
    ></canvas>
</div>

