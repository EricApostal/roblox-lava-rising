import { Functions } from "server/network";
import { DatastoreService } from "./datastore";

Functions.getCoins.setCallback((player) => {
    return DatastoreService.getCoins(player);
})