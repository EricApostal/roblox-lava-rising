import { BaseComponent, Component } from "@flamework/components";
import { OnGameEnded, OnGameStarted } from "shared/components/game/scheduler";
import { Players } from "@rbxts/services";

@Component({tag: "level-spawn"})
export class LobbySpawn extends BaseComponent implements OnGameEnded {
    onGameEnded(): void {
        Players.GetPlayers().forEach((player) => {
            // TODO: Only teleport players who are in game
            player.Character!.PrimaryPart!.CFrame = (this.instance as BasePart).CFrame.add(new Vector3(0, 5, 0));
        });
    }
}