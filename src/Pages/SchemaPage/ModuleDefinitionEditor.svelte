<script>
    import {Modal} from "carbon-components-svelte";
    import ObjectEditor from "./ObjectEditor.svelte";
    import {createEventDispatcher} from "svelte";
    import {cloneDeep} from "lodash";
    import {DAQSchema} from "../../stores";

    const dispatch = createEventDispatcher();

    export let open = false;
    export let id = null;

    let editCache;

    let editsMade;

    $: {
        open;
        editsMade = false;
    }

    $: {
        if ($DAQSchema)
            editCache = cloneDeep($DAQSchema.modules.find(m => m.id === id));
    }

</script>

<Modal
        bind:open
        modalHeading="Edit Module"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        primaryButtonDisabled={!editsMade}
        on:submit={() => dispatch("submit", editCache)}
        on:click:button--secondary={() => open = false}>
    {#if (editCache && id)}
        <ObjectEditor obj={editCache} noEditKeys={["version"]} keys={["name", "description", "mac", "type"]}
                      on:change={() => editsMade = true}/>

        {#if (editCache?.config && Object.keys(editCache.config) > 0)}
            <h4>Config</h4>
            <ObjectEditor obj={editCache.config} on:change={() => editsMade = true}/>
        {/if}

    {:else }
        <p>No data. This module might have been deleted.</p>
        <p>ID: {id}</p>
    {/if}
</Modal>

