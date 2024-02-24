import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({tag: "coin"})
export class Coin extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("Model"), "Coin component must be attached to a BasePart");

        // on touch
        (this.instance.FindFirstChild("body") as BasePart)!.Touched.Connect((hit) => {
            if (hit.Parent!.FindFirstChild("Humanoid")) {
                this.instance.Destroy();
            }
        });
    }
}