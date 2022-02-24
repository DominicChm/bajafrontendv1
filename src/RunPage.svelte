<script>

    import {
        Button,
        Content,
        DataTable,
        DataTableSkeleton,
        OverflowMenu,
        OverflowMenuItem
    } from "carbon-components-svelte";
    import {activeRun, connected, runs} from "./stores";
    import IbmCloudVpcEndpoints32 from "carbon-icons-svelte/lib/IbmCloudVpcEndpoints32";
    import {activateRun} from "./api";

    const headers = [
        {key: "type", value: "Type"},
        {key: "size", value: "Size"},
        {key: "overflow", empty: true}
    ];

    let selectedRowIds = [$activeRun];

    function arunwrapper(event) {
        console.log(event)
        activateRun(event.detail.id);
    }
</script>

<p>{$activeRun}</p>
{#if ($connected)}
    <DataTable
            title="Runs"
            description="All available runs"
            headers={headers}
            rows={$runs}
            radio
            bind:selectedRowIds={selectedRowIds}
            on:click:row={arunwrapper}>
        <svelte:fragment slot="cell" let:cell>
            {#if cell.key === "overflow"}
                <div style="width: 100%; display: flex; flex-direction: row-reverse; gap:.5rem; align-items: center">

                    <OverflowMenu flipped>
                        <OverflowMenuItem text="Restart"/>
                        <OverflowMenuItem
                                href="https://cloud.ibm.com/docs/loadbalancer-service"
                                text="API documentation"
                        />
                        <OverflowMenuItem danger text="Stop"/>
                    </OverflowMenu>
                </div>
            {:else}{cell.value}{/if}
        </svelte:fragment>
    </DataTable>
{:else}
    <DataTableSkeleton/>
{/if}
