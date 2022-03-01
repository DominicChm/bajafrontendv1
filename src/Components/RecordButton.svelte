<script>
    import {Button} from "carbon-components-svelte";
    import {activeRunId, recordingRun, runs} from "../stores";
    import {startStorage, stopRunStorage} from "../api";
    import Recording32 from "carbon-icons-svelte/lib/Recording32";

    export let id = "";
    export let notRecordingKind = "primary"
    export let RecordingKind = "secondary"
</script>

{#if ($runs.find(r => r.id === id)?.type !== "realtime")}
    <p>ID: {id} - NO ID OR NOT REALTIME</p>
{:else if (!$recordingRun)}
    <Button icon={Recording32} iconDescription="Record" kind={notRecordingKind}
            on:click={() => startStorage($activeRunId)}/>
{:else}
    <Button icon={Recording32} iconDescription="Record" kind={RecordingKind}
            on:click={() => stopRunStorage($recordingRun.id)}/>
{/if}
