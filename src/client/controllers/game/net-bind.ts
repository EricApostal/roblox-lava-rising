import { Events } from "client/network";
import { RoundService } from "./rounds";
import { GameSession } from "shared/components/game/state";

/*
Do not add manually to this, instead bind to the events like a regular human :D
*/

Events.startGame.connect(function() {
    GameSession.startGame();
})

Events.endGame.connect(function() {
    GameSession.endGame();
})

Events.lookahead.connect(function() {
    GameSession.lookahead();
});