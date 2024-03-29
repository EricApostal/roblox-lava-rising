import { Events } from "client/network";
import { RoundService } from "./rounds";
import { GameSession } from "shared/components/game/state";
import { Players } from "@rbxts/services";

/*
Do not add manually to this, instead bind to the events like a regular human :D
*/

Events.startGame.connect(function(players: Player[]) {
    GameSession.startGame(players);
})

Events.endGame.connect(function(players: Player[]) {
    GameSession.endGame(players);
})

Events.lookahead.connect(function() {
    GameSession.lookahead();
});

Events.coinPickup.connect(function( deltaCoins: number, totalCoins: number) {
    GameSession.coinPickup(Players.LocalPlayer, deltaCoins, totalCoins);
})