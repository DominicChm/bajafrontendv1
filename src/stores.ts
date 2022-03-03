import {derived, readable, Subscriber, writable} from "svelte/store";
import {io} from "socket.io-client";
import { config } from "./config";


export let sio = io(config.apiUrl);

function linkChannel(channel: string) {
    return (set: Subscriber<any>) => {
        sio.on(channel, set);
        return () => sio.off(channel, set);
    }
}

function linkedStore(channel: string) {
    let r = readable(undefined, linkChannel(channel));
    r.subscribe(() => {
    }); //Link an empty sub so we always get socketio events.
    return r;
}

export const runs = linkedStore("runs");
export const activeRunId = linkedStore("active_run");
export const DAQSchema = linkedStore("schema");
export const capabilities = linkedStore("capabilities");
export const playState = linkedStore("play_state");
export const errorState = linkedStore("general_error");
export const moduleTypes = linkedStore("module_types");
export const dataStore = linkedStore("data");


export const activeRun = derived([activeRunId, runs], ([$activeRunId, $runs]) => $runs?.find((r: any) => r.id === $activeRunId));

export const currentTime = derived([playState], ([$playState]) => $playState?.time);
export const playing = derived([playState], ([$playState]) => $playState?.playing);
export const paused = derived([playState], ([$playState]) => $playState?.paused);
export const framerate = derived([playState], ([$playState]) => $playState?.framerate);

export const recordingRun = derived([runs], ([$runs]) => $runs?.find((r: any) => r.locked));

export const isRealtime = derived([activeRun], ([$activeRun]) => $activeRun?.type === "realtime");
export const isStored = derived([activeRun], ([$activeRun]) => $activeRun?.type === "stored");


export const connected = readable(false, (set) => {
    set(sio.connected);

    const setConnected = () => set(true);
    const setDisconnected = () => set(false);

    sio.on("connect", setConnected).on("disconnect", setDisconnected);
    return () => sio.offAny(setConnected).offAny(setDisconnected);
});

