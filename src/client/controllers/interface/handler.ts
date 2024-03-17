import { Config } from "shared/components/game/config";
import { renderApp } from "./app/app";
import { producer } from "./app/store";

export namespace UIService {
    let isMounted: boolean = false;
    let timerStarted = false;

    export function spawnTimer(startTime: number = 0) {
        producer.setTimer(startTime);
    
        if (timerStarted) return;
        timerStarted = true
        // Start timer
        task.spawn(() => {
            while (true) {
                producer.decrementTimer();
                wait(1);
            }
        });

    }
    export function showTimer() {
        producer.timerVisible(true);
    }
    export function hideTimer() {
        producer.timerVisible(false);
    }
    export function remount() {
        renderApp()
        isMounted = true;
    }
    export function setLookahead(lookahead: number) {
        producer.setLookahead(lookahead);
    }
    export function showLookahead() {
        task.spawn(() => {
            for (let i = 0; i < Config.roundLookahead; i++){
                producer.decrementLookahead();
                wait(1);
            }
        });
        producer.lookaheadVisible(true);
    }
    export function hideLookahead() {
        producer.lookaheadVisible(false);
    }
    export function spawnSidebar() {
        producer.sidebarVisible(true);
    }
    export function setCoins(coinValue: number) {
        producer.setCoins(coinValue);
    }
}