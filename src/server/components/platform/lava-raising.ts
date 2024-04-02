import { Players } from "@rbxts/services";
import { Config } from "shared/components/game/config";
import { Controller, OnStart } from "@flamework/core";
import { BaseComponent, Component } from "@flamework/components";
import { OnGameStarted } from "shared/components/game/scheduler";
import { TweenService } from "@rbxts/services";

const updateThreshhold = 1;
const timeBetweenMovements = 1;
const tweenInfo = new TweenInfo(updateThreshhold, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut);

@Component({tag:"lava-raising-platform"})
export class MovingPlatform extends BaseComponent implements OnStart {
    onStart(): void {
        let primaryPart;
        if (this.instance.IsA("BasePart")) primaryPart = this.instance;
        if (this.instance.IsA("Model")) primaryPart = this.instance.PrimaryPart;
        if (!primaryPart) return;

        const platform = primaryPart;
        const distance = this.instance.GetAttribute("distance") ? (this.instance.GetAttribute("distance") as number): 30;
        const startSize = platform.Size;
        const endSize = {"Size": startSize.add(new Vector3(0, distance, 0)), "CFrame": platform.CFrame.add(new Vector3(0, distance/2, 0))};

        let time_offset = this.instance.GetAttribute("time_offset") as number;  

        while (true) {
            wait(time_offset);
            const tween = TweenService.Create(platform, tweenInfo, endSize);
			tween.Play();
            wait(updateThreshhold + timeBetweenMovements + 0.1);
            const tweenBack = TweenService.Create(platform, tweenInfo, {"Size": startSize, "CFrame": platform.CFrame.add(new Vector3(0, -distance/2, 0))});
            tweenBack.Play();
            wait(updateThreshhold + timeBetweenMovements + 0.1);
        }
    }
}