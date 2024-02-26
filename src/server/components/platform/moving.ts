import { Players } from "@rbxts/services";
import { Config } from "shared/components/game/config";
import { Controller, OnStart } from "@flamework/core";
import { BaseComponent, Component } from "@flamework/components";
import { OnGameStarted } from "shared/components/game/scheduler";
import { TweenService } from "@rbxts/services";

const distance = 30;
const updateThreshhold = 1;
const timeBetweenMovements = 0;
const tweenInfo = new TweenInfo(updateThreshhold, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

@Component({tag:"moving-platform"})
export class MovingPlatform extends BaseComponent implements OnStart, OnGameStarted {
    onStart(): void {
        assert(this.instance.IsA("BasePart"), "MovingPlatform component must be attached to a BasePart")

        const platform = this.instance as BasePart;
        const startPosition = platform.Position;
        const endPosition = {"Position": startPosition.add(new Vector3(distance, 0, 0))};

        while (true) {
            const tween = TweenService.Create(platform, tweenInfo, endPosition);
			tween.Play();
            wait(updateThreshhold + timeBetweenMovements + 0.1);
            const tweenBack = TweenService.Create(platform, tweenInfo, {"Position": startPosition});
            tweenBack.Play();
            wait(updateThreshhold + timeBetweenMovements + 0.1);
        }
    }

    onGameStarted(gameLength: number): void {

    }
}