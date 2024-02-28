import { Players } from "@rbxts/services";
import { UIService } from "../interface/handler";
import { Config } from "shared/components/game/config";
import { Controller } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { OnLocalCharacterLoaded } from "shared/components/game/scheduler";

// Players.LocalPlayer.CharacterAdded.Connect((char) => {
//     UIService.remount();
// })

@Controller()
export class CharacterController extends BaseComponent implements OnLocalCharacterLoaded {
    onLocalCharacterLoaded() {
        Players.LocalPlayer.WaitForChild("PlayerGui").WaitForChild("ScreenGui");
        UIService.remount();
    }
}