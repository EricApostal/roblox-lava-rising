import Signal from "@rbxts/signal";
import { Config } from "shared/components/game/config";
import { Events } from "server/network";
import { GameSession } from "shared/components/game/state";

// On server start
export function init() {
    print("Initializing server...");
    wait(3);
}

// On game start
export function start(players: Player[]) {
    GameSession.startGame();

    for (const player of players) {
        Events.startGame.fire(player, Config.roundLength)
    }
}

// On game end
export function close() {
    GameSession.endGame();
    Events.endGame.broadcast();
}

// On lookahead
export function lookahead() {
    Events.lookahead.broadcast(Config.roundLookahead);
}