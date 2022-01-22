<script lang="ts">
    import {onMount} from 'svelte'
    import io from "socket.io-client"
    import TitledContainer from "./TitledContainer.svelte";
    import {notifications} from './notifications/notifications.js'
    import Toast from "./notifications/Toast.svelte";
    let count: number = 0
    let state = {
        runs: []
    };
    const sio = io("http://localhost:3000");

    sio.on("client_state", (s) => {
        state = s;
        console.log(s);
    });

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

    function activateRun(uuid) {
        sio.emit("activate_run", uuid)
    }

    function deactivateRun() {
        sio.emit("deactivate_run");
    }

    function createModule() {
        sio.emit("create_module", "brake_pressure", "test");
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

    .activated-run {
        background: #7ce089 !important;
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
    <TitledContainer title="Capabilities">
        <p>{JSON.stringify(state.capabilities, null, 3)}</p>
    </TitledContainer>
    <TitledContainer title="Runs">
        <p>Active: {state.activeRun} <button on:click={() => deactivateRun()}>Deactivate</button></p>
        <table>
            <thead>
            <tr>
                <th>UUID</th>
                <th>Type</th>
                <th>Locked</th>
                <th>Size</th>
                <th>Actions</th>
                <th>Activate</th>
            </tr>
            </thead>
            {#each state.runs as run}
                <tr class:activated-run={state.activeRun === run.uuid}>
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
                    <td>
                        <button on:click={() => activateRun(run.uuid)}>Activate</button>
                    </td>
                </tr>
            {/each}
        </table>
    </TitledContainer>
    <TitledContainer title="Schema">
        <pre class="json-render">{JSON.stringify(state.schema, null, 2)}</pre>
        <button on:click={createModule}>Add Module</button>
    </TitledContainer>
    <meter value="50" max="100" min="0" low="25" high="75" optimum="50"></meter>
    <progress value="50" max="100"></progress>
    <Toast/>
</div>
