<script>
    import {onMount} from "svelte";
    import {calculateTicks} from "../ticks";

    export let offsetPercent = 0;
    export let widthPercent = 100;
    export let viewStart = 0;
    export let viewEnd = 1;
    export let ticks = [];

    $: range = viewEnd - viewStart;

    onMount(() => console.log("MOUNT"));

    //$: console.log(ticks);

</script>
<style>
    .root {
        height: 100%;
        background: greenyellow;
        display: inline-block;
        margin: 0;
    }

    .content {
        width: 100%;
        height: 100%;
        background: steelblue;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

</style>
<div class="root" style="width: {widthPercent}%;">
    <div class="content">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;" preserveAspectRatio="none">

            {#each ticks as tick, index(tick)}
                <line y1="0" y2="100" stroke-width="1" stroke="black" x1={(tick - viewStart) * 100 / range} x2={(tick - viewStart) * 100 / range}/>
                <text x={(tick - viewStart) * 100 / range} y="100" style="font: 13px sans-serif;">lel</text>
            {/each}
        </svg>
    </div>
</div>
