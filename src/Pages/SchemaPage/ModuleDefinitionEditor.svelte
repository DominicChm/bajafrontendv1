<script>
    import {FormGroup, Modal, TextArea, TextInput} from "carbon-components-svelte";
    import {createEventDispatcher} from "svelte";
    import {cloneDeep} from "lodash";
    import {DAQSchema} from "../../stores";
    import {applyModuleDefinition} from "../../api";
    import ModuleConfig from "../../ModuleWidgets/ModuleConfig.svelte"

    const dispatch = createEventDispatcher();

    export let open = false;
    export let id = null;

    let editCache = null;
    let cacheInvalid = true;

    let n = {n: ""};
    let editsMade;

    $: if (open) editsMade = false;
    $: if (!open) cacheInvalid = true;

    $: {
        if ($DAQSchema && cacheInvalid && open) {
            editCache = cloneDeep($DAQSchema.modules.find(m => m.id === id));
            cacheInvalid = false;
        }
    }


    function applyEdits() {
        applyModuleDefinition(editCache);
        open=false;
    }


    function changeMade() {
        editsMade = true;
    }
</script>

<Modal
        bind:open
        modalHeading="Edit Module"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        primaryButtonDisabled={!editsMade}
        on:submit={applyEdits}
        on:click:button--secondary={() => open = false}>
    {#if (editCache && id)}
        <FormGroup>
            <TextInput
                    labelText="Name"
                    bind:value={editCache.name}
                    on:input={changeMade}/>
            <TextArea
                    labelText="Description"
                    bind:value={editCache.description}
                    on:input={changeMade}/>
        </FormGroup>

        <FormGroup style="display:flex; flex-direction: row; gap: 1rem">
            <TextInput
                    labelText="MAC Address"
                    bind:value={editCache.mac}
                    on:input={changeMade}/>
            <TextInput
                    labelText="Type"
                    bind:value={editCache.type}
                    on:input={changeMade}/>
        </FormGroup>

        {#if (editCache?.config && Object.keys(editCache.config).length > 0)}
            <ModuleConfig
                    typename={editCache.type}
                    bind:config={editCache.config}
                    on:input={changeMade}/>
        {/if}
    {:else }
        <p>No data. This module might have been deleted.</p>
        <p>ID: {id}</p>
    {/if}
</Modal>

