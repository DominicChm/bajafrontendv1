<script>
    import {Button, Modal} from "carbon-components-svelte";
    import TrashCan16 from "carbon-icons-svelte/lib/TrashCan16";
    import RunList from "./RunList.svelte";


    export let open = false;

    let selected = "";


</script>
<Button kind="danger-tertiary" iconDescription="Delete" icon={TrashCan16}/>

<Modal bind:open
       modalHeading="Runs"
       primaryButtonText="Open"
       on:click:button--secondary={() => (open = false)}
       secondaryButtonText="Cancel"
       on:open={() => selected = undefined}
       primaryButtonDisabled={selected == null}
       hasScrollingContent>

    <RunList bind:selected/>
</Modal>
