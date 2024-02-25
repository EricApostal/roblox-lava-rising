import { Service } from "@flamework/core";
import { close } from "server/game/events";
import { Events } from "server/network";
import { Config } from "shared/components/game/config";
import { OnGameStarted, OnPlayerJoined } from "shared/components/game/scheduler";

Events.event.connect((message) => {
    print(`Event received, ${message}`);
});

@Service()
export class GameStartListener implements OnGameStarted {
    onGameStarted() {
        print("Game started!");
        wait(Config.gameLength);
        close();
    }
}