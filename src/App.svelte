<script lang="ts">
    import "carbon-components-svelte/css/all.css";
    import {
        Content,
        Header, HeaderAction, HeaderGlobalAction, HeaderPanelDivider, HeaderPanelLink, HeaderPanelLinks,
        HeaderUtilities,
        SideNav,
        SideNavDivider,
        SideNavItems,
        SideNavLink,
        SkipToContent,
    } from "carbon-components-svelte";
    import Archive16 from "carbon-icons-svelte/lib/Archive16";
    import Archive24 from "carbon-icons-svelte/lib/Archive24";
    import Router, {location} from 'svelte-spa-router'
    import {routes} from "./Pages/routes.ts"
    import {errorState} from "./stores";

    import DAQConnectionStatus from "./Icons/DAQConnectionStatus.svelte";
    import Toast from "./Components/Toast.svelte";
    import {onMount} from "svelte";
    import PageNav from "./Components/PageNav.svelte";
    import SidebarRunSelector from "./Components/SidebarRunSelector.svelte";

    let isSideNavOpen = false;
    let runsOpen = false;

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
        <SidebarRunSelector/>
    </HeaderUtilities>

</Header>
<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        <PageNav/>
        <SideNavDivider/>
        <SideNavLink icon={Archive16}
                     text="Runs"
                     href="#/"
                     isSelected={$location==="/"}/>
    </SideNavItems>
</SideNav>

<Content style="flex: 1;">
    <Router {routes}/>
</Content>

<Toast/>
