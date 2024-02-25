import { Controller, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Modding } from "@flamework/core";
import { BaseComponent } from "@flamework/components";

export interface OnCharacterLoaded {
    onCharacterLoaded(character: Model): void;
}

@Controller()
export class CharacterLoadedService extends BaseComponent implements OnStart {
    onStart() {
        const listeners = new Set<OnCharacterLoaded>();

        Modding.onListenerAdded<OnCharacterLoaded>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnCharacterLoaded>((object) => listeners.delete(object));

        Players.LocalPlayer.CharacterAdded.Connect(() => {
            for (const listener of listeners) {
                task.spawn(() => listener.onCharacterLoaded(Players.LocalPlayer.Character as Model));
            }
        })
    }
}