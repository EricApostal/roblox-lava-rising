// import { BaseComponent, Component } from "@flamework/components";
// import { Controller, OnStart } from "@flamework/core";
// import { TweenService } from "@rbxts/services";
// import { OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";
// import { RunService, Players } from "@rbxts/services";

// @Component({tag:"moving-platform"})
// export class PlatformController extends BaseComponent implements OnStart {

//     constructor() {
//         super();
//     }

//     onStart(): void {
//         assert(this.instance.IsA("BasePart"), "PlatformController: instance is not a BasePart");
        
//         this.instance.Anchored = true;

//         // on character added
//         Players.PlayerAdded.Connect((player) => {
//             player.CharacterAdded.Connect((character) => {
//                 let lastPosition = (this.instance as BasePart).Position;
        
//                 RunService.Heartbeat.Connect(() => {
//                     let torso = character.FindFirstChild("LowerTorso") as BasePart
        
//                     if (!this.isOnPlatform(character)) return;
        
//                     let currentPosition = (this.instance as BasePart).Position;
//                     let delta = currentPosition.sub(lastPosition);
        
//                     if (character && torso) {
//                         torso.CFrame = torso.CFrame.add(delta);
//                     }
                    
//                     lastPosition = currentPosition;
//                 })
//             })
//         })
//     }

//     lastCast: BasePart | undefined;
//     castFrames = 0;
//     private isOnPlatform(character: Model) {
//         let torso = character.FindFirstChild("LowerTorso") as BasePart
//         let rayOrigin = torso.Position;
//         let rayDirection = new Vector3(0, -15, 0);
//         let params = new RaycastParams();
//         params.FilterType = Enum.RaycastFilterType.Exclude;
//         params.FilterDescendantsInstances = [character];

//         let raycastResult = game.Workspace.Raycast(rayOrigin, rayDirection, params);
//         if (this.lastCast === raycastResult!.Instance) {
//             this.castFrames++;
//         } else {
//             this.castFrames = 0;
        
//         }
//         this.lastCast = raycastResult!.Instance;

//         // if (this.castFrames < 10) {
//         //     return false;
//         // }

//         return raycastResult?.Instance === this.instance;
//     }
// }