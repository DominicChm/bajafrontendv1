<script>

    import {
        Button,
        DataTable,
        DataTableSkeleton, Form, FormGroup, Modal,
        OverflowMenu,
        OverflowMenuItem, TextArea, TextInput,
        Toolbar,
        ToolbarContent
    } from "carbon-components-svelte";
    import {activeRun, activeRunId, connected, isRealtime, recordingRun, runs} from "../stores";
    import {activateRun, deactivateRun, deleteRun, setRunMetadata} from "../api";
    import Float from "../Components/Float.svelte";
    import TrashCan24 from "carbon-icons-svelte/lib/TrashCan24";
    import {cloneDeep} from "lodash";
    import RecordButton from "../Components/RecordButton.svelte";
    import {push} from "svelte-spa-router";

    let editOpen = false;
    let editId = "";
    let editCache;
    let wereChangesMade = false;
    let closeOnEnter = true;

    function changesMade() {
        wereChangesMade = true;
    }

    const headers = [
        {key: "meta.name", value: "Name"},
        {key: "type", value: "Type"},
        {key: "size", value: "Size"},
        {key: "overflow", empty: true}
    ];

    $: selectedRowIds = [$activeRunId];
    $: activateRun(selectedRowIds[0]);

    function editRun(id) {
        editOpen = true;
        editId = id;
        editCache = cloneDeep($runs?.find(r => r.id === id));
        closeOnEnter = true;
    }

    function applyEdits() {
        setRunMetadata(editId, editCache.meta);
        editOpen = false;
    }

</script>

{#if ($connected)}
    <DataTable
            title="Runs"
            description="All available runs"
            headers={headers}
            rows={$runs}
            radio
            expandable
            bind:selectedRowIds={selectedRowIds}
            on:click:row={(e) => activateRun(e.detail.id)}>
        <svelte:fragment slot="expanded-row" let:row>
            <span style="white-space: pre ; display: block; unicode-bidi: embed">
                {row.meta.description || "No description"}
            </span>
        </svelte:fragment>

        <svelte:fragment slot="cell" let:cell let:row>
            {#if cell.key === "overflow"}
                <Float>
                    {#if (row.type !== "realtime")}
                        <OverflowMenu flipped>
                            <OverflowMenuItem text="Edit" on:click={() => editRun(row.id)}/>
                            <OverflowMenuItem danger text="Delete" on:click={() => deleteRun(row.id)}/>
                        </OverflowMenu>
                    {:else if (row.type === "realtime")}
                        <RecordButton id={row.id}/>
                    {/if}
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


<Modal
        bind:open={editOpen}
        primaryButtonText="Apply"
        secondaryButtonText="Cancel"
        primaryButtonDisabled={!wereChangesMade}
        modalHeading="Edit Run"
        on:submit={applyEdits}
        bind:shouldSubmitOnEnter={closeOnEnter}
        on:click:button--secondary={() => editOpen = false}>
    {#if editCache}
        <Form>
            <FormGroup>
                <TextInput
                        labelText="Name"
                        bind:value={editCache.meta.name}
                        on:input={changesMade}/>
                <TextArea
                        labelText="Description"
                        bind:value={editCache.meta.description}
                        on:input={changesMade}
                        on:focus={() => closeOnEnter = false}
                        on:blur={() => closeOnEnter = true}
                />
            </FormGroup>
        </Form>
    {/if}
</Modal>
