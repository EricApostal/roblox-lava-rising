import { timerProducer } from "./stores/timer";
import { InferState, combineProducers } from "@rbxts/reflex";
import { lookaheadProducer } from "./stores/lookahead";
import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex";
import { sidebarProducer } from "./stores/sidebar";
import { coinsProducer } from "./stores/coins";

export let producer = combineProducers({
    timer: timerProducer,
    lookahead: lookaheadProducer,
    sidebar: sidebarProducer,
    coins: coinsProducer
})

export type RootProducer = typeof producer;
export type RootState = InferState<RootProducer>;

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;