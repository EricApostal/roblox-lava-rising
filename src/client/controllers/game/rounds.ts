import { BaseComponent } from "@flamework/components";
import { UIService } from "../interface/handler";
import { OnGameEnded, OnGameStarted, OnLookAhead } from "shared/components/game/scheduler";
import { Controller } from "@flamework/core";
import { Config } from "shared/components/game/config";

@Controller()
export class RoundService extends BaseComponent implements OnGameStarted, OnGameEnded, OnLookAhead {
    onGameStarted(): void {
        UIService.spawnTimer(Config.roundLength);
        UIService.showTimer();
    }

    onGameEnded(): void {
        UIService.hideTimer();
        print("Game ended!")
    }

    onLookAhead(lookAhead: number): void {
        UIService.setLookahead(lookAhead);
        UIService.showLookahead();
        wait(lookAhead);
        UIService.hideLookahead();
    }

}