import { Events } from "client/network";
import { RoundService } from "./rounds";
import { GameSession } from "shared/components/game/state";

Events.startGame.connect(function() {
    // Do not add to this. Instead make a controller.
    GameSession.startGame();
})