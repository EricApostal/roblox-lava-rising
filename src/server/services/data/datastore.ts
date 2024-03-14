import { BaseComponent } from "@flamework/components";
import { OnStart, Service } from "@flamework/core";
import { Collection, CollectionOptions, createCollection } from "@rbxts/lapis";
import { t } from "@rbxts/t";
import AutoSave from "@rbxts/lapis/out/lapis/AutoSave";

@Service()
export class DatastoreService extends BaseComponent implements OnStart {
    // collection: Collection<{}>;
    constructor() {
        super();
        
        // this.collection = createCollection("PlayerData", {
        //     validate: t.instanceIsA("Instance"),
        //     defaultData: {
        //         coins: 0,
        //         games_played: 0,
        //     },
        // } as CollectionOptions<{}>);
    }

    onStart() {

    }
}