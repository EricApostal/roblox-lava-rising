import { Players } from "@rbxts/services";
import { UIService } from "../interface/handler";
import { Config } from "shared/components/game/config";
import { Controller } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { OnCharacterLoaded } from "../player/signals";

// Players.LocalPlayer.CharacterAdded.Connect((char) => {
//     UIService.remount();
// })

@Controller()
export class CharacterController extends BaseComponent implements OnCharacterLoaded {
    onCharacterLoaded() {
        UIService.remount();
    }
}