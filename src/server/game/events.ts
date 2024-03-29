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
    GameSession.startGame(players);

    for (const player of players) {
        Events.startGame.fire(player, players, Config.roundLength)
    } 
}

// On game end
export function close(players: Player[]) {
    Events.endGame.broadcast(players);
    GameSession.endGame(players);
}

// On lookahead
export function lookahead() {
    Events.lookahead.broadcast(Config.roundLookahead);
}