<script>
    import brake_pressure from "./BrakePressure/Config.svelte"
    import {ContentSwitcher, Form, FormGroup, Switch, TextArea, TextInput} from "carbon-components-svelte";

    export let typename;
    export let definition;

    let selectedIndex = 0;

    const typeMap = {
        brake_pressure
    }

    function decimalToHexString(number)
    {
        if (number < 0)
        {
            number = 0xFFFFFFFF + number + 1;
        }

        return number.toString(16).toUpperCase();
    }

</script>

<ContentSwitcher bind:selectedIndex style="margin-bottom: 1rem">
    <Switch text="General"/>
    <Switch text="Config" disabled={!typeMap[typename]}/>
    <Switch text="Advanced"/>
</ContentSwitcher>
{#if selectedIndex === 0}
    <Form>
        <FormGroup>
            <TextInput
                    labelText="Name"
                    bind:value={definition.name}
                    on:input/>
            <TextArea
                    labelText="Description"
                    bind:value={definition.description}
                    on:input
                    on:focus
                    on:blur
            />
        </FormGroup>

        <FormGroup style="display:flex; flex-direction: row; gap: 1rem">
            <TextInput
                    labelText="MAC Address"
                    bind:value={definition.mac}
                    on:input/>
            <TextInput
                    labelText="Type"
                    bind:value={definition.type}
                    on:input/>
        </FormGroup>
    </Form>
{:else if selectedIndex === 1}
    <svelte:component this={typeMap[typename]} bind:config={definition.config} on:input/>
{:else if selectedIndex === 2}
    <FormGroup>
        <TextInput labelText="Type Hash"
                   value={"0x" + decimalToHexString(definition.config.typeNameHash)}
                   disabled
                   on:input/>

    </FormGroup>
{/if}


