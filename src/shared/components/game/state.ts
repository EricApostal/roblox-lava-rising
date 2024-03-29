import Signal from "@rbxts/signal";

export namespace GameSession {
    let day = 1;
    let _gameStarted = false;

    export const onGameStart = new Signal();
    export const onGameEnd = new Signal<(players: Player[]) => void>();
    export const onLookahead = new Signal();
    export const onCoinPickup = new Signal<(player: Player, deltaCoins: number, totalCoins: number) => void>();

    export function startGame(players: Player[]) {
        _gameStarted = true;
        onGameStart.Fire();
    }

    export function endGame(players: Player[]) {
        onGameEnd.Fire(players);
    }

    export function lookahead() {
        onLookahead.Fire();
    }

    export function coinPickup(player: Player, deltaCoins: number, totalCoins: number) {
        onCoinPickup.Fire(player, deltaCoins, totalCoins);
    }
}