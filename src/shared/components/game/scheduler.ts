import { Controller, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Modding } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { GameSession } from "./state";
import { Config } from "./config";

export interface OnPlayerJoined {
    onPlayerJoined(player: Player): void;
}

export interface OnGameStarted {
    onGameStarted(gameLength: number): void;
}

export interface OnGameEnded {
    onGameEnded(): void;
}

export interface OnLavaRising {
    onLavaRising(): void;
}


@Service()
@Controller()
export class PlayerJoinService extends BaseComponent implements OnStart {
    onStart() {
        const listeners = new Set<OnPlayerJoined>();

        Modding.onListenerAdded<OnPlayerJoined>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnPlayerJoined>((object) => listeners.delete(object));

        Players.PlayerAdded.Connect((player) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerJoined(player));
            }
        })

        for (const player of Players.GetPlayers()) {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerJoined(player));
            }
        }
    }
}

@Service()
@Controller()
export class GameStartService extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        const listeners = new Set<OnGameStarted>();

        Modding.onListenerAdded<OnGameStarted>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnGameStarted>((object) => listeners.delete(object));

        GameSession.onGameStart.Connect(() => {
            for (const listener of listeners) {
                task.spawn(() => listener.onGameStarted(Config.gameLength));
            }
        });
    }
}

@Service()
@Controller()
export class GameEndService extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        const listeners = new Set<OnGameEnded>();

        Modding.onListenerAdded<OnGameEnded>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnGameEnded>((object) => listeners.delete(object));

        GameSession.onGameEnd.Connect(() => {
            for (const listener of listeners) {
                task.spawn(() => listener.onGameEnded());
            }
        });
    }
}

@Service()
@Controller()
export class LavaRisingService extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        const listeners = new Set<OnLavaRising>();

        Modding.onListenerAdded<OnLavaRising>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnLavaRising>((object) => listeners.delete(object));

        GameSession.onGameStart.Connect(() => {
            for (const listener of listeners) {
                task.spawn(() => listener.onLavaRising());
            }
        });
    }
}