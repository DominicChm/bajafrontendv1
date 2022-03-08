<script lang="ts">
    import {
        Button,
        DataTable,
        DataTableSkeleton, Form, FormGroup, NumberInput,
        Toolbar,
        ToolbarBatchActions,
        ToolbarContent,
        ToolbarMenu,
        ToolbarMenuItem,
        ToolbarSearch
    } from "carbon-components-svelte";
    import {DAQSchema, isRealtime} from "../../stores";
    import {createModule, deleteModule, deleteRun, pushSchema} from "../../api";
    import Edit24 from "carbon-icons-svelte/lib/Edit24";

    import Float from "../../Components/Float.svelte";
    import ModuleDefinitionEditor from "./ModuleDefinitionEditor.svelte";
    import {cloneDeep} from "lodash";

    let editModalOpen = false;
    let editId: string | undefined;
    let editsMade = false;
    let selectedRowIds = [];
    let frameIntervalValue = 0;
    let frameIntervalEdited = false;

    $: console.log(frameIntervalValue);
    $: if (!frameIntervalEdited) frameIntervalValue = (1000 / ($DAQSchema?.frameInterval ?? 1)) | 0

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
        deleteModule(selectedRowIds);

        selectedRowIds = [];
    }

    function onFrameIntervalInput(e) {
        frameIntervalEdited = true;
    }

    function applyFrameInterval() {
        frameIntervalEdited = false;
        let s = cloneDeep($DAQSchema);
        s.frameInterval = (1000 / frameIntervalValue) | 0;
        pushSchema(s);
    }

</script>


{#if ($DAQSchema)}
    <h1>{$DAQSchema.name}</h1>
    <Form>
        <FormGroup style="display: flex; flex-direction: row; align-items: center; gap: 1rem">
            <NumberInput
                    on:input={onFrameIntervalInput}

                    label="Framerate"
                    bind:value={frameIntervalValue}
                    helperText={"How often a data \"frame\" is captured, in hz"}
            />
            <Button on:click={applyFrameInterval} disabled={!frameIntervalEdited}>
                Apply
            </Button>
        </FormGroup>
    </Form>

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
            <span style="white-space: pre ; display: block; unicode-bidi: embed">
                {row.description || "No description"}
            </span>
        </svelte:fragment>

        <svelte:fragment slot="cell" let:cell let:row>
            {#if cell.key === "overflow"}
                <Float>
                    <Button icon={Edit24}
                            iconDescription="Edit Module"
                            tooltipPosition="left"
                            tooltipAlignment="start"
                            kind="ghost"
                            on:click={() => openEditModal(row.id)}/>
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
