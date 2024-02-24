import React, { StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Timer } from "./components/timer";
import { ReflexProvider } from "@rbxts/react-reflex";
import { timerProducer } from "./state";

const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));

const root = createRoot(new Instance("Folder"));

function App() {
	return <Timer />;
}

export function RenderTimer() {
	print("Rendering timer");
	root.render(
		<StrictMode>
			<ReflexProvider producer={timerProducer}>
				{createPortal(<App />, playerGui)}
			</ReflexProvider>
		</StrictMode>);
}
