import { BaseComponent } from "@flamework/components";
import { Modding, OnStart, Service } from "@flamework/core";
import { Events } from "server/network"

export interface OnPlayerJoinedRound {
    onPlayerJoinedRound(player: Player): void;
}

@Service()
export class PlayerJoinedRoundService extends BaseComponent implements OnStart {
    onStart(): void {
        const listeners = new Set<OnPlayerJoinedRound>();

        Modding.onListenerAdded<OnPlayerJoinedRound>((object) => listeners.add(object));
        Modding.onListenerRemoved<OnPlayerJoinedRound>((object) => listeners.delete(object));

        Events.joinRound.connect((player) => {
            for (const listener of listeners) {
                task.spawn(() => listener.onPlayerJoinedRound(player));
            }
        });
    
    }
}