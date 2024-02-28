import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    joinRound(): void;
}

interface ServerToClientEvents {
    startGame(roundTime: number): void;
    endGame(players: Player[]): void; 
    lookahead(lookAhead: number): void;
}

interface ClientToServerFunctions {
    func(param: string): void;
}

interface ServerToClientFunctions {
    func(param: string): void;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();