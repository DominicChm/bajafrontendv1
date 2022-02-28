<script>

    import {createEventDispatcher, onMount} from "svelte";
    import {calculateTicks} from "../ticks";

    const dispatch = createEventDispatcher();

    let containerRef;
    let dragging = false;

    export let center = 0;
    export let domain = 10;

    export let dataStart = undefined;
    export let dataEnd = undefined;

    export let dragDisabled = false;

    //View of entire block of panels.
    $: viewStart = center - domain / 2;
    $: viewEnd = center + domain / 2;

    //View of a single panel
    let ticks;
    $: ticks = calcTicks(viewStart, viewEnd);

    let scrollable = true;
    let clientWidth = 100;
    $: x = genMapper(viewStart, clientWidth, domain);

    $: if (dragging) dispatch("dragstart");
    $: if (!dragging) dispatch("dragend");

    function handleResize() {
        clientWidth = containerRef.clientWidth ?? 100;
    }

    function handleMousemove(event) {
        if (dragging) {
            center -= event.movementX * domain / (clientWidth);
            if (dataStart != null) center = Math.max(center, dataStart);
            if (dataEnd != null) center = Math.min(center, dataEnd);

        }

        calcTicks();
    }

    function calcTicks() {
        let t = []
        const [interval, niceMin, niceMax] = calculateTicks(10, viewStart, viewEnd);
        for (let i = niceMin; i < niceMax; i += interval) t.push(i);
        return t;
    }


    function genMapper(viewStart, clientWidth, domain) {
        return (dataX) => (dataX - viewStart) * clientWidth / (domain || 1);
    }

    onMount(handleResize);

    const wheel = (node, options) => {
        let {scrollable} = options;

        const handler = e => {
            if (!scrollable) {
                e.preventDefault();

                const dy = Math.sign(e.wheelDeltaY);
                if (dy > 0)
                    domain /= Math.abs(dy) * 2
                else if (dy < 0 && domain < 1000000)
                    domain *= Math.abs(dy) * 2

                calcTicks();
            }
        };

        node.addEventListener('wheel', handler, {passive: false});

        return {
            update(options) {scrollable = options.scrollable;},
            destroy() {node.removeEventListener('wheel', handler, {passive: false});}
        };
    };


</script>

<style>
    .root {
        width: 100%;
        height: 100%;
        background-color: var(--cds-layer);
        user-select: none;
        padding: .5rem
    }

    svg {
        width: 100%;
        height: 100%;
    }
</style>
<!--<p>{viewStart}, {viewEnd}, {dragging}</p>-->

<svelte:window use:wheel={{scrollable}} on:resize={handleResize} on:mouseup={() => dragging = false}
               on:mousemove={handleMousemove}
/>
<div class="root"
     style="width: 100%; height: 100%">
    <svg width="100%" height="100%"
         bind:this={containerRef}
         on:mousedown={() => {if(!dragDisabled) dragging = true}}
         on:mouseup={() => dragging = false}
         on:mouseenter={() => scrollable = false}
         on:mouseleave={() => scrollable = true}>


        {#each ticks as t}
            <line x1={x(t)} x2={x(t)} y1="0" y2="100%" stroke-width="1" stroke="black"></line>
            <text x={x(t)} y="100%">{t.toFixed(2)}</text>
        {/each}

        {#if (dataStart != null && dataStart > viewStart)}
            <rect x={x(viewStart)} width={x(dataStart) - x(viewStart)} y="0" height="100%" fill="gray"
                  fill-opacity=".5"/>
        {/if}

        {#if (dataEnd != null && dataEnd < viewEnd)}
            <rect x={x(dataEnd)} width={x(viewEnd) - x(dataEnd)} y="0" height="100%" fill="gray"
                  fill-opacity=".5"/>
        {/if}

        {#if (dragDisabled)}
            <rect x="0" width="100%" y="0" height="100%" fill="gray"
                  fill-opacity=".5"/>
        {/if}

        <line x1={x(center)} x2={x(center)} y1="0" y2="100%" stroke-width="5" stroke="black"></line>

        <text x={x(center) + 10} y="13px">{center?.toFixed(2)}</text>
        <text x={x(center) - 10} y="13px" text-anchor="end">{domain?.toFixed(2)}</text>

        <text x={x(viewStart)} y="13px">{viewStart?.toFixed(2)}</text>
        <text x={x(viewEnd)} y="13px" text-anchor="end">{center?.toFixed(2)}</text>
    </svg>

</div>
