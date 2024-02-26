import { BaseComponent } from "@flamework/components";
import { Controller } from "@flamework/core";
import { OnGameEnded, OnGameStarted, OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";

const camera = game.GetService("Workspace").WaitForChild("Camera") as Camera;
const player = game.GetService("Players").LocalPlayer;

const TweenService = game.GetService("TweenService")

const updateThreshhold = 1;

namespace CameraTick {
	let cameraFollowing: boolean = false;
	let initialized = false

	export function init() {
		if (initialized) return;
		initialized = true;
		const rootPart = player.Character!.WaitForChild("HumanoidRootPart") as BasePart;
	
		task.spawn(function(){
			while ((player.Character && player.Character.FindFirstChild("Humanoid") && (player.Character.FindFirstChild("Humanoid") as Humanoid).Health > 0)) {
				if (cameraFollowing) {
					let newCFrame = new CFrame(rootPart.Position.add(new Vector3(0, 5, 40))).mul(CFrame.Angles(-0.05, 0, 0));
					let goal = {"CFrame": newCFrame}
					const tween = TweenService.Create(camera, new TweenInfo(updateThreshhold), goal);
					tween.Play();	
				}
				wait(0.1);
			}
		})
	}

	export function startFollowing() {
		cameraFollowing = true;
	}

	export function stopFollowing() {
		cameraFollowing = false;
	}


}

@Controller()
export class CameraController extends BaseComponent implements OnGameStarted, OnGameEnded, OnLocalCharacterLoaded {
	onGameStarted() {
		camera!.CameraType = Enum.CameraType.Scriptable;
		camera!.FieldOfView = 40;
		CameraTick.init();
		CameraTick.startFollowing();

	}

	onGameEnded(): void {
		CameraTick.stopFollowing();
		camera!.CameraType = Enum.CameraType.Custom;
		camera!.FieldOfView = 70;
	}

	onLocalCharacterLoaded(): void {
		CameraTick.stopFollowing();
		camera!.CameraType = Enum.CameraType.Custom;
		camera!.CameraSubject = player.Character!.WaitForChild("Humanoid") as Humanoid;
		camera!.FieldOfView = 70;
	}
	
}