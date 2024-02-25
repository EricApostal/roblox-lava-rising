import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnGameStarted } from "shared/components/game/scheduler";

print("test file")

@Component({tag: "coin-spawn"})
export class Test extends BaseComponent implements OnStart, OnGameStarted {
    constructor() {
        super();
    }

    onStart(): void {
        print("on start moment")
    }

    onGameStarted(): void {
        print("Game started (scheduler works :D)");
    }
}