import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnGameStarted } from "shared/components/game/scheduler";
import { ReplicatedStorage } from "@rbxts/services";
import { Config } from "shared/components/game/config";

@Component({tag: "coin-spawn"})
export class CoinSpawn extends BaseComponent implements OnStart {
    coin: Model;
    coinExists: boolean = false;

    constructor() {
        super();
        this.coin = ReplicatedStorage.FindFirstChild("assets")!.WaitForChild("coin") as Model;
    }

    onStart(): void {
        assert (this.instance.IsA("BasePart"), "CoinSpawn component must be attached to a BasePart");
        
        this.instance.Anchored = true;
        this.instance.CanCollide = false;
        this.instance.Transparency = 1;

        this.spawnCoin();

        (this.coin.FindFirstChild("body")! as BasePart).Touched.Connect((hit) => {
            if (hit.Parent!.FindFirstChild("Humanoid")) {
                if (!this.coinExists) return;
                this.coinExists = false;
                wait(Config.coinRespawnTime);
                this.spawnCoin();
            }
        });
    }

    private spawnCoin() {
        assert (this.instance.IsA("BasePart"), "CoinSpawn component must be attached to a BasePart");
        
        this.coin = ReplicatedStorage.FindFirstChild("assets")!.WaitForChild("coin").Clone() as Model;
        this.coin.Parent = game.Workspace;
        this.coin.MoveTo(this.instance.Position.add(new Vector3(0, 2, 0)));
        this.coinExists = true;
    }
}