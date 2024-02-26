import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
    event(param1: string): void;
}

interface ServerToClientEvents {
    startGame(roundTime: number): void;
    endGame(): void;
    roundStartSoon(lookAhead: number): void;
}

interface ClientToServerFunctions {
    func(param: string): void;
}

interface ServerToClientFunctions {
    func(param: string): void;
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();