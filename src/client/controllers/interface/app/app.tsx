import React, { StrictMode, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { Timer } from "./components/timer";
import { Lookahead } from "./components/lookahead";
import { ReflexProvider } from "@rbxts/react-reflex";
import { producer } from "./store";
import { Sidebar } from "./components/sidebar/sidebar";
import { CoinCounter } from "./components/coins";

const root = createRoot(new Instance("Folder"));

function App() {
	return <frame
		Size={new UDim2(1, 0, 1, 0)}
		Transparency={1}>
		<Timer />
		<Lookahead />
		<Sidebar />
		<CoinCounter />
	</frame>;
}
export function renderApp() {
	// Don't forget to manually make it visible!
	const playerGui = new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui"));
	root.render(
		<StrictMode>
			<ReflexProvider producer={producer}>
				{createPortal(<App />, playerGui)}
			</ReflexProvider>
		</StrictMode>);
}
