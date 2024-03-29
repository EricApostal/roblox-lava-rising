import { Controller, OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Modding } from "@flamework/core";
import { BaseComponent } from "@flamework/components";
import { GameSession } from "./state";
import { Config } from "./config";
import { GlobalEvents } from "shared/network";

export interface OnPlayerJoined {
    onPlayerJoined(player: Player): void;
}

export interface OnPlayerLeaving {
    onPlayerLeaving(player: Player): void;
}

export interface OnGameStarted {
    onGameStarted(players: Player[], gameLength: number): void;
}

export interface OnGameEnded {
    onGameEnded(players: Player[]): void;
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

export interface OnPlayerDied {
    onPlayerDied(player: Player): void;
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
export class PlayerLeaveService extends BaseComponent implements OnStart {
    onStart() {
        const listeners = new Set<OnPlayerLeaving>();

        Modding.onListenerAdded<OnPlayerLeaving>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnPlayerLeaving>((object) => listeners.delete(object));

        Players.PlayerRemoving.Connect((player) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerLeaving(player));
            }
        })

        for (const player of Players.GetPlayers()) {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerLeaving(player));
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
                task.spawn(() => listener.onGameStarted(Players.GetPlayers(), Config.roundLength));
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

        GameSession.onGameEnd.Connect((players) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onGameEnded(players));
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

@Service()
@Controller()
export class OnPlayerDied extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        const listeners = new Set<OnPlayerDied>();

        Modding.onListenerAdded<OnPlayerDied>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnPlayerDied>((object) => listeners.delete(object));

        let plrAdded = Players.PlayerAdded.Connect((player) => {
            let chrAdded = player.CharacterAdded.Connect((character) => {
                (character.FindFirstChild("Humanoid")! as Humanoid).Died.Connect(() => {
                    for (const listener of listeners) {
                        task.spawn(() => listener.onPlayerDied(player));
                    }
                    // Prevent memory leak (I think)
                    // chrAdded.Disconnect();
                });
            });
        });
    }
}

export interface OnLookAhead {
    onLookAhead(lookAhead: number): void;
}

@Service()
@Controller()
export class OnLookAheadService extends BaseComponent implements OnStart {
    constructor() {
        super();
    }

    onStart() {
        const listeners = new Set<OnLookAhead>();

        Modding.onListenerAdded<OnLookAhead>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnLookAhead>((object) => listeners.delete(object));

        GameSession.onLookahead.Connect(() => {
            for (const listener of listeners) {
                task.spawn(() => listener.onLookAhead(Config.roundLookahead));
            }
        });
    }
}

/*
LOCAL ONLY! 
Why is it in replicated storage? I felt like it.
*/

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
            for (const listener of this.listeners) {
                task.spawn(() => listener.onLocalCharacterLoaded(character));
            }
        }
    }
}

export interface OnCoinCollected {
    onCoinCollected(player: Player, deltaCoins: number, totalCoins: number): void;
}

@Controller()
export class OnCoinCollectedService extends BaseComponent implements OnStart {
    listeners = new Set<OnLocalCharacterLoaded>();

    constructor() {
        super();
    }

    onStart(): void {
        const listeners = new Set<OnCoinCollected>();

        Modding.onListenerAdded<OnCoinCollected>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnCoinCollected>((object) => listeners.delete(object));

        GameSession.onCoinPickup.Connect((player: Player, coins: number, deltaCoins: number) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onCoinCollected(player, coins, deltaCoins));
            }
        });
    }

}