<script lang="ts">
    import {onMount} from 'svelte'
    import io from "socket.io-client"
    import TitledContainer from "./TitledContainer.svelte";
    import {notifications} from './notifications/notifications.js'
    import Toast from "./notifications/Toast.svelte";

    let count: number = 0
    const sio = io("http://localhost:3000");

    let runs = [];
    sio.on("runs_list", (_runs) => {
        console.log(_runs);
        runs = _runs
    });

    let capabilities = [];
    sio.on("capabilities", (caps) => capabilities = caps);

    let serverErr = "";
    sio.on("general_error", (e) => notifications.danger(e, 2000));


</script>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>

<div class="App">
    <p>Error: {serverErr}</p>
    <TitledContainer title="Capabilities">
        <p>{JSON.stringify(capabilities, null, 3)}</p>
    </TitledContainer>
    <TitledContainer title="Runs">
        {#each runs as run}
            <p>{JSON.stringify(run)}</p>
        {/each}
        <button on:click={() => sio.emit("run_init")}>Init Run</button>
    </TitledContainer>
    <Toast/>
</div>