import React from "@rbxts/react";
import { createRoot } from "@rbxts/react-roblox";

import { useRootProducer, useRootSelector, RootState } from "../stores/timer";

const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
const root = createRoot(new Instance("Folder"));

export function Timer() {
	const producer = useRootProducer();
	const count = useRootSelector((state: RootState) => (state as RootState).count);

	task.spawn(function() {
		wait(1)
		producer.increment()
	});

	return (
		<frame
			Size={new UDim2(0, 200, 0, 75)}
			Position={new UDim2(0.5, 0, 0, 0)}
			AnchorPoint={new Vector2(0.5, 0)}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(1, 1, 1)}
			Event={{
			}}
			children={[
				<uicorner CornerRadius={new UDim(0, 12)}></uicorner>,
				<textlabel
					Position={new UDim2(0.5, 0, 0.5, 0)}
					AnchorPoint={new Vector2(0.5, 0)}
					Text={`${count}`}
					FontSize={Enum.FontSize.Size18}
				/>,
			]}
		></frame>
	);
}
