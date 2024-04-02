import { Players } from "@rbxts/services";
import { Config } from "shared/components/game/config";
import { Controller, OnStart } from "@flamework/core";
import { BaseComponent, Component } from "@flamework/components";
import { OnGameStarted } from "shared/components/game/scheduler";
import { TweenService } from "@rbxts/services";

const timeBetweenMovements = 0;

@Component({tag:"moving-platform"})
export class MovingPlatform extends BaseComponent implements OnStart, OnGameStarted {
    onStart(): void {
        assert(this.instance.IsA("BasePart"), "MovingPlatform component must be attached to a BasePart")
        
        const distance = this.instance.GetAttribute("distance") ? (this.instance.GetAttribute("distance") as number): 30;
        const speed = (this.instance.GetAttribute("speed") ? (this.instance.GetAttribute("speed") as number): 1) / 3;
        
        const updateThreshhold = 1 / speed;
        const tweenInfo = new TweenInfo(updateThreshhold, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

        const platform = this.instance as BasePart;
        const startPosition = platform.Position;
        const endPosition = {"Position": startPosition.add(new Vector3(distance, 0, 0))};
        if (this.instance.GetTags().includes("vertical-moving-platform")) {
            endPosition["Position"] = startPosition.add(new Vector3(0, distance, 0));
        }

        while (true) {
            const tween = TweenService.Create(platform, tweenInfo, endPosition);
			tween.Play();
            wait(updateThreshhold + timeBetweenMovements + 0.1);
            const tweenBack = TweenService.Create(platform, tweenInfo, {"Position": startPosition});
            tweenBack.Play();
            wait(updateThreshhold + timeBetweenMovements + 0.1);
        }
    }

    onGameStarted(players: Player[], gameLength: number): void {

    }
}

@Component({tag:"vertical-moving-platform"})
export class VerticalMovingPlatform extends MovingPlatform {
    constructor() {
        super();
    }
}