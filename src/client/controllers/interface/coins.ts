import { BaseComponent } from "@flamework/components";
import { Controller } from "@flamework/core";
import { OnCoinCollected } from "shared/components/game/scheduler";
import { UIService } from "./handler";

@Controller()
export class CoinHandler extends BaseComponent implements OnCoinCollected {
    onCoinCollected(player: Player, deltaCoins: number, totalCoins: number) {
        print(`${player.Name} collected ${deltaCoins} coins`);
        UIService.setCoins(totalCoins);
    }
}
