import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    joinRound(): void;
}

interface ServerToClientEvents {
    startGame(players: Player[], roundTime: number): void;
    endGame(players: Player[]): void; 
    lookahead(lookAhead: number): void;
    coinPickup(deltaCoins: number, totalCoins: number): void;
}

interface ClientToServerFunctions {
    getCoins(): number;
}

interface ServerToClientFunctions {
    func(param: string): void;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();