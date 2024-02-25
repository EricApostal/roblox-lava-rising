import { BaseComponent } from "@flamework/components";
import { UIService } from "../interface/handler";
import { OnGameStarted } from "shared/components/game/scheduler";

export class RoundService extends BaseComponent implements OnGameStarted {
    onGameStarted(): void {
        UIService.spawnTimer();
    }
}