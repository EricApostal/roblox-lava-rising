import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { Collection, CollectionOptions, Document, createCollection } from "@rbxts/lapis";
import { t } from "@rbxts/t";
import AutoSave from "@rbxts/lapis/out/lapis/AutoSave";
import { OnPlayerJoined } from "shared/components/game/scheduler";
import { LeaderboardService } from "./leaderboard";
import { Players } from "@rbxts/services";

export class DataNode {
    coins: number;
    games_played: number;
    constructor(coins: number, games_played: number) {
        this.coins = coins;
        this.games_played = games_played;
    }
}

let collection: Collection<{ coins: number, games_played: number }>;
let documents = new Map<string, Document<{ coins: number, games_played: number }>>();

@Service()
class _DatastoreService extends BaseComponent implements OnPlayerJoined {
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
            DatastoreService.incrementCoins(player, 1);
        });
    }
}

export namespace DatastoreService {
    export function getCoins(player: Player): number {
        return documents.get(`${player.UserId}`)!.read().coins;
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