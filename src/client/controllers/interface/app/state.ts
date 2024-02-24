import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex";
import { InferState, createProducer } from "@rbxts/reflex";

export interface TimerState {
    count: number;
}

const initialState: TimerState = {
    count: 0,
};

export const timerProducer = createProducer(initialState, {
	increment: (state) => ({ ...state, count: state.count + 1 }),
	reset: (state) => ({ ...state, count: 0 }),
});

export type RootState = InferState<RootProducer>;
export type RootProducer = typeof timerProducer;

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;

