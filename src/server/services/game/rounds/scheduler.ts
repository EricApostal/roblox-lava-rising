import { Config } from "shared/components/game/config";
import { RoundManager } from "./round";
import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { OnGameEnded, OnPlayerDied } from "shared/components/game/scheduler";
import { lookahead } from "server/game/events";
import { OnPlayerJoinedRound } from "../scheduler";

@Service()
export class RoundService extends BaseComponent implements OnStart, OnPlayerDied, OnGameEnded, OnPlayerJoinedRound {
    roundTask?: thread;
    
    onStart() {
        wait(5);
        this.roundThread();
    }

    onPlayerDied(player: Player): void {
        RoundManager.removePlayerFromRound(player);
        if (RoundManager.getPlayers().size() === 0) {
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

    onPlayerJoinedRound(player: Player): void {
        RoundManager.addPlayerToRound(player);
    }

    private roundThread() {
        this.roundTask = task.spawn(() => {
            wait(Config.timeBetweenRounds - Config.roundLookahead);
            print("Round lookahead event fires here");
            lookahead();
            wait(Config.roundLookahead)
            print("Starting round in loop...")
            RoundManager.startRound();
            wait(Config.roundLength);
            print("Ending round in loop...")
            RoundManager.endRound();
            wait(1);
        });
    }

}