import { Service } from "@flamework/core";
import { Events } from "server/network";
import { OnGameStarted, OnPlayerJoined } from "shared/components/game/scheduler";

Events.event.connect((message) => {
    print(`Event received, ${message}`);
});

@Service()
export class GameStartListener implements OnGameStarted {
    onGameStarted() {
        print("Game started!");
    }
}