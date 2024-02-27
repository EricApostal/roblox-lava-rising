import { Config } from "shared/components/game/config";
import { RoundManager } from "./round";
import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { OnGameEnded, OnPlayerDied } from "shared/components/game/scheduler";

@Service()
export class RoundService extends BaseComponent implements OnStart, OnPlayerDied, OnGameEnded {
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

    private roundThread() {
        this.roundTask = task.spawn(() => {
            wait(Config.timeBetweenRounds - Config.roundLookahead);
            print("Round lookahead event fires here");
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