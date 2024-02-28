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
export function close(players: Player[]) {
    GameSession.endGame(players); 
    Events.endGame.broadcast(players);
}

// On lookahead
export function lookahead() {
    Events.lookahead.broadcast(Config.roundLookahead);
}