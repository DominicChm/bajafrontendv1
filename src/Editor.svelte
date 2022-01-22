<script>
    import TitledContainer from "./TitledContainer.svelte";
    import ModuleDefinitionEditor from "./ModuleDefinitionEditor.svelte";

    export let sio;
    let state = {};

    sio.on("client_state", (s) => {
        state = s;
    });

    function pushStateUpdate() {
        sio.emit("schema_update", state.schema);
    }

</script>

<TitledContainer title="Configure">
    <button on:click={pushStateUpdate}>Push Updates</button>

    {#each state?.schema?.modules ?? [] as moduleDef}
        <ModuleDefinitionEditor definition={moduleDef}/>
    {:else }
        <p>No modules!</p>
    {/each}

</TitledContainer>
