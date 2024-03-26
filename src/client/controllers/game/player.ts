import { Players } from "@rbxts/services";
import { UIService } from "../interface/handler";
import { Controller, OnStart } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { OnLocalCharacterLoaded } from "shared/components/game/scheduler";

@Controller()
export class CharacterController extends BaseComponent implements OnLocalCharacterLoaded, OnStart {
    onLocalCharacterLoaded() {
        // WARNING: This may not call initially on some devices. Proceed with caution.
        UIService.remount();
    }

    onStart(): void {
        Players.LocalPlayer.WaitForChild("PlayerGui");
        UIService.remount();
    }
}