import Signal from "@rbxts/signal";

export namespace GameSession {
    let day = 1;
    let _gameStarted = false;

    export const onGameStart = new Signal();
    export const onGameEnd = new Signal();
    export const onLookahead = new Signal();

    export function startGame() {
        _gameStarted = true;
        onGameStart.Fire();
    }

    export function endGame() {
        onGameEnd.Fire();
    }

    export function lookahead() {
        onLookahead.Fire();
    }
}