<script lang="ts">
    import "carbon-components-svelte/css/all.css";
    import {
        Content,
        Header,
        HeaderUtilities,
        SideNav,
        SideNavDivider,
        SideNavItems,
        SideNavLink,
        SkipToContent,
    } from "carbon-components-svelte";
    import Archive16 from "carbon-icons-svelte/lib/Archive16";
    import Router, {location} from 'svelte-spa-router'
    import {routes} from "./Pages/routes.ts"
    import {activeRun, errorState} from "./stores";

    import DAQConnectionStatus from "./Icons/DAQConnectionStatus.svelte";
    import Toast from "./Components/Toast.svelte";
    import RealtimeNav from "./RunNavs/RealtimeNav.svelte";
    import StoredNav from "./RunNavs/StoredNav.svelte";
    import {onMount} from "svelte";

    let isSideNavOpen = false;
    onMount(() => {

    });
    //Errors? Keep as console log for now :/ TODO: ERRORS.
    errorState.subscribe(value => {
        console.log(value);
        // notifications.danger(value, value.length * 50)
    });

</script>
<style>
    :global(html) {
        margin: 0;
        height: 100%;
        display: flex;
    }

    :global(body) {
        flex: 1;
        margin: 0;
        display: flex;
        overflow: hidden;
    }


</style>

<Header company="SAE Baja" platformName="DAQ v0.0.1" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent/>
    </svelte:fragment>

    <HeaderUtilities>
        <DAQConnectionStatus/>
    </HeaderUtilities>

</Header>
<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        {#if ($activeRun?.type === "realtime")}
            <RealtimeNav/>
            <SideNavDivider/>
        {:else if ($activeRun?.type === "stored")}
            <StoredNav/>
            <SideNavDivider/>
        {/if}
        <SideNavLink icon={Archive16}
                     text="Runs"
                     href="#/"
                     isSelected={$location==="/"}/>
    </SideNavItems>
</SideNav>

<Content style="flex: 1;">
    <Router {routes}/>
    <!--    <svelte:component this={selectedPage}/>-->
</Content>

<Toast/>
