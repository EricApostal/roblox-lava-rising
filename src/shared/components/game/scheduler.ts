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

export interface OnPlayerCharacterLoaded {
    onPlayerCharacterLoaded(player: Player, character: Model): void;
}

export interface OnLocalCharacterLoaded {
    onLocalCharacterLoaded(character: Model): void;
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

@Service()
@Controller()
export class PlayerCharacterLoadService extends BaseComponent implements OnPlayerJoined {
    onPlayerJoined(player: Player): void {
        const listeners = new Set<OnPlayerCharacterLoaded>();

        Modding.onListenerAdded<OnPlayerCharacterLoaded>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnPlayerCharacterLoaded>((object) => listeners.delete(object));

        player.CharacterAdded.Connect((character) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerCharacterLoaded(player, character));
            }
        });
    }
}

/*
LOCAL ONLY! 
Why is it in replicated storage? I felt like it.
*/

@Service()
@Controller()
export class CharacterLoadedService extends BaseComponent implements OnPlayerCharacterLoaded, OnStart {
    listeners = new Set<OnLocalCharacterLoaded>();

    constructor() {
        super();
    }

    onStart(): void {
        Modding.onListenerAdded<OnLocalCharacterLoaded>((object) => this.listeners.add(object));
        Modding.onListenerRemoved<OnLocalCharacterLoaded>((object) => this.listeners.delete(object));
    }

    onPlayerCharacterLoaded(player: Player, character: Model): void {
        if (player === Players.LocalPlayer) {
            print("Local character loaded from scheduler!");
            for (const listener of this.listeners) {
                task.spawn(() => listener.onLocalCharacterLoaded(character));
            }
        }
    }
}