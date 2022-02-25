<script>
    import {SideNavLink} from "carbon-components-svelte";
    import Fade16 from "carbon-icons-svelte/lib/Fade16";

    export let selectedPageKey;

    export let keys = {
        overview: "overview",
        dashboard: "dashboard",
        schema: "schema",
    }
</script>

<SideNavLink icon={Fade16} text="Overview" href="javascript:void(0)"
             on:click={() => selectedPageKey = keys.overview }
             isSelected={selectedPageKey===keys.overview}/>

<SideNavLink icon={Fade16} text="Dashboard" href="javascript:void(0)"
             on:click={() => selectedPageKey = keys.dashboard }
             isSelected={selectedPageKey===keys.dashboard}/>

<SideNavLink icon={Fade16} text="Schema" href="javascript:void(0)"
             on:click={() => selectedPageKey = keys.schema }
             isSelected={selectedPageKey===keys.schema}/>
