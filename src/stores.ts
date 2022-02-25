import {derived, readable, Subscriber, writable} from "svelte/store";
import {io} from "socket.io-client";
import {onDestroy} from "svelte";

export let sio = io("http://localhost:3000");

function linkChannel(channel: string) {
    return (set: Subscriber<any>) => {
        sio.on(channel, set);
        return () => sio.off(channel, set);
    }
}

export const runs = readable([], linkChannel("runs"));
export const activeRunId = readable<string>(undefined, linkChannel("active_run"));
export const DAQSchema = readable(undefined, linkChannel("schema"));
export const capabilities = readable(undefined, linkChannel("capabilities"));
export const playState = readable(undefined, linkChannel("play_state"));
export const errorState = readable(undefined, linkChannel("general_error"));
export const moduleTypes = readable(undefined, linkChannel("module_types"));

export const activeRun = derived([activeRunId, runs], ([$activeRunId, $runs]) => $runs.find((r: any) => r.id === $activeRunId))

//sio.on("general_error", (msg) => notifications.danger(msg,1000));

export const connected = readable(false, (set) => {
    set(sio.connected);

    const setConnected = () => set(true);
    const setDisconnected = () => set(false);

    sio.on("connect", setConnected).on("disconnect", setDisconnected);
    return () => sio.offAny(setConnected).offAny(setDisconnected);
});
