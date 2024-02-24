import { UIService } from "../interface/handler";

export namespace RoundService {
    export function startRound() {
        UIService.spawnTimer();
    }
}