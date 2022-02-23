<script lang="ts">
    import {Socket} from "socket.io-client";
    import {connected, runs} from "./stores";

    export let io: Socket;
    let loadString = "";

    setInterval(() => {
        loadString += "."
        if (loadString.length > 3) loadString = "";
    }, 300)




</script>
<style>
    header {
        height: 4rem;
        position: sticky;
        top: 0;
        box-sizing: border-box;
        box-shadow: 0 0 1rem black;

        background-color: #154734;
        border: 3px outset #1b7251;

    }

    .header-connected {
        background-color: #154734;
        display: grid;
        grid-template-columns: auto auto auto;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .header-disconnected {
        background-color: #154734;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        grid-template-rows: 100%;

        align-items: center;
    }

    h2 {
        margin: 0;
    }


</style>
{#if ($connected)}
    <header class="header-connected">
        <div>Play controls</div>
        <div>Test</div>

        <div>Runs {$runs.length}</div>

    </header>
{:else}
    <header class="header-disconnected">
        <div></div>
        <h2 class="loadingIndicator">Connecting</h2>
        <h2>{loadString}</h2>
    </header>
{/if}
