import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnGameStarted } from "server/services/scheduler";
import { ReplicatedStorage } from "@rbxts/services";

@Component({tag: "coin-spawn"})
export class CoinSpawn extends BaseComponent implements OnGameStarted {
    constructor() {
        super();
    }

    onGameStarted(): void {
        if (!this.instance.IsA("BasePart")) return;

        let coin: Model = ReplicatedStorage.FindFirstChild("assets")!.WaitForChild("coin").Clone() as Model;
        coin.Parent = game.Workspace;
        coin.MoveTo(this.instance.Position.add(new Vector3(0, 2, 0)));
    }
}