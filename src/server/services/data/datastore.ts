import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { Collection, CollectionOptions, Document, createCollection } from "@rbxts/lapis";
import { t } from "@rbxts/t";
import { OnPlayerJoined, OnPlayerLeaving } from "shared/components/game/scheduler";
import { LeaderboardService } from "./leaderboard";

let collection: Collection<{ coins: number, games_played: number }>;
let documents = new Map<string, Document<{ coins: number, games_played: number }>>();

@Service()
class _DatastoreService extends BaseComponent implements OnPlayerJoined, OnPlayerLeaving {
    constructor() {
        super();
        collection = createCollection("PlayerData", {
            validate: t.strictInterface({ coins: t.integer, games_played: t.integer}),
            defaultData: {
                coins: 0,
                games_played: 0,
            },
        } as CollectionOptions<{ coins: number, games_played: number }>);
    }

    onPlayerJoined(player: Player): void {
        collection.load(`${player.UserId}`).then((document) => {
            documents.set(`${player.UserId}`, document);
            LeaderboardService.setValue(player, "Coins", DatastoreService.getCoins(player));
            // DatastoreService.incrementCoins(player, 1);
        });
    }

    onPlayerLeaving(player: Player): void {
        documents.get(`${player.UserId}`)!.save();
        documents.delete(`${player.UserId}`);
    }
}

export namespace DatastoreService {
    export function getCoins(player: Player): number {
        let document;
        while (!document) {
            document = documents.get(`${player.UserId}`)!;
            wait(0.1);
        }
        return document.read().coins;
    }

    export function setCoins(player: Player, value: number): void {
        let old = documents.get(`${player.UserId}`)!.read();
        documents.get(`${player.UserId}`)!.write({ coins: value, games_played: old.games_played});
        LeaderboardService.setValue(player, "Coins", value);
    }

    export function incrementCoins(player: Player, value: number): void {
        let old = documents.get(`${player.UserId}`)!.read();
        documents.get(`${player.UserId}`)!.write({ coins: old.coins + value, games_played: old.games_played});
        LeaderboardService.setValue(player, "Coins", old.coins + value);
    }

    export function getGamesPlayed(player: Player): number {
        return documents.get(`${player.UserId}`)!.read().games_played;
    }

    export function setGamesPlayed(player: Player, value: number): void {
        let old = documents.get(`${player.UserId}`)!.read();
        documents.get(`${player.UserId}`)!.write({ coins: old.coins, games_played: value});
    }

}