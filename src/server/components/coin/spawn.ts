import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnGameStarted } from "server/services/scheduler";

@Component({tag: "coin-spawn"})
export class CoinSpawn extends BaseComponent implements OnGameStarted {
    constructor() {
        super();
    }

    onGameStarted(): void {
        
    }
}