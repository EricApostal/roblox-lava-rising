import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnLavaRising } from "server/services/scheduler";

@Component({tag: "lava"})
export class Lava extends BaseComponent implements OnStart, OnLavaRising {
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("BasePart"), "Coin component must be attached to a BasePart");

        (this.instance.Touched.Connect((hit) => {
            if (hit.Parent!.FindFirstChild("Humanoid")) {
                this.instance.Destroy();
            }
        }));
    }

    onLavaRising(): void {
        assert(this.instance.IsA("BasePart"), "Coin component must be attached to a BasePart");
        while (true) {
            this.instance.Position = new Vector3(this.instance.Position.X, this.instance.Position.Y + 1, this.instance.Position.Z);
        }
    }
}