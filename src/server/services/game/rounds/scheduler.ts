import { Config } from "shared/components/game/config";
import { RoundManager } from "./round";
import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { OnGameEnded, OnGameStarted, OnPlayerDied } from "shared/components/game/scheduler";
import { lookahead } from "server/game/events";
import { OnPlayerJoinedRound } from "../scheduler";

@Service()
export class RoundService extends BaseComponent implements OnStart, OnPlayerDied, OnGameStarted, OnGameEnded, OnPlayerJoinedRound {
    roundTask?: thread;
    
    onStart() {
        wait(5);
        this.roundThread();
    }

    onPlayerDied(player: Player): void {
        if (!RoundManager.getInitialPlayers().find(p => p === player)) {
            return;
        }

        RoundManager.removePlayerFromRound(player);
        if (RoundManager.getActivePlayers().size() === 0) {
            RoundManager.endRound();
            wait(5);
        }
    }

    onGameEnded(): void {
        if(this.roundTask) {
            task.cancel(this.roundTask);
        } else {
            print("Round task is null");
        }
        this.roundThread();
    }

    onGameStarted(players: Player[], gameLength: number): void {
    }

    onPlayerJoinedRound(player: Player): void {
        RoundManager.addPlayerToRound(player);
    }

    private roundThread() {
        this.roundTask = task.spawn(() => {
            wait(Config.timeBetweenRounds - Config.roundLookahead);
            // print("Round lookahead event fires here");
            lookahead();
            wait(Config.roundLookahead)
            if (RoundManager.getActivePlayers().size() === 0) {
                // print("No players in round, skipping round start!");
                RoundManager.endRound();
                return;
            }
            // print("Starting round in loop...")
            RoundManager.startRound();
            wait(Config.roundLength);
            // print("Ending round in loop...")
            RoundManager.endRound();
            wait(1);
        });
    }

}