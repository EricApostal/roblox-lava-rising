import { BaseComponent } from "@flamework/components";
import { Controller } from "@flamework/core";
import { OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";

const camera = game.GetService("Workspace").WaitForChild("Camera") as Camera;
const player = game.GetService("Players").LocalPlayer;

const TweenService = game.GetService("TweenService")

const updateThreshhold = 1;

function initCameraTick() {
	const rootPart = player.Character!.WaitForChild("HumanoidRootPart") as BasePart;

	task.spawn(function(){
		while ((player.Character && player.Character.FindFirstChild("Humanoid") && (player.Character.FindFirstChild("Humanoid") as Humanoid).Health > 0)) {
			let newCFrame = new CFrame(rootPart.Position.add(new Vector3(0, 5, 40))).mul(CFrame.Angles(-0.05, 0, 0));
			let goal = {"CFrame": newCFrame}
			const tween = TweenService.Create(camera, new TweenInfo(updateThreshhold), goal);
			tween.Play();
			wait(0.1);
		}
	})
}

@Controller()
export class CameraController extends BaseComponent implements OnLocalCharacterLoaded {
	onLocalCharacterLoaded(character: Model) {
		camera!.CameraType = Enum.CameraType.Scriptable;
		camera!.FieldOfView = 40;
		initCameraTick();
	}
}