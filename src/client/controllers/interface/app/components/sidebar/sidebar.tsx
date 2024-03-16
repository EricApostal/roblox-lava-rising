import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { RootState, useRootProducer, useRootSelector } from "../../store";
import { SidebarIcon } from "./icon";

export function Sidebar() {
    const visible = useRootSelector((state: RootState) => (state as RootState).lookahead.visible);

    return (
        <frame
            Size={new UDim2(0, 40, 0, 300)}
            Position={new UDim2(0, 40, 0.5, 0)}
            AnchorPoint={new Vector2(0, 0.5)}
            BorderSizePixel={0}
            BackgroundTransparency={1}
            children={[
                <uilistlayout
                    FillDirection={Enum.FillDirection.Vertical}
                    HorizontalAlignment={Enum.HorizontalAlignment.Center}
                    VerticalAlignment={Enum.VerticalAlignment.Center}
                    SortOrder={Enum.SortOrder.LayoutOrder}
                    Padding={new UDim(0, 16)}
                />,
                <SidebarIcon />,
                <SidebarIcon />,

            ]}
        ></frame>
    )
}
