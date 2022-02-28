<script>
    import Timeline from "./Timeline.svelte";
    import {pause, play, resetPlayback, seekTo, stop} from "../api";
    import {activeRun, connected, currentTime, isStored, playing, playState} from "../stores";
    import {Button} from "carbon-components-svelte";
    import Play32 from "carbon-icons-svelte/lib/Play32";
    import Pause32 from "carbon-icons-svelte/lib/Pause32";
    import Stop32 from "carbon-icons-svelte/lib/Stop32";

    export let showControls = true;

    let dragging = false;
    let playingPreDrag = false;
    let center = 0;

    $: if (dragging) {
        seekTo(center * 1000);
        if(playingPreDrag) play();
    }

    $: if (!dragging) {
        center = ($currentTime ?? 0) / 1000;
    }

    function onDragStart() {
        playingPreDrag = $playing;
        dragging = true
    }
</script>
<style>
    .root {
        width: 100%;
        height: 100%;
        display: flex;
    }
</style>

<!--<p>{dragging} {center}</p>-->
<div class="root">
    {#if ($playing == null || !$connected)}
        <Button skeleton/>
    {:else if (!$playing && showControls)}
        <Button icon={Play32} kind="primary" on:click={play}/>
    {:else if (showControls)}
        <Button icon={Pause32} kind="primary" on:click={pause}/>
    {/if}
    <Timeline on:dragstart={onDragStart}
              on:dragend={() => dragging = false}
              bind:center={center}
              dragDisabled={$activeRun?.type === "realtime"}
              dataStart="0"/>
    {#if ($isStored)}
        <Button icon={Stop32} kind="secondary" on:click={resetPlayback}/>
    {/if}
</div>

