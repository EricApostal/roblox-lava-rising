import { BaseComponent } from "@flamework/components";
import { Controller } from "@flamework/core";
import { TweenService } from "@rbxts/services";
import { OnPlayerCharacterLoaded } from "shared/components/game/scheduler";

@Controller()
export class CameraController extends BaseComponent implements OnPlayerCharacterLoaded {

    constructor() {
        super();
    }

	onPlayerCharacterLoaded(player: Player, character: Model) {
        print("Player character loaded")
	}

}