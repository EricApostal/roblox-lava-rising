import { Players } from "@rbxts/services";
import { UIService } from "../interface/handler";

Players.LocalPlayer.CharacterAdded.Connect((char) => {
    // UIService.spawnTimer();
})