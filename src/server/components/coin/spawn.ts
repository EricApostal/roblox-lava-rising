import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnGameStarted } from "shared/components/game/scheduler";
import { ReplicatedStorage } from "@rbxts/services";

@Component({tag: "coin-spawn"})
export class CoinSpawn extends BaseComponent implements OnGameStarted, OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        assert (this.instance.IsA("BasePart"), "CoinSpawn component must be attached to a BasePart");
        
        this.instance.Anchored = true;
        this.instance.CanCollide = false;
        this.instance.Transparency = 1;
    }

    onGameStarted(): void {
        print("on game start call server")
        assert (this.instance.IsA("BasePart"), "CoinSpawn component must be attached to a BasePart");

        let coin: Model = ReplicatedStorage.FindFirstChild("assets")!.WaitForChild("coin").Clone() as Model;
        coin.Parent = game.Workspace;
        coin.MoveTo(this.instance.Position.add(new Vector3(0, 2, 0)));
    }
}