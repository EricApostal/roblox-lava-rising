import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { RootState, useRootProducer, useRootSelector } from "../../store";

export function SidebarIcon() {
    const producer = useRootProducer();
    let count = useRootSelector((state: RootState) => (state as RootState).lookahead.count);
    const visible = useRootSelector((state: RootState) => (state as RootState).lookahead.visible);

    return (
        <frame
            Size={new UDim2(0, 70, 0, 70)}
            BackgroundColor3={new Color3(1, 1, 1)}
            children={[
                <textlabel
                    Text={"Icon"}
                    Size={new UDim2(1, 0, 1, 0)}
                    BackgroundTransparency={1}
                />,
                <uicorner
                    CornerRadius={new UDim(0, 22)}
                />,
                <uistroke
                    Thickness={4}
                />
            ]}

        ></frame>
    )
}
