import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({tag: "kill-brick"})
export class KillBrick extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("BasePart"), "Coin component must be attached to a BasePart");

        let debounce = false
        let cooldown = 2
        
        this.instance.Touched.Connect(function(hit: BasePart) {
            if (hit.Parent!.FindFirstChild("Humanoid")) {
                if (!debounce) {
                    debounce = true;
                    ((hit.Parent! as BasePart).FindFirstChild("Humanoid") as Humanoid)!.Health = 0
                    wait(cooldown)
                    debounce = false
                }
            }
        });
    }
}