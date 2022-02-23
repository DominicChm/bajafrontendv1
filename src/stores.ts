import {readable, Subscriber, writable} from "svelte/store";
import {io} from "socket.io-client";

export let sio = io("http://localhost:3000");

function linkChannel(channel: string) {
    return (set: Subscriber<never[]>) => {
        sio.on(channel, set);
        return () => sio.off(channel, set);
    }
}

export const runs = readable([], linkChannel("runs"));
export const activeRun = readable(undefined, linkChannel("active_run"));
export const DAQSchema = readable(undefined, linkChannel("schema"));
export const capabilities = readable(undefined, linkChannel("capabilities"));
export const playState = readable(undefined, linkChannel("play_state"));
//sio.on("general_error", (msg) => notifications.danger(msg,1000));

export const connected = readable(false, (set) => {
    set(sio.connected);

    const setConnected = () => set(true);
    const setDisconnected = () => set(false);

    sio.on("connect", setConnected).on("disconnect", setDisconnected);
    return () => sio.offAny(setConnected).offAny(setDisconnected);
});
