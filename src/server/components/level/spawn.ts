import { BaseComponent, Component } from "@flamework/components";
import { OnGameStarted } from "shared/components/game/scheduler";
import { Players } from "@rbxts/services";
import { RoundManager } from "server/services/game/rounds/round";

@Component({tag: "level-spawn"})
export class LevelSpawn extends BaseComponent implements OnGameStarted {
    onGameStarted(gameLength: number): void {
        RoundManager.getPlayers().forEach((player) => {
            player.Character!.PrimaryPart!.CFrame = (this.instance as BasePart).CFrame.add(new Vector3(0, 5, 0));
        });
    }
}