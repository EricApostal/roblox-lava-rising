import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Events } from "server/network";
import { Players } from "@rbxts/services";
import { DatastoreService } from "server/services/data/datastore";
 
@Component({tag: "coin"})
export class Coin extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("Model"), "Coin component must be attached to a Model");

        (this.instance.FindFirstChild("body") as BasePart)!.Touched.Connect((hit) => {
            let humanoid = hit.Parent!.FindFirstChild("Humanoid")
            if (humanoid) {
                this.instance.Destroy();
                let playerObj = ( Players.GetPlayerFromCharacter(humanoid.Parent) as Player)
                DatastoreService.incrementCoins(playerObj, 1)
                let currentPlayerCoins = DatastoreService.getCoins(playerObj)
                Events.coinPickup.fire(playerObj, 1, currentPlayerCoins)
            }
        });
    }
}