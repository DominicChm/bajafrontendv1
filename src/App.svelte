<script lang="ts">
    import "carbon-components-svelte/css/all.css";
    import {
        ComboBox, Content,
        Header,
        HeaderUtilities,
        SideNav,
        SideNavDivider,
        SideNavItems,
        SideNavLink,
        SkipToContent,
    } from "carbon-components-svelte";
    import Fade16 from "carbon-icons-svelte/lib/Fade16";
    import Archive16 from "carbon-icons-svelte/lib/Archive16";

    import {sio} from "./stores";
    import DAQConnectionStatus from "./Icons/DAQConnectionStatus.svelte";
    import RunPage from "./RunPage.svelte";

    enum test {
        overview,
        runs,
        dashboard,
        schema
    }

    const pages = {
        [test.runs]: RunPage
    }

    let isSideNavOpen = false;
    let selectedPage: test = test.overview;

    let data = {}
    let frameIndColor = "#000";
    sio.on("data", (d) => {
        data = d;
        //console.log(data);
        frameIndColor = "#080"
        setTimeout(() => { //Heartbeat for data
            frameIndColor = "#000"
        }, 50);
    });

    let runSelectorOpen = false;

    function createModule() {
        sio.emit("create_module", "brake_pressure", "AA:BB:CC:DD:EE:FF");
    }

    function handlePlay() {
        data = {};
        sio.emit("play_start");
    }

    function handleStopPlay() {
        sio.emit("play_stop");
    }

</script>


<Header company="Baja DAQ" platformName="v0.0.1" bind:isSideNavOpen>
    <svelte:fragment slot="skip-to-content">
        <SkipToContent/>
    </svelte:fragment>

    <HeaderUtilities>
        <DAQConnectionStatus/>
    </HeaderUtilities>
</Header>

<SideNav isOpen={isSideNavOpen} rail={false}>
    <SideNavItems>
        <SideNavLink icon={Fade16} text="Overview" href="javascript:void(0)"
                     on:click={() => selectedPage = test.overview }
                     isSelected={selectedPage===test.overview}/>

        <SideNavLink icon={Fade16} text="Dashboard" href="javascript:void(0)"
                     on:click={() => selectedPage = test.dashboard }
                     isSelected={selectedPage===test.dashboard}/>

        <SideNavLink icon={Fade16} text="Schema" href="javascript:void(0)"
                     on:click={() => selectedPage = test.schema }
                     isSelected={selectedPage===test.schema}/>

        <SideNavLink icon={Fade16} text="Link 4" href="javascript:void(0)"
                     on:click={() => selectedPage = test.runs }
                     isSelected={selectedPage===test.runs}/>

        <SideNavDivider/>
        <SideNavLink icon={Archive16}
                     text="Runs"
                     href="javascript:void(0)"
                     on:click={() => selectedPage = test.runs }
                     isSelected={selectedPage===test.runs}/>
    </SideNavItems>
</SideNav>

<style>

</style>
<Content>
    <svelte:component this={pages[test.runs]}/>
</Content>
<!--<SPAHeader io={sio}/>-->

<!--<TitledContainer title="Capabilities">-->
<!--    <p>{JSON.stringify($capabilities, null, 3)}</p>-->
<!--</TitledContainer>-->
<!--<TitledContainer title="playControls">-->
<!--    <PlayControls sio={sio}/>-->
<!--</TitledContainer>-->
<!--<TitledContainer title="Runs">-->
<!--    <RunControl sio={sio}/>-->
<!--</TitledContainer>-->
<!--<TitledContainer title="Data">-->
<!--    <div style="background: {frameIndColor}; width: 10px; height: 10px; border: 1px solid black; margin: 8px"></div>-->
<!--    <DataView/>-->
<!--    {#if ($playState?.playing)}-->
<!--        <button on:click={handleStopPlay}>Stop Playing</button>-->
<!--    {:else }-->
<!--        <button on:click={handlePlay}>Play</button>-->
<!--    {/if}-->
<!--</TitledContainer>-->
<!--<button on:click={createModule}>Add Module</button>-->
<!--<Editor sio={sio}/>-->
<!--<TitledContainer title="Schema">-->
<!--    <pre>{JSON.stringify($DAQSchema, null, 2)}</pre>-->
<!--    <button on:click={createModule}>Add Module</button>-->
<!--</TitledContainer>-->
<!--<meter value="50" max="100" min="0" low="25" high="75" optimum="50"></meter>-->
<!--<progress value="50" max="100"></progress>-->
<!--<Toast/>-->
