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

    function initRun(uuid) {
        sio.emit("run_init", uuid);
    }

    function stopRun(uuid) {
        sio.emit("run_stop", uuid);
    }

    function deleteRun(uuid) {
        sio.emit("run_delete", uuid);
    }

</script>

<style>
    :global(body) {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
    }

    table, th, td {
        border: 1px solid;
        border-collapse: collapse;
    }

    table {
        border: 1px solid #1C6EA4;
        background-color: #EEEEEE;
        width: 100%;
        text-align: left;
        border-collapse: collapse;
    }

    table td, table th {
        border: 1px solid #AAAAAA;
        padding: 3px 2px;
    }

    table tbody td {
        font-size: 13px;
    }

    table tr:nth-child(even) {
        background: #D0E4F5;
    }

    table thead {
        background: #1C6EA4;
        background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
        border-bottom: 2px solid #444444;
    }

    table thead th {
        font-size: 15px;
        font-weight: bold;
        color: #FFFFFF;
        border-left: 2px solid #D0E4F5;
    }

    table thead th:first-child {
        border-left: none;
    }
</style>

<div class="App">
    <p>Error: {serverErr}</p>
    <TitledContainer title="Capabilities">
        <p>{JSON.stringify(capabilities, null, 3)}</p>
    </TitledContainer>
    <TitledContainer title="Runs">
        <table>
            <thead>
            <tr>
                <th>UUID</th>
                <th>Type</th>
                <th>Locked</th>
                <th>Size</th>
                <th>Actions</th>
            </tr>
            </thead>
            {#each runs as run}
                <tr>
                    <td>{run.uuid}</td>
                    <td>{run.type}</td>
                    {#if (run.type === "realtime")}
                        <td></td>
                        <td></td>
                        <td>
                            <button on:click={() => initRun(run.uuid)}>Init Storage</button>
                        </td>
                    {:else if (run.type === "stored")}
                        <td>{run.locked}</td>
                        <td>{run.size}</td>
                        <td>
                            <button on:click={() => deleteRun(run.uuid)}>Delete</button>
                            {#if (run.locked)}
                                <button on:click={() => stopRun(run.uuid)}>Stop</button>
                            {/if}
                        </td>
                    {/if}
                </tr>
            {/each}
        </table>
    </TitledContainer>
    <Toast/>
</div>
