import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";

@Component({tag: "coin"})
export class Coin extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("Model"), "Coin component must be attached to a BasePart");

        while (this.instance.PrimaryPart !== undefined) {
	        this.instance.PivotTo(this.instance.PrimaryPart!.CFrame.mul(CFrame.fromEulerAnglesXYZ(0, .1, 0)));
	        wait();
        }
    }
}