<script>

    import TimelinePanel from "./TimelinePanel.svelte";
    import {onMount} from "svelte";
    import {calculateTicks} from "../ticks";

    let dragging = false;
    let center = 0;
    let containerRef;

    let panels = Array.from(new Array(5).keys()); //Create a sequence length 1-N for initial each to not fail.
    const panelWidth = 1 / (panels.length - 1) * 100;

    //View of entire block of panels.
    let blockEnd = 1;
    let blockStart = 0;
    let tickSpacing;

    //View of a single panel
    let panelView;
    let ticks = [];

    $: {

    }

    function handleMousemove(event) {
        if (dragging) center += event.movementX * 100 / (containerRef.clientWidth ?? 1); //TODO: Convert to percent coords.

        if (center > 0) {
            center -= panelWidth;
            blockEnd -= panelView;
            blockStart -= panelView;

            panels.pop();
            panels = [blockStart, ...panels];

            calcTicks();
        }

        if (center < -panelWidth) {
            panels.shift();
            panels = [...panels, blockEnd];

            center += panelWidth;
            blockEnd += panelView;
            blockStart += panelView;

            calcTicks();
        }
    }

    onMount(() => {
        initView();
    })

    function calcTicks() {
        ticks = []
        const [interval, niceMin, niceMax] = calculateTicks(20, blockStart, blockEnd, tickSpacing);
        for (let i = niceMin; i < niceMax; i += interval) ticks.push(i);
    }

    function initView() {
        panelView = (blockEnd - blockStart) / panels.length;
        panels = panels.map((_, i) => blockStart + panelView * i);

        console.log(panels);
        calcTicks();

    }

    function renderPositions() {
        //if()
    }
</script>

<style>
    .root {
        width: 100%;
        height: 100%;
        background: red;
        user-select: none;
        overflow: hidden;
    }

    .scroller {
        height: 100%;
        /*background: gray;*/
        overflow: visible;
        white-space: nowrap;
    }
</style>
<p>{panelView}, {blockStart}, {blockEnd}</p>
<div class="root"
     bind:this={containerRef}
     on:mousemove={handleMousemove}
     on:mousedown={() => dragging = true}
     on:mouseup={() => dragging = false}>
    <div class="scroller" style="transform:translate({center}%); width: 100%">
        {#each panels as start, index(start)}
            <TimelinePanel viewStart={start}
                           viewEnd={start + panelView}
                           widthPercent={panelWidth}
                           ticks={ticks}/>
        {/each}
    </div>
</div>

