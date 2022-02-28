import {activeRunId, DAQSchema, sio} from "./stores";
import {get} from "svelte/store";
import {cloneDeep, findIndex} from "lodash";

export function play() {
    sio.emit("play_start");
}

export function stop() {
    sio.emit("play_stop");
}

export function resetPlayback() {
    sio.emit("play_seek", 0);
}

export function pause() {
    sio.emit("play_pause");
}

export function setFramerate(rate: number) {
    sio.emit("play_framerate", rate);
}

export function seekTo(time: number) {
    sio.emit("play_seek", time);
}

//Creates a new run that stores this run's data.
export function startStorage(uuid: string) {
    sio.emit("run_init", uuid);
}

// Unlinks the passed UUID from its data source, if it has one.
export function stopRunStorage(uuid: string) {
    sio.emit("run_stop", uuid);
}

export function deleteRun(uuid: string) {
    sio.emit("run_delete", uuid);
}

export function activateRun(uuid: string) {
    if (get(activeRunId) as any !== uuid && uuid != null)
        sio.emit("activate_run", uuid);

}

export function deactivateRun() {
    sio.emit("deactivate_run");
}

export function createModule(typeName: string) {
    sio.emit("create_module", typeName);
}

export function pushSchema(schema: any) {
    sio.emit("schema_update", schema);
}

export function applyModuleDefinition(definition: any) {
    const schema = cloneDeep(get(DAQSchema));

    //Replace definition by ID
    const i = findIndex(schema.modules, {id: definition.id});
    schema.modules.splice(i, 1, definition);

    pushSchema(schema);
}
