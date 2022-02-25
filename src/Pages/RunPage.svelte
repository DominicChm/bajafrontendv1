<script>

    import {
        Button,
        DataTable,
        DataTableSkeleton,
        OverflowMenu,
        OverflowMenuItem,
        Toolbar,
        ToolbarContent
    } from "carbon-components-svelte";
    import {activeRunId, connected, runs} from "../stores";
    import {activateRun, deactivateRun} from "../api";
    import Float from "../Components/Float.svelte";

    const headers = [
        {key: "type", value: "Type"},
        {key: "size", value: "Size"},
        {key: "overflow", empty: true}
    ];

    $: selectedRowIds = [$activeRunId];
    $: activateRun(selectedRowIds[0]);

</script>

{#if ($connected)}
    <DataTable
            title="Runs"
            description="All available runs"
            headers={headers}
            rows={$runs}
            radio
            bind:selectedRowIds={selectedRowIds}
            on:click:row={(e) => activateRun(e.detail.id)}>
        <svelte:fragment slot="cell" let:cell>
            {#if cell.key === "overflow"}
                <Float>
                    <OverflowMenu flipped>
                        <OverflowMenuItem text="Restart"/>
                        <OverflowMenuItem
                                href="https://cloud.ibm.com/docs/loadbalancer-service"
                                text="API documentation"
                        />
                        <OverflowMenuItem danger text="Stop"/>
                    </OverflowMenu>
                </Float>
            {:else}
                {cell.value}
            {/if}
        </svelte:fragment>
        <Toolbar>
            <ToolbarContent>
                <Button on:click={deactivateRun} kind="secondary">Deactivate</Button>
            </ToolbarContent>
        </Toolbar>
    </DataTable>
{:else}
    <DataTableSkeleton showToolbar={false}/>
{/if}
