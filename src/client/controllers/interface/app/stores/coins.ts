import { createProducer } from "@rbxts/reflex";

export interface CoinsState {
    count: number;
}

const initialState: CoinsState = {
    count: 0,
};

export const coinsProducer = createProducer(initialState, {
	setCoins: (state, value: number) => ({ ...state, count: value }),
});

