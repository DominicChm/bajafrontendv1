<script>
    import {
        ComboBox,
        HeaderAction,
        HeaderPanelDivider,
        HeaderPanelLink,
        HeaderPanelLinks
    } from "carbon-components-svelte";
    import Archive24 from "carbon-icons-svelte/lib/Archive24";
    import {runs} from "../stores";

    export let isOpen = true;

    let items = $runs?.map(r => ({id: r.id, text: r.meta.name}));

    $: console.log(items);
</script>

<HeaderAction bind:isOpen icon={Archive24}>
    <HeaderPanelLinks>
        <HeaderPanelDivider>Realtime Runs</HeaderPanelDivider>
        <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
        <HeaderPanelDivider>Stored Runs</HeaderPanelDivider>
        <div style="padding: .375rem 1rem">
            <ComboBox
                    bind:items
                    placeholder="Select run"
             />
        </div>
        <HeaderPanelLink>Switcher item 2</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 3</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 4</HeaderPanelLink>
        <HeaderPanelLink>Switcher item 5</HeaderPanelLink>
    </HeaderPanelLinks>
</HeaderAction>
