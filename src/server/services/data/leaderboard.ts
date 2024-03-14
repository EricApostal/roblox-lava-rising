import { BaseComponent } from "@flamework/components";
import { Service } from "@flamework/core";
import { OnPlayerJoined } from "shared/components/game/scheduler";
import { Players } from "@rbxts/services";

@Service()
class _LeaderboardService extends BaseComponent implements OnPlayerJoined {
    // leaderboards: Map<number, number> = new Map<number, number>()
    constructor() {
        super();
    }

    onPlayerJoined(player: Player): void {
        let leaderboard = new Instance("Folder")
        leaderboard.Name = "leaderstats"
        leaderboard.Parent = player
    }
}

export namespace LeaderboardService {
    export function setValue(player: Player, key: string, value: number) {
        let leaderboard = player.FindFirstChild("leaderstats")
        if (leaderboard) {
            let stat = new Instance("IntValue")
            stat.Name = key
            stat.Value = value
            stat.Parent = leaderboard
        } else {
            warn("Leaderboard not found for player. This should never happen, it should already be added at init.")
        }
    }
}