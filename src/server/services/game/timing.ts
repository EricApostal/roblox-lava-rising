import { Config } from "shared/components/game/config";
import { RoundManager } from "./round";
import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";

@Service()
export class RoundService extends BaseComponent implements OnStart {
    onStart() {
        wait(5);
        while (true) {
            print("Starting round in loop...")
            RoundManager.startRound();
            wait(Config.roundLength)
            print("Ending round in loop...")
            RoundManager.endRound();
            wait(1);
        }
    }
}