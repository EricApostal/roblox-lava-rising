import React, { useEffect } from "@rbxts/react";
import { RootState, useRootProducer, useRootSelector } from "../store";
import Ripple, { createMotion, Motion, MotionGoal, TweenOptions } from "@rbxts/ripple";
import { useMotion } from "../hooks.ts/use-motion";

export function Lookahead() {
	const producer = useRootProducer();
	const count = useRootSelector((state: RootState) => (state as RootState).lookahead.count);
	const visible = useRootSelector((state: RootState) => (state as RootState).lookahead.visible);

	const selectVisibility = (state: RootState) => state.lookahead.visible;

	const [visibility, setVisibility] = useMotion(new UDim2(0, -250, 1, 0));

	useEffect(() => {
		setVisibility.tween((visible ? new UDim2(0, 0, 1, 0) : new UDim2(0, -250, 1, 0)), {time: 0.5, style: Enum.EasingStyle.Quart} as TweenOptions )
	}, [visibility])

	return  (
		<frame
			Size={new UDim2(0, 200, 0, 75)}
			Position={visibility}
			AnchorPoint={new Vector2(0, 1)}
			BorderSizePixel={0}
			BackgroundColor3={new Color3(1, 1, 1)}
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
