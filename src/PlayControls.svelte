<script>
    export let sio;

    let playState = {};
    sio.on("client_state", s => playState = s.playState);

    function handlePlay() {
        sio.emit("play_start");
    }
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
                <button on:click={handlePlay}>Play/Stop</button>
            </td>
            <td>
                Current: {(playState.position ?? 0).toString().padStart(7, '0')}
                <input type="number">
                <button>Seek</button>
            </td>
        </tr>

    </table>

    <!--    <pre>{JSON.stringify(state.playState, null, 2)}</pre>-->
</div>

