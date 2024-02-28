import { BaseComponent, Component } from "@flamework/components";
import { OnGameEnded, OnGameStarted } from "shared/components/game/scheduler";
import { Players } from "@rbxts/services";
import { RoundManager } from "server/services/game/rounds/round";

@Component({tag: "lobby-spawn"})
export class LobbySpawn extends BaseComponent implements OnGameEnded {
    onGameEnded(players: Player[]): void {
        players.forEach((player) => {
            player.Character!.PrimaryPart!.CFrame = (this.instance as BasePart).CFrame.add(new Vector3(0, 5, 0));
        });
    }
}
