import { Players, PhysicsService } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { OnGameEnded, OnGameStarted, OnLocalCharacterLoaded, OnPlayerCharacterLoaded } from "shared/components/game/scheduler";

@Service()
export class CharacterController extends BaseComponent implements OnStart, OnGameStarted, OnGameEnded {
    onStart(): void {
        PhysicsService.RegisterCollisionGroup("game-players");
        PhysicsService.CollisionGroupSetCollidable("game-players", "game-players", false);
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
                    part.CollisionGroup = "game-players";
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