import { BaseComponent } from "@flamework/components";
import { UIService } from "../interface/handler";
import { OnGameEnded, OnGameStarted } from "shared/components/game/scheduler";
import { Controller } from "@flamework/core";
import { Config } from "shared/components/game/config";

@Controller()
export class RoundService extends BaseComponent implements OnGameStarted, OnGameEnded {
    onGameStarted(): void {
        UIService.spawnTimer(Config.gameLength);
        UIService.showTimer();
    }

    onGameEnded(): void {
        UIService.hideTimer();
        print("Game ended!")
    }

}