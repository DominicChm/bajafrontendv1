<script lang="ts">
    import {Column, Grid, NumberInput, Row, TextInput, Toggle} from "carbon-components-svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let obj: Object;
    export let keys: string[] | null = null;
    export let noEditKeys: string[] | null = null;
    export let types = ["number", "boolean", "string"];
</script>

<Grid>
    {#each Object.entries(obj) as [k, v]}
        {#if ((!keys || keys.includes(k)) && types.includes(typeof v))}
            <Row>
                <Column padding>
                    {k}
                </Column>
                <Column>
                    {#if (noEditKeys?.includes(k))}
                        <p>{v}</p>
                    {:else if (typeof v === "number")}
                        <NumberInput on:input={e => dispatch("change", e)} bind:value={obj[k]}/>
                    {:else if (typeof v === "boolean")}
                        <Toggle on:change bind:value={obj[k]}/>
                    {:else if (typeof v === "string")}
                        <TextInput on:input={e => dispatch("change", e)} bind:value={obj[k]}/>
                    {/if}

                </Column>
            </Row>
        {/if}
    {/each}
</Grid>
