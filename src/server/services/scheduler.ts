import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Modding } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { GameSession } from "server/game/state";

export interface OnPlayerJoined {
    onPlayerJoined(player: Player): void;
}

export interface OnGameStarted {
    onGameStarted(): void;
}

export interface OnLavaRising {
    onLavaRising(): void;
}

@Service()
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
                task.spawn(() => listener.onGameStarted());
            }
        });
    }
}

@Service()
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