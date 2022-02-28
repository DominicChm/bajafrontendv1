<script>
    import {fly} from "svelte/transition";
    import {notifications} from "./notifications.js";
    import {ToastNotification} from "carbon-components-svelte";

    export let types = {
        danger: {kind: "error", title: "Error"},
        success: {kind: "success", title: "Success!"},
        warning: {kind: "warning", title: "Warning"},
        info: {kind: "info", title: "Info"},
        default: {kind: "info", title: "Info"},
    };


</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
                class="toast"
                transition:fly={{ y: 30 }}
        >
            <ToastNotification
                    title={types[notification.type].title}
                    subtitle={notification.message}
                    kind={types[notification.type].kind}
                    lowContrast
            />
        </div>
    {/each}
</div>

<style>
    .notifications {
        position: fixed;
        top: 4rem;
        right: 1rem;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        pointer-events: none;
    }

    .toast {
    }

    .content {
        padding: 10px;
        display: block;
        color: white;
        font-weight: 500;
    }
</style>
