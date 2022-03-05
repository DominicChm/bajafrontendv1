<script>
    import {Form, FormGroup, Modal, TextArea, TextInput} from "carbon-components-svelte";
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
    let closeOnEnter = true;


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
        open = false;
    }


    function changeMade() {
        editsMade = true;
    }
</script>

<Modal
        bind:open
        modalHeading="Edit Module"
        primaryButtonText="Apply"
        secondaryButtonText="Cancel"
        primaryButtonDisabled={!editsMade}
        on:submit={applyEdits}
        on:click:button--secondary={() => open = false}
        hasScrollingContent>
    {#if (editCache && id)}


        {#if (editCache?.config && Object.keys(editCache.config).length > 0)}
            <ModuleConfig
                    typename={editCache.type}
                    bind:config={editCache.config}
                    on:input={changeMade}
                    on:focus={() => closeOnEnter = false}
                    on:blur={() => closeOnEnter = true}
            />
        {/if}
    {:else }
        <p>No data. This module might have been deleted.</p>
        <p>ID: {id}</p>
    {/if}
</Modal>

