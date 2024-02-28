import { renderApp } from "./app/app";
import { producer } from "./app/store";

export namespace UIService {
    let isMounted: boolean = false;

    export function spawnTimer(startTime: number = 0) {
        producer.setTimer(startTime);
        
        if (!isMounted) {
            function timerThread() {
                task.spawn(() => {
                    while (true) {
                        producer.decrementTimer();
                        wait(1);
                    }
                });
            }
            timerThread();
        }
        renderApp();
        isMounted = true;
    }
    export function showTimer() {
        producer.timerVisible(true);
    }
    export function hideTimer() {
        producer.timerVisible(false);
    }
    export function remount() {
        if (isMounted) renderApp();
    }
    export function setLookahead(lookahead: number) {
        renderApp();
        producer.setLookahead(lookahead);
    }
    export function showLookahead() {
        producer.lookaheadVisible(true);
    }
    export function hideLookahead() {
        producer.lookaheadVisible(false);
    }
}