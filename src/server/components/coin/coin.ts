import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { Players } from "@rbxts/services";
import { DatastoreService } from "server/services/data/datastore";
 
@Component({tag: "coin"})
export class Coin extends BaseComponent implements OnStart {
    hit: boolean = false;
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("Model"), "Coin component must be attached to a Model");

        (this.instance.FindFirstChild("body") as BasePart)!.Touched.Connect((hit) => {
            if (this.hit) return;

            let humanoid = hit.Parent!.FindFirstChild("Humanoid");
            if (humanoid) {
                this.hit = true;
                // tween coin size
                let tween = game.GetService("TweenService").Create((this.instance as Model).WaitForChild("body") as MeshPart, new TweenInfo(0.1, Enum.EasingStyle.Linear, Enum.EasingDirection.In), {Size: new Vector3(0, 0, 0)})
                tween.Play()
                wait(0.5);
                this.instance.Destroy();
                let playerObj = ( Players.GetPlayerFromCharacter(humanoid.Parent) as Player)
                DatastoreService.incrementCoins(playerObj, 1)
                let currentPlayerCoins = DatastoreService.getCoins(playerObj)
                Events.coinPickup.fire(playerObj, 1, currentPlayerCoins)
            }
        });
    }
}