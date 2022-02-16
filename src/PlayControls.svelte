<script>
    export let sio;

    let seekTime = 0;
    let frameRate = 0;

    let playState = {};
    sio.on("play_state", p => playState = p);

</script>

<style>
    table {
        border-collapse: collapse;
    }

    td {
        padding: .25rem;
        border: 1px solid black;
    }
</style>

<div>
    <table>
        <tr>
            <td>
                {#if (playState?.playing)}
                    <button on:click={() => sio.emit("play_stop")}>Stop</button>
                {:else}
                    <button on:click={() => sio.emit("play_start")}>Play</button>
                {/if}
            </td>
            <td>
                Current: {(playState?.time ?? 0).toString().padStart(7, '0')}
                <input bind:value={seekTime} type="number">
                <button on:click={() => sio.emit("play_seek", seekTime)}>Seek</button>
            </td>
            <td>
                Framerate: {(playState?.framerate ?? 0).toString()}
                <input bind:value={frameRate} type="number">
                <button on:click={() => sio.emit("play_framerate", frameRate)}>Set</button>
            </td>
        </tr>

    </table>

    <!--    <pre>{JSON.stringify(state.playState, null, 2)}</pre>-->
</div>

