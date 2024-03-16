import { createProducer } from "@rbxts/reflex";

export interface TimerState {
    count: number;
    visible: boolean;
}

const initialState: TimerState = {
    count: 0,
    visible: false,
};

export const timerProducer = createProducer(initialState, {
	incrementTimer: (state) => ({ ...state, count: state.count + 1 }),
    decrementTimer: (state) => ({ ...state, count: state.count - 1 }),
	setTimer: (state, value: number) => ({ ...state, count: value }),
    timerVisible: (state, newState: boolean) => ({ ...state, visible: newState }),
});

