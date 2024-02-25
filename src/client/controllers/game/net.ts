import { Events } from "client/network";
import { RoundService } from "./rounds";
import { GameSession } from "shared/components/game/state";

Events.startGame.connect(function() {
    print("Game started (client)!");
    GameSession.startGame();
    RoundService.startRound();
})