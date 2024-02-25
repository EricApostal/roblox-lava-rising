import { BaseComponent } from "@flamework/components";
import { Controller } from "@flamework/core";
import { OnCharacterLoaded } from "./signals";
import { TweenService } from "@rbxts/services";

@Controller()
export class CameraController extends BaseComponent implements OnCharacterLoaded {

    constructor() {
        super();
    }

	onCharacterLoaded(character: Model) {
	}

}