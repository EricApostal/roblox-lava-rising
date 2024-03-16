import React from "@rbxts/react";

export function SidebarIcon() {
    return (
        <textbutton
            Size={new UDim2(0, 70, 0, 70)}
            BackgroundColor3={new Color3(1, 1, 1)}
            BackgroundTransparency={0}
            Text={""}
            children={[
                <textlabel
                    Text={"Icon"}
                    Size={new UDim2(1, 0, 1, 0)}
                    BackgroundTransparency={1}
                />,
                <uicorner
                    CornerRadius={new UDim(0, 24)}
                />,
                <uigradient
                    Color={
                        new ColorSequence([
                            new ColorSequenceKeypoint(0, Color3.fromHex("FF9999")),
                            new ColorSequenceKeypoint(1, Color3.fromHex("FD0000")),
                        ])
                    }
                    Rotation={45}
                />,
                <frame
                    Size={new UDim2(0, 70, 0, 70)}
                    BackgroundTransparency={1}
                    children={[
                        <uicorner
                            CornerRadius={new UDim(0, 24)}
                        />,
                        <uistroke
                            Color={Color3.fromRGB(0, 0, 0)} // Black stroke 
                            Thickness={4}
                        />,
                    ]}
                />
            ]}
        />
    )
}
