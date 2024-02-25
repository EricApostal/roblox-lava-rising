import { RenderTimer } from "./app/app";
import { timerProducer } from "./app/stores/timer";

export namespace UIService {
    export function spawnTimer() {
        function timerThread() {
            task.spawn(() => {
                while (true) {
                    wait(1);
                   timerProducer.increment();
                }
            });
        }
        timerThread();
        RenderTimer();
    }
}