<script>
    import {Button} from "carbon-components-svelte";
    import {activeRunId, isRealtime, recordingRun, runs} from "../stores";
    import {startStorage, stopRunStorage} from "../api";
    import Recording32 from "carbon-icons-svelte/lib/Recording32";

    export let notRecordingKind = "primary"
    export let RecordingKind = "secondary"
</script>

{#if (!$recordingRun && $isRealtime)}
    <Button icon={Recording32} iconDescription="Record" kind={notRecordingKind}
            on:click={() => startStorage($activeRunId)}/>
{:else if ($isRealtime)}
    <Button icon={Recording32} iconDescription="Record" kind={RecordingKind}
            on:click={() => stopRunStorage($recordingRun.id)}/>
{/if}
