import { createProducer } from "@rbxts/reflex";

export interface LookaheadState {
    count: number;
    visible: boolean;
    container: ScreenGui;
}

const initialState: LookaheadState = {
    count: 0,
    visible: false,
    container: new Instance("ScreenGui", game.GetService("Players").LocalPlayer.WaitForChild("PlayerGui")),
};

export const lookaheadProducer = createProducer(initialState, {
    decrementLookahead: (state) => ({ ...state, count: state.count - 1 }),
	setLookahead: (state, value: number) => ({ ...state, count: value }),
    lookaheadVisible: (state, newState: boolean) => ({ ...state, visible: newState }),
});

