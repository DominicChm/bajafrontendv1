<script>
    import {SideNavLink} from "carbon-components-svelte";
    import Fade16 from "carbon-icons-svelte/lib/Fade16";
    import {location, push} from "svelte-spa-router";
</script>

<SideNavLink icon={Fade16} text="Overview" href="#/overview"
             isSelected={$location === "/overview"}/>

<SideNavLink icon={Fade16} text="Dashboard" href="#/dashboard"
             isSelected={$location === "/dashboard"}/>

<SideNavLink icon={Fade16} text="Schema" href="#/schema"
             isSelected={$location === "/schema"}/>
