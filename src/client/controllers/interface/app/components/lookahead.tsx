import React, { useEffect } from "@rbxts/react";
import { RootState, useRootProducer, useRootSelector } from "../store";
import { TweenOptions } from "@rbxts/ripple";
import { useMotion } from "../hooks.ts/use-motion";
import { Events } from "client/network";

export function Lookahead() {
	const producer = useRootProducer();
	const count = useRootSelector((state: RootState) => (state as RootState).lookahead.count);
	const visible = useRootSelector((state: RootState) => (state as RootState).lookahead.visible);

	let startPos = new UDim2(0, -280, 1, -20);

	const [visibility, setVisibility] = useMotion(startPos);

	useEffect(() => {
		setVisibility.tween((visible ? new UDim2(0, 20, 1, -20) : startPos), {time: 0.5, style: Enum.EasingStyle.Quart} as TweenOptions );
	}, [visible]);

	return  (
		<frame
			Size={new UDim2(0, 275, 0, 40)}
			Position={visibility}
			AnchorPoint={new Vector2(0, 1)}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(1, 1, 1)}
			children={[
				<uicorner CornerRadius={new UDim(0, 12)}></uicorner>,
				<textlabel
					Position={new UDim2(0, 12, 0.5, 0)}
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Size={new UDim2(1, 0, 1, 0)}
					Text={`A round is starting!`}
					TextXAlignment={Enum.TextXAlignment.Left}
					FontSize={Enum.FontSize.Size18}
					Font={Enum.Font.GothamBlack}
				/>,
				<uistroke Thickness={4}/>,
				<textbutton
				Position={new UDim2(1, -10, 0.5, 0)}
				Size={new UDim2(0, 70, 1, -10)}
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundColor3={new Color3(0.21, 0.6, 1)}
				BorderSizePixel={0}
				children={[
					<uicorner CornerRadius={new UDim(0, 6)}></uicorner>,
				]}
				Text={"Join"}
				Font={Enum.Font.GothamBlack}
				FontSize={Enum.FontSize.Size18}
				Event={{
					Activated: () => {
						Events.joinRound.fire();
						producer.lookaheadVisible(false);
					}
				}}
				
				/>

			]}
		></frame>
	);
}
