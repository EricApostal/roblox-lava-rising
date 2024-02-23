const camera = game.GetService("Workspace").WaitForChild("Camera") as Camera;
const player = game.GetService("Players").LocalPlayer;

function initCameraTick() {
	const rootPart = player.Character!.WaitForChild("HumanoidRootPart") as BasePart;
	game.GetService("RunService").RenderStepped.Connect(function (dt: number) {
		camera.CFrame = new CFrame(rootPart.Position.add(new Vector3(0, 5, 40))).mul(CFrame.Angles(-0.05, 0, 0));
	});
}

player.CharacterAdded.Connect(function () {
	camera!.CameraType = Enum.CameraType.Scriptable;
	camera!.FieldOfView = 40;
	initCameraTick();
});
