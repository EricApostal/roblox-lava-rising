import React, { StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Timer } from "./components/timer";
import { ReflexProvider } from "@rbxts/react-reflex";
import { timerProducer } from "./stores/timer";

const root = createRoot(new Instance("Folder"));

function App() {
	return <Timer />;
}

export function renderTimer() {
	print("Rendering timer");
	// Don't forget to manually make it visible!
	const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
	root.render(
		<StrictMode>
			<ReflexProvider producer={timerProducer}>
				{createPortal(<App />, playerGui)}
			</ReflexProvider>
		</StrictMode>);
}
