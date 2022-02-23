<script>
    import {
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListHead, StructuredListInput,
        StructuredListRow
    } from "carbon-components-svelte";
    import CheckmarkFilled16 from "carbon-icons-svelte/lib/CheckmarkFilled16";
    import {runs as runsStore} from "./stores";

    export let selected = undefined;
</script>
<p>{selected}</p>
<StructuredList selection bind:selected>
    <StructuredListHead>
        <StructuredListRow head>
            <StructuredListCell head>Name</StructuredListCell>
            <StructuredListCell head>Time</StructuredListCell>
            <StructuredListCell head>ColumnC</StructuredListCell>
            <StructuredListCell head>{""}</StructuredListCell>
        </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
        {#each $runsStore.filter(r => r.type === "realtime") as item}
            <StructuredListRow label for="row-{item.uuid}">
                <StructuredListCell>Row {item.uuid}</StructuredListCell>
                <StructuredListCell>Row {item}</StructuredListCell>
                <StructuredListCell>
                    test
                </StructuredListCell>
                <StructuredListInput
                        id="row-{item.uuid}"
                        value="{item.uuid}"
                />
                <StructuredListCell>
                    <CheckmarkFilled16
                            class="bx--structured-list-svg"
                            aria-label="select an option"
                            title="select an option"
                    />
                </StructuredListCell>
            </StructuredListRow>
        {/each}
    </StructuredListBody>
</StructuredList>
