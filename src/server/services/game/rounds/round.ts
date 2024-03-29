import { start, close } from "server/game/events";

export namespace RoundManager {
    let players: Player[] = [];
    let initialPlayers: Player[] = [];

    export function addPlayerToRound(player: Player) {
        if (!players.includes(player)) {
            players.push(player);
            initialPlayers.push(player);
        }
    }

    export function removePlayerFromRound(player: Player) {
        const index = players.indexOf(player);
        if (index !== -1) {
            players.remove(index);
        }
    }

    export function getActivePlayers(): Player[] {
        return players;
    }

    export function getInitialPlayers(): Player[] {
        return initialPlayers;
    }

    export function startRound() {
        start(players);
    }

    export function endRound() {
        close(initialPlayers); 
        initialPlayers = [];
        players = [];
    }
}