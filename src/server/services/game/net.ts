import { Events } from "server/network";

export namespace Network {
    export function notifyAllGameStart() {
        Events.startGame.broadcast();
    }
}