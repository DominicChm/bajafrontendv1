<script>
    import TitledContainer from "./TitledContainer.svelte";
    import ModuleDefinitionEditor from "./ModuleDefinitionEditor.svelte";

    export let sio;
    let schema = undefined;

    sio.on("schema", (s) => {
        schema = s;
    });

    function pushStateUpdate() {
        sio.emit("schema_update", schema);
    }

</script>

<TitledContainer title="Configure">
    <button on:click={pushStateUpdate}>Push Updates</button>
    <TitledContainer title="GENERAL SCHEMA">
        {#if (schema)}
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
                    <td>{schema.name}</td>
                    <td><input bind:value={schema.name}></td>
                </tr>
                <tr>
                    <td>Frame Interval</td>
                    <td>{schema.frameInterval}</td>
                    <td><input type="number" bind:value={schema.frameInterval}></td>
                </tr>
                </tbody>
            </table>
        {:else}
            <p>No schema present...</p>
        {/if}
    </TitledContainer>
    {#each schema?.modules ?? [] as moduleDef}
        <ModuleDefinitionEditor definition={moduleDef}/>
    {:else }
        <p>No modules!</p>
    {/each}

</TitledContainer>
