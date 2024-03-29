import { start, close } from "server/game/events";

export namespace RoundManager {
    let players: Player[] = [];

    export function addPlayerToRound(player: Player) {
        if (!players.includes(player)) players.push(player);
    }

    export function removePlayerFromRound(player: Player) {
        const index = players.indexOf(player);
        if (index !== -1) {
            players.remove(index);
        }
    }

    export function getPlayers(): Player[] {
        return players;
    }

    export function startRound() {
        start(players);
    }

    export function endRound() {
        close(players); 
        players = [];
    }
}