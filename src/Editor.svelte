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
    <TitledContainer title="GENERAL SCHEMA">
        {#if (state.schema)}
            <table>
                <thead>
                <tr>
                    <th>Field</th>
                    <th>Current</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>name</td>
                    <td>{state?.schema.name}</td>
                    <td><input bind:value={state.schema.name}></td>
                </tr>
                <tr>
                    <td>Frame Interval</td>
                    <td>{state?.schema.frameInterval}</td>
                    <td><input type="number" bind:value={state.schema.frameInterval}></td>
                </tr>
                </tbody>
            </table>
        {:else}
            <p>No schema present...</p>
        {/if}
    </TitledContainer>
    {#each state?.schema?.modules ?? [] as moduleDef}
        <ModuleDefinitionEditor definition={moduleDef}/>
    {:else }
        <p>No modules!</p>
    {/each}

</TitledContainer>
