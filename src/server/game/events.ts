import Signal from "@rbxts/signal";
import { Config } from "shared/components/game/config";
import { Events } from "server/network";
import { GameSession } from "shared/components/game/state";

// On server start
export function init() {
    print("Initializing server...");
    wait(3);
    start();
}

// On game start
export function start() {
    GameSession.startGame();
    Events.startGame.broadcast(Config.gameLength);
}

// On game end
export function close() {
    GameSession.endGame();
    Events.endGame.broadcast();
}
