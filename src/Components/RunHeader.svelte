<script>
    import {Button, Tile} from "carbon-components-svelte";
    import Recording32 from "carbon-icons-svelte/lib/Recording32";
    import {activeRun, activeRunId, isRealtime, recordingRun} from "../stores";
    import {startStorage, stopRunStorage} from "../api";

</script>

<style>
    h3 {
        padding-left: 1rem;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>

<Tile style="padding: 0; display: flex; align-items: center; justify-content: space-between; min-height: 3rem; fill: red">
    <div class="actions">
        {#if (!$recordingRun && $isRealtime)}
            <Button icon={Recording32} iconDescription="Record" kind="primary" on:click={() => startStorage($activeRunId)}/>
        {:else if ($isRealtime)}
            <Button icon={Recording32} iconDescription="Record" kind="secondary"
                    on:click={() => stopRunStorage($recordingRun.id)}/>
        {/if}
        <h3>{$activeRun.type}</h3>
    </div>
    <div class="actions">
        <slot name="actions" >
            <span class="missing">No actions (TODO: DELETE THIS)</span>
        </slot>
    </div>

</Tile>
