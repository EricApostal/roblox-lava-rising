import React, { StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Timer } from "./components/timer";

const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));

const root = createRoot(new Instance("Folder"));

function App() {
	return <Timer />;
}

export function RenderTimer() {
	root.render(<StrictMode>{createPortal(<App />, playerGui)}</StrictMode>);
}
