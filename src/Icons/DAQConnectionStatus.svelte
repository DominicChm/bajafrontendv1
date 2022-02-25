<script>
    import ConnectionSignal32 from "carbon-icons-svelte/lib/ConnectionSignal32";
    import ConnectionSignalOff32 from "carbon-icons-svelte/lib/ConnectionSignalOff32";

    import {connected} from "../stores";

    let fill = "red"

    setInterval(() => {
        fill = fill === "red" ? "darkRed" : "red";
    }, 300);
</script>

{#if ($connected)}
    <ConnectionSignal32 style="fill: lawngreen; height: 100%; margin: 0 5px "/>
{:else}
    <ConnectionSignalOff32  style="fill: {fill}; height: 100%; margin: 0 5px"/>
{/if}
