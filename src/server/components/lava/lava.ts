import { BaseComponent, Component } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { OnGameEnded, OnLavaRising } from "shared/components/game/scheduler";

@Component({tag: "lava"})
export class Lava extends BaseComponent implements OnStart, OnLavaRising, OnGameEnded {
    lavaRisingThread: thread | undefined;
    startSize: Vector3 | undefined;

    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("BasePart"), "Lava component must be attached to a BasePart");

        this.startSize = this.instance.Size;
        this.instance.Anchored = true;

        this.killListener();
    }

    private killListener() {
        assert(this.instance.IsA("BasePart"), "Lava component must be attached to a BasePart");

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

    private lavaThread() {
        assert(this.instance.IsA("BasePart"), "Coin component must be attached to a BasePart");

        while (true) {
            this.instance.Size = this.instance.Size.add(new Vector3(0, 0.01, 0));
            this.instance.Position = this.instance.Position.add(new Vector3(0, 0.01, 0));
            wait(0.1);
        }
    }

    onLavaRising(): void {
        assert(this.instance.IsA("BasePart"), "Lava component must be attached to a BasePart");
        print("Lava is rising");

        this.instance.Size = this.startSize!;
        this.lavaRisingThread = task.spawn(() => {this.lavaThread()});
    }

    onGameEnded(players: Player[]): void {
        if (this.lavaRisingThread) {
            task.cancel(this.lavaRisingThread);
        }
    }
}