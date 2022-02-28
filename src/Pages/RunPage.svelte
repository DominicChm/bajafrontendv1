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
    import {activateRun, deactivateRun, deleteRun} from "../api";
    import Float from "../Components/Float.svelte";
    import TrashCan24 from "carbon-icons-svelte/lib/TrashCan24";

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
        <svelte:fragment slot="cell" let:cell let:row>
            {#if cell.key === "overflow"}
                <Float>
                    {#if (row.type !== "realtime")}
                        <Button kind="danger-ghost" icon={TrashCan24} on:click={() => deleteRun(row.id)} iconDescription="Delete Run"/>
                    {/if}
                    <!--                    <OverflowMenu flipped>-->
                    <!--                        <OverflowMenuItem danger text="Delete" on:click={() => deleteRun(row.id)}/>-->
                    <!--                    </OverflowMenu>-->
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
