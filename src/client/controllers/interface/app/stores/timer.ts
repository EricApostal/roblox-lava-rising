import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/react-reflex";
import { InferState, createProducer } from "@rbxts/reflex";

export interface TimerState {
    count: number;
    visible: boolean;
    container: ScreenGui;
}

const initialState: TimerState = {
    count: 0,
    visible: false,
    container: new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui")),
};

export const timerProducer = createProducer(initialState, {
	increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
	setValue: (state, value: number) => ({ ...state, count: value }),
    visible: (state, newState: boolean) => ({ ...state, visible: newState }),
    mount: (state, container: ScreenGui) => ({ ...state, container: container}),
});

export type RootState = InferState<RootProducer>;
export type RootProducer = typeof timerProducer;

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;

