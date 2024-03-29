import { Players } from "@rbxts/services";
import { UIService } from "../interface/handler";
import { Controller, OnStart } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { OnGameEnded, OnGameStarted, OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";

@Controller()
export class CharacterController extends BaseComponent implements OnLocalCharacterLoaded, OnStart, OnGameStarted, OnGameEnded {
    onLocalCharacterLoaded() {
        // WARNING: This may not call initially on some devices. Proceed with caution.
        UIService.remount();
    }

    onStart(): void {
        Players.LocalPlayer.WaitForChild("PlayerGui");
        UIService.remount();
    }

    onGameStarted(players: Player[], gameLength: number): void {
        this.disablePlayerInterference(players);
    }

    onGameEnded(players: Player[]): void {
        this.enablePlayerInterference(players);
    }

    private disablePlayerInterference(players: Player[]) {
        for (const player of players) {
            for (const part of player.Character!.GetDescendants()) {
                if (part.IsA("BasePart") && part.Name !== "HumanoidRootPart") {
                    part.Transparency = 0.5;
                }
            }
        }
    }

    private enablePlayerInterference(players: Player[]) {
        for (const player of players) {
            for (const part of player.Character!.GetDescendants()) {
                if (part.IsA("BasePart") && part.Name !== "HumanoidRootPart") {
                    part.Transparency = 0;
                }
            }
        }
    }
}