import { BaseComponent, Component } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { TweenService } from "@rbxts/services";
import { OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";
import { RunService } from "@rbxts/services";

@Component({tag:"moving-platform"})
export class PlatformController extends BaseComponent implements OnStart {

    constructor() {
        super();
    }

    onStart(): void {
        assert(this.instance.IsA("BasePart"), "PlatformController: instance is not a BasePart");
        print("Moving platform raycat init")

        this.instance.Anchored = true;

        let character = game.GetService("Players").LocalPlayer.Character! as Model || game.GetService("Players").LocalPlayer.CharacterAdded.Wait()[0];
        let lastPosition = this.instance.Position;

        let firstPlatformStep = true;
        RunService.Heartbeat.Connect(() => {
            let torso = character.FindFirstChild("LowerTorso") as BasePart;

            if (!this.isOnPlatform(character)) {
                firstPlatformStep = true;
                return;
            }

            let currentPosition = (this.instance as BasePart).Position;
            let delta = currentPosition.sub(lastPosition);

            if (character && torso) {
                if (firstPlatformStep) {
                    let newCFrame = torso.CFrame.add(delta.mul(0.1));
                    // torso.CFrame = newCFrame;
                    const tweenInfo = new TweenInfo(0.1);
                    const pos = TweenService.Create(torso, tweenInfo, {"CFrame": newCFrame});
                    pos.Play();
                    firstPlatformStep = false;
                } else {
                    let newCFrame = torso.CFrame.add(delta);
                    torso.CFrame = newCFrame;
                    firstPlatformStep = false;
                }
            }

            lastPosition = currentPosition;
        })
    }

    lastCast: BasePart | undefined;
    castFrames = 0;
    private isOnPlatform(character: Model) {
        let torso = character.FindFirstChild("LowerTorso") as BasePart
        let rayOrigin = torso.Position;
        let rayDirection = new Vector3(0, -15, 0);
        let params = new RaycastParams();
        params.FilterType = Enum.RaycastFilterType.Exclude;
        params.FilterDescendantsInstances = [character];

        let raycastResult = game.Workspace.Raycast(rayOrigin, rayDirection, params);
        if (!raycastResult) return false;
        if (this.lastCast === raycastResult!.Instance) {
            this.castFrames++;
        } else {
            this.castFrames = 0;
        
        }
        this.lastCast = raycastResult!.Instance;

        // if (this.castFrames < 10) {
        //     return false;
        // }

        return raycastResult?.Instance === this.instance;
    }
}