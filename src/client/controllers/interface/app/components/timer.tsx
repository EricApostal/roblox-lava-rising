import React, { StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";

const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
const root = createRoot(new Instance("Folder"));
let timeSetter: Callback

export function Timer() {
	const [time, setTime] = useState(120);
	timeSetter = setTime;
	React.useEffect(() => {
		task.spawn(function() {
			wait(1)
			setTime(time - 1)});
	  }, [time]);
	return (
		<frame
			Size={new UDim2(0, 200, 0, 75)}
			Position={new UDim2(0.5, 0, 0, 0)}
			AnchorPoint={new Vector2(0.5, 0)}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(1, 1, 1)}
			children={[
				<uicorner CornerRadius={new UDim(0, 12)}></uicorner>,
				<textlabel
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0)}
					Text={`${time}`}
					FontSize={Enum.FontSize.Size18}
				/>,
			]}
		></frame>
	);
}
