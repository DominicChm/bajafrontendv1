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

    import {activeRun, activeRunId, runs, sio} from "./stores";
    import DAQConnectionStatus from "./Icons/DAQConnectionStatus.svelte";
    import RunPage from "./Pages/RunPage.svelte";
    import RealtimeNav from "./RunNavs/RealtimeNav.svelte";
    import UnkownPage from "./Pages/UnkownPage.svelte";
    import SchemaPage from "./Pages/SchemaPage/SchemaPage.svelte";
    import OverviewPage from "./Pages/OverviewPage.svelte";
    import StoredNav from "./RunNavs/StoredNav.svelte";

    // onMount(() => sio.connect());
    // onDestroy(() => sio.disconnect());

    const pages = {
        runs: RunPage,
        schema: SchemaPage,
        overview: OverviewPage,

    }

    let isSideNavOpen = false;
    let selectedPageKey = "runs";
    let selectedPage = UnkownPage;

    // Move current view to overview on run selection.
    $: if (!$activeRunId) selectedPageKey = "runs"; else selectedPageKey = "schema";
    $: selectedPage = pages[selectedPageKey] ?? UnkownPage;

    function createModule() {
        sio.emit("create_module", "brake_pressure", "AA:BB:CC:DD:EE:FF");
    }

    function handlePlay() {
        sio.emit("play_start");
    }

    function handleStopPlay() {
        sio.emit("play_stop");
    }
</script>


<Header company="SAE Baja" platformName="DAQ v0.0.1" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent/>
    </svelte:fragment>

    <HeaderUtilities>
        <DAQConnectionStatus/>
    </HeaderUtilities>

</Header>
<SideNav bind:isOpen={isSideNavOpen} >
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

<style>

</style>
<Content>
    <svelte:component this={selectedPage}/>
</Content>
