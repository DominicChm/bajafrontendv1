<script>
    import Grid from 'svelte-grid'
    import gridHelp from 'svelte-grid/build/helper'
    import DrivenTimeline from "../Components/DrivenTimeline.svelte";
    import RunHeader from "../Components/RunHeader.svelte";
    import RadialGauge from "../Components/RadialGauge.svelte";

    const {item, findSpace} = gridHelp;
    const id = () => "_" + Math.random().toString(36).substr(2, 9);
    import Reset32 from "carbon-icons-svelte/lib/Reset32";
    import {Button, ComboBox, LocalStorage, Search, MultiSelect} from "carbon-components-svelte";
    import {DAQSchema} from "../stores";
    import {findFreeSpaceForItem} from "svelte-grid/src/utils/item";
    import ModuleDashboard from "../ModuleWidgets/ModuleDashboard.svelte";

    let container;
    let storage;

    let items = [];

    let shownIds = [];

    $: selectItems = $DAQSchema?.modules?.map(m => ({id: m.id, text: m.name})) ?? [];


    function onUpdate({detail}) {
        shownIds = detail.value?.map(d => d.id) ?? []
    }

    function syncSelect() {
        items = items.filter(i => shownIds.includes(i.id))
        const newIds = shownIds.filter(i => !items.find(j => j.id === i));

        for (const id of newIds) {
            let newItem = {
                id,
                5: item({x: 0, w: 1, h: 1, y: 0}),
                3: item({x: 0, w: 1, h: 1, y: 0}),
                2: item({x: 0, w: 1, h: 1, y: 0}),
            }

            //Position new item.
            const positions = {
                5: {...newItem[5], ...gridHelp.findSpace(newItem, items, 5)},
                3: {...newItem[3], ...gridHelp.findSpace(newItem, items, 3)},
                2: {...newItem[2], ...gridHelp.findSpace(newItem, items, 2)}
            }

            newItem = {
                ...newItem,
                ...positions
            }

            items = [...items, newItem];
        }
    }

    $: items = gridHelp.normalize(items, 5);

    const cols = [
        [1500, 5],
        [1056, 3],
        [750, 2]
    ];

    function resetDash() {
        items = [];
    }
</script>

<style>
    .root {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .content {
        background: #f4f4f4;
        height: 100%;
        width: 100%;
    }

</style>

<div class="root">
    <RunHeader>
        <svelte:fragment slot="actions">
            <MultiSelect
                    spellcheck="false"
                    filterable
                    placeholder="Select Shown Modules"
                    items={selectItems}
                    bind:selectedIds={shownIds}
                    on:select={syncSelect}
            />
            <Button icon={Reset32} iconDescription="Reset Dashboard" kind="secondary" on:click={resetDash}/>

        </svelte:fragment>
    </RunHeader>
    <div style="flex: 1; overflow-y: scroll; overflow-x: hidden" bind:this={container}>
        <Grid bind:items={items} rowHeight={200} let:item let:dataItem {cols} let:index scroller={container}>

            <div class="content">
                <ModuleDashboard typename={$DAQSchema?.modules.find(m => m.id === dataItem.id)?.type} id={dataItem.id}/>
            </div>

        </Grid>
    </div>
    <div style="width: 100%; height: 6rem;">
        <DrivenTimeline/>
    </div>
</div>

<LocalStorage
        key="dashboard-layout"
        bind:value={items}
        bind:this={storage}
        on:update={onUpdate}
/>
