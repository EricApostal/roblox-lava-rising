import { renderTimer } from "./app/app";
import { timerProducer } from "./app/stores/timer";

export namespace UIService {
    let isMounted: boolean = false;

    export function spawnTimer(startTime: number = 0) {
        timerProducer.setValue(startTime);
        function timerThread() {
            task.spawn(() => {
                while (true) {
                    timerProducer.decrement();
                    wait(1);
                }
            });
        }
        timerThread();
        renderTimer();
        isMounted = true;
        print("Is Mounted!");
    }
    export function showTimer() {
        timerProducer.visible(true);
    }
    export function hideTimer() {
        timerProducer.visible(false);
    }
    export function remount() {
        // const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
        // timerProducer.mount(playerGui);
        if (isMounted) renderTimer();
    }
}