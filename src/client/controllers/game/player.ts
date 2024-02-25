import { Players } from "@rbxts/services";
import { UIService } from "../interface/handler";
import { Config } from "shared/components/game/config";

Players.LocalPlayer.CharacterAdded.Connect((char) => {
    UIService.remount();
})