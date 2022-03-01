<script lang="ts">
    import DrivenTimeline from "../Components/DrivenTimeline.svelte";
    import {activeRun} from "../stores";
</script>
<style>
    .root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>

{#if (!$activeRun)}
    NO ACTIVE RUN!!!
{:else}
    <div class="root">
        <div style="flex: 1">
            test
        </div>
        <div style="width: 100%; height: 6rem;">
            <DrivenTimeline/>
        </div>
    </div>


{/if}
