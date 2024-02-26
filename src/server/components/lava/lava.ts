import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnLavaRising } from "shared/components/game/scheduler";

@Component({tag: "lava"})
export class Lava extends BaseComponent implements OnStart, OnLavaRising {
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("BasePart"), "Coin component must be attached to a BasePart");
        this.instance.Anchored = true;
    }

    onLavaRising(): void {
        // print("Lava is rising");
        // assert(this.instance.IsA("BasePart"), "Coin component must be attached to a BasePart");
        // while (true) {
        //     this.instance.Size = this.instance.Size.add(new Vector3(0, 0.01, 0));
        //     wait(0.1);
        // }
    }
}