import { BaseComponent } from "@flamework/components";
import { Controller } from "@flamework/core";
import { TweenService } from "@rbxts/services";
import { OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";

@Controller()
export class CameraController extends BaseComponent implements OnLocalCharacterLoaded {

    constructor() {
        super();
    }
    
    onLocalCharacterLoaded(character: Model): void {
        // print("okay so local works here")
    }
}