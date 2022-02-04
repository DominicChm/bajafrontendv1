<script>
    import TitledContainer from "./TitledContainer.svelte";

    export let definition;


</script>

<TitledContainer title={definition.id}>
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
            <td>{definition.name}</td>
            <td><input bind:value={definition.name}></td>
        </tr>
        <tr>
            <td>type</td>
            <td>{definition.type}</td>
            <td><input bind:value={definition.type}></td>
        </tr>
        <tr>
            <td>id</td>
            <td>{definition.id}</td>
            <td><input bind:value={definition.id}></td>
        </tr>
        <tr>
            <td>description</td>
            <td>{definition.description}</td>
            <td><input bind:value={definition.description}></td>
        </tr>
        {#each Object.keys(definition.config) as k}
            <tr>
                <td>{k}</td>
                <td>{definition.config[k]}</td>
                <td><input bind:value={definition.config[k]}></td>
            </tr>
        {/each}

        </tbody>
    </table>

</TitledContainer>
