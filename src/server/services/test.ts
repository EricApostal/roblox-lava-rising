import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";

@Service()
export class GameStartService extends BaseComponent implements OnStart  {
    onStart(): void {
        print("Hey there :D")
    }
}