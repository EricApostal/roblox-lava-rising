import { Service } from "@flamework/core";
import { start, close } from "server/game/events";
import { Events } from "server/network";
import { Config } from "shared/components/game/config";
import { OnGameStarted, OnPlayerJoined } from "shared/components/game/scheduler";
import { GameSession } from "shared/components/game/state";
 
Events.event.connect((message) => {
    print(`Event received, ${message}`);
});

@Service()
export class GameStartListener implements OnGameStarted {
    onGameStarted() {
        print("Game started!");
        wait(Config.roundLength);
        close();
    }
}

export namespace RoundManager {
    let players: Player[] = [];

    export function addPlayerToRound(player: Player) {
        players.push(player);
    }

    export function removePlayerFromRound(player: Player) {
        const index = players.indexOf(player);
        if (index !== -1) {
            players.remove(index);
        }
    }

    export function getPlayers() {
        return players;
    }

    export function startRound() {
        start();
    }

    export function endRound() {
        close();
    }
}