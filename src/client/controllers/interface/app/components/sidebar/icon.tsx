import React, { useState } from "@rbxts/react";
import { useMotion } from "../../hooks/use-motion";

interface SidebarIconProps {
    iconId: string;
    gradientStart: Color3;
    gradientEnd: Color3;
}

export function SidebarIcon(props: SidebarIconProps) {
    let startSize = new UDim2(0, 80, 0, 80);
    let endSize = new UDim2(0, 90, 0, 90);

    const [size, setSize] = useMotion(startSize);
    const [iconRotation, setIconRotation] = useMotion(0);

    const [currentRotation, setCurrentRotation] = useState(1);

    const handleMouseEnter = () => {
        setSize.tween(endSize, { time: 0.2, style: Enum.EasingStyle.Quart });
    }

    const handleMouseLeave = () => {
        setSize.tween(startSize, { time: 0.2, style: Enum.EasingStyle.Quart });
    }

    const handleMouseClick = () => {
        setCurrentRotation(currentRotation + 1);
        setIconRotation.tween(currentRotation * 360, { time: 0.5, style: Enum.EasingStyle.Quart });
    }

    return (
        <textbutton
            Size={size}
            BackgroundColor3={new Color3(1, 1, 1)}
            BackgroundTransparency={0}
            Text={""}
            Event={{
                MouseEnter: handleMouseEnter,
                MouseLeave: handleMouseLeave,
                MouseButton1Click: handleMouseClick
            }}
            children={[
                <imagelabel
                    Image={`rbxassetid://${props.iconId}`} // 16672314355
                    Size={new UDim2(0, 50, 0, 50)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    BackgroundTransparency={1}
                    Rotation={iconRotation}
                />,
                <uicorner
                    CornerRadius={new UDim(0, 24)}
                />,
                <uigradient
                    Color={
                        new ColorSequence([
                            new ColorSequenceKeypoint(0, props.gradientStart),
                            new ColorSequenceKeypoint(1, props.gradientEnd),
                        ])
                    }
                    Rotation={45}
                />,
                <frame
                    Size={size}
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
    );
}
