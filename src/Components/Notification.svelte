<script lang="ts">
    import {ToastNotification} from "carbon-components-svelte";

    export let notification: {
        type: "error" | "info" | "success" | "warning",
        title: string,
        subtitle: string
    } = {};
    // `onRemove` function will be passed into your component.
    export let onRemove = null;

    const handleButtonClick = () => {
        onRemove();
    }
</script>

<ToastNotification
        style="z-index: 100000000; position: relative;"
        on:close={handleButtonClick}
        title={notification.title}
        subtitle={notification.subtitle}
        kind={notification.type}
/>
