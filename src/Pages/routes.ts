// @ts-ignore
import DashboardPage from "./DashboardPage.svelte"; // @ts-ignore
import OverviewPage from "./OverviewPage.svelte"; // @ts-ignore
import RunPage from "./RunPage.svelte" ; // @ts-ignore
import UnknownPage from "./UnkownPage.svelte" // @ts-ignore
import SchemaPage from "./SchemaPage/SchemaPage.svelte";

export const routes = {
    '/': RunPage,
    '/overview': OverviewPage,
    '/dashboard': DashboardPage,
    '/schema': SchemaPage,
    '*': UnknownPage,
}
