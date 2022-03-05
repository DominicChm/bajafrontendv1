<script lang="ts">
    import {
        Button,
        DataTable,
        DataTableSkeleton,
        Toolbar,
        ToolbarBatchActions,
        ToolbarContent,
        ToolbarMenu,
        ToolbarMenuItem,
        ToolbarSearch
    } from "carbon-components-svelte";
    import {DAQSchema, isRealtime} from "../../stores";
    import {createModule, deleteRun} from "../../api";
    import Edit24 from "carbon-icons-svelte/lib/Edit24";

    import Float from "../../Components/Float.svelte";
    import ModuleDefinitionEditor from "./ModuleDefinitionEditor.svelte";

    let editModalOpen = false;
    let editId: string | undefined;
    let editsMade = false;
    let selectedRowIds = [];

    const headers = [
        {key: "name", value: "Name"},
        {key: "type", value: "Type"},
        {key: "mac", value: "MAC Address"},
        {key: "overflow", empty: true},
        // {key: "version", value: "Version"},
    ];

    function openEditModal(moduleId: string) {
        editId = moduleId;
        editModalOpen = true;
        editsMade = false;
    }

    function deleteSelected() {
        for (const id of selectedRowIds)
            deleteRun(id);

        selectedRowIds = [];
    }

</script>
<!--<InlineNotification-->
<!--        lowContrast-->
<!--        kind="warning"-->
<!--        title="Schema Updated"-->
<!--        subtitle="While you were editing, the schema was updated by someone else."-->
<!--        style="width: 100%"/>-->

{#if ($DAQSchema)}

    <h1>{$DAQSchema.name}
        <!--TODO: ADD ABILITY TO EDIT DAQ SCHEMA NAME/FRAMERATE/ ETC-->
        <!--        <Button icon={Edit16} iconDescription="Edit Name" size="small" kind="ghost"/>-->
    </h1>

    <DataTable
            expandable
            headers={headers}
            rows={$DAQSchema.modules}
            title="Modules"
            description="Modules present in this schema"
            selectable={$isRealtime}
            bind:selectedRowIds
    >
        <svelte:fragment slot="expanded-row" let:row>
            {row.description || "No description"}
        </svelte:fragment>

        <svelte:fragment slot="cell" let:cell let:row>
            {#if cell.key === "overflow"}
                <Float>
                    <Button icon={Edit24} iconDescription="Edit Module" tooltipPosition="left" tooltipAlignment="start"
                            kind="ghost" on:click={() => openEditModal(row.id)}/>
                </Float>
            {:else}{cell.value}{/if}
        </svelte:fragment>

        <Toolbar>
            <ToolbarBatchActions>
                <Button kind="danger" on:click={deleteSelected}>Delete</Button>
            </ToolbarBatchActions>

            <ToolbarContent>
                <ToolbarSearch/>
                <ToolbarMenu>
                    <ToolbarMenuItem primaryFocus>Reload (TODO)</ToolbarMenuItem>
                </ToolbarMenu>
                <Button on:click={() => createModule("blank_module")}>Create module</Button>
            </ToolbarContent>
        </Toolbar>
    </DataTable>
{:else }
    <DataTableSkeleton/>
{/if}

<ModuleDefinitionEditor bind:open={editModalOpen} bind:id={editId}/>
