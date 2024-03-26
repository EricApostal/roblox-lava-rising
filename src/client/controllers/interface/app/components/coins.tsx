import React from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { RootState, useRootProducer, useRootSelector } from "../store";

export function CoinCounter() {
    const producer = useRootProducer();
    const count = useRootSelector((state: RootState) => (state as RootState).coins.count);

    return (
        <frame
            Size={new UDim2(0, 200, 0, 75)}
            Position={new UDim2(1, -20, 1, -20)}
            AnchorPoint={new Vector2(1, 1)}
            BorderSizePixel={0}
            BackgroundTransparency={0}
            BackgroundColor3={new Color3(1, 1, 1)}
            children={[
                <imagelabel
                    Image={"rbxassetid://16767840840"}
                    Size={new UDim2(0, 70, 0, 70)}
                    BackgroundTransparency={1}
                />,
                <textlabel
                    // Position={new UDim2(1, -50, 0.5, 10)}
                    AnchorPoint={new Vector2(1, 0.7)}
                    Text={`${count}`}
                    BorderSizePixel={0}
                    BackgroundTransparency={1}
                    Size={new UDim2(0, 110, 0, 100)}
                    FontSize={Enum.FontSize.Size48}
                    Font={Enum.Font.LuckiestGuy}
                    TextColor3={new Color3(0, 0, 0)}
                    children={[
                        <uipadding
                            PaddingTop={new UDim(0, 20)}
                        />
                    ]}
                />,
                <uilistlayout
                    FillDirection={Enum.FillDirection.Horizontal}
                    HorizontalAlignment={Enum.HorizontalAlignment.Center}
                    VerticalAlignment={Enum.VerticalAlignment.Center}
                />,
                <uicorner
                    CornerRadius={new UDim(0, 24)}
                />,
                <uistroke
                    Color={Color3.fromRGB(0, 0, 0)} // Black stroke 
                    Thickness={6}
                />
            ]}
        ></frame>
    );
}
