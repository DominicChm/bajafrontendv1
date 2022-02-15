<script lang="ts">
    import {onDestroy} from 'svelte';
    import io from "socket.io-client"
    import TitledContainer from "./TitledContainer.svelte";
    import {notifications} from './notifications/notifications.js'
    import Toast from "./notifications/Toast.svelte";
    import Editor from "./Editor.svelte";
    import DataView from "./DataView.svelte";
    import PlayControls from "./PlayControls.svelte";
    import RunControl from "./RunControl.svelte";

    let count: number = 0

    const sio = io("http://localhost:3000");
    onDestroy(() => sio.disconnect());

    let capabilities = {};
    sio.on("capabilities", c => capabilities = c);

    let schema = {};
    sio.on("schema", s => schema = s);

    let playState = {};
    sio.on("play_state", s => playState = s);


    sio.on("general_error", (e) => notifications.danger(e, 2000));

    let data = {}
    let frameIndColor = "#000";
    sio.on("data", (d) => {
        data = d;
        //console.log(data);
        frameIndColor = "#080"
        setTimeout(() => { //Heartbeat for data
            frameIndColor = "#000"
        }, 50);
    });


    function createModule() {
        sio.emit("create_module", "brake_pressure", "AA:BB:CC:DD:EE:FF");
    }

    function handlePlay() {
        data = {};
        sio.emit("play_start");
    }

    function handleStopPlay() {
        sio.emit("play_stop");
    }
</script>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    .vert-div {
        width: 1px;
        margin: 3px 0;
        display: inline-block;
        background: black;
        height: 100%;
    }
</style>

<div class="App">
    <TitledContainer title="Capabilities">
        <p>{JSON.stringify(capabilities, null, 3)}</p>
    </TitledContainer>
    <TitledContainer title="playControls">
        <PlayControls sio={sio}/>
    </TitledContainer>
    <TitledContainer title="Runs">
        <RunControl sio={sio}/>
    </TitledContainer>
    <TitledContainer title="Data">
        <div style="background: {frameIndColor}; width: 10px; height: 10px; border: 1px solid black; margin: 8px"></div>
        <DataView schema={schema} data={data}/>
        {#if (playState?.playing)}
            <button on:click={handleStopPlay}>Stop Playing</button>
        {:else }
            <button on:click={handlePlay}>Play</button>
        {/if}
    </TitledContainer>
    <button on:click={createModule}>Add Module</button>
    <Editor sio={sio}/>
    <TitledContainer title="Schema">
        <pre>{JSON.stringify(schema, null, 2)}</pre>
        <button on:click={createModule}>Add Module</button>
    </TitledContainer>
    <meter value="50" max="100" min="0" low="25" high="75" optimum="50"></meter>
    <progress value="50" max="100"></progress>
    <Toast/>
</div>
