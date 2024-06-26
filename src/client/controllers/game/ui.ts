import { BaseComponent } from "@flamework/components";
import { Controller, OnStart } from "@flamework/core";
import { UIService } from "../interface/handler";
import { Functions } from "client/network";

@Controller()
export class CoinStartup extends BaseComponent implements OnStart {
    onStart() {
        Functions.getCoins().then((coins) => {
            UIService.setCoins(coins);
        });
    }
}
