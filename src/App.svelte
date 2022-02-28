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

    import {activeRun, activeRunId, errorState, runs, sio} from "./stores";
    import {notifications} from './Components/notifications.js'

    import DAQConnectionStatus from "./Icons/DAQConnectionStatus.svelte";
    import RunPage from "./Pages/RunPage.svelte";
    import RealtimeNav from "./RunNavs/RealtimeNav.svelte";
    import UnkownPage from "./Pages/UnkownPage.svelte";
    import SchemaPage from "./Pages/SchemaPage/SchemaPage.svelte";
    import OverviewPage from "./Pages/OverviewPage.svelte";
    import StoredNav from "./RunNavs/StoredNav.svelte";
    import DashboardPage from "./Pages/DashboardPage.svelte";
    import Toast from "./Components/Toast.svelte";

    // onMount(() => sio.connect());
    // onDestroy(() => sio.disconnect());

    const pages = {
        runs: RunPage,
        schema: SchemaPage,
        overview: OverviewPage,
        dashboard: DashboardPage,
    }

    let isSideNavOpen = false;
    let selectedPageKey = "runs";
    let selectedPage = UnkownPage;

    // Move current view to overview on run selection.
    $: if (!$activeRunId) selectedPageKey = "runs"; else selectedPageKey = "schema";
    $: selectedPage = pages[selectedPageKey] ?? UnkownPage;

    //Errors? Keep as console log for now :/
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
            <RealtimeNav bind:selectedPageKey/>
            <SideNavDivider/>
        {:else if ($activeRun?.type === "stored")}
            <StoredNav bind:selectedPageKey/>
            <SideNavDivider/>
        {/if}

        <SideNavLink icon={Archive16}
                     text="Runs"
                     href="javascript:void(0)"
                     on:click={() => selectedPageKey = "runs" }
                     isSelected={selectedPageKey==="runs"}/>
    </SideNavItems>
</SideNav>


<Content style="flex: 1;">
    <svelte:component this={selectedPage}/>
</Content>

<Toast />
