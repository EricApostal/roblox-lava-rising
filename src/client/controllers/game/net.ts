import { Events } from "client/network";
import { RoundService } from "./rounds";

Events.startGame.connect(function() {
    print("Game started (client)!");
    RoundService.startRound();
})