import React, { StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";

const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));

const root = createRoot(new Instance("Folder"));

function App() {
	const [count, setCount] = useState(0);

	return (
		<textbutton
			Text={`Count: ${count}`}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Event={{
				Activated: () => setCount(count + 1),
			}}
		></textbutton>
	);
}

root.render(<StrictMode>{createPortal(<App />, playerGui)}</StrictMode>);
