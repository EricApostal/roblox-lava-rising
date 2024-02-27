import React from "@rbxts/react";
import { RootState, useRootProducer, useRootSelector } from "../store";

export function Lookahead() {
	const producer = useRootProducer();
	const count = useRootSelector((state: RootState) => (state as RootState).lookahead.count);
	const visible = useRootSelector((state: RootState) => (state as RootState).lookahead.visible);

	
	return visible ? (
		<frame
			Size={new UDim2(0, 200, 0, 75)}
			Position={new UDim2(0, 0, 1, -10)}
			AnchorPoint={new Vector2(0.5, 0)}
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
	): <frame/>;
}
