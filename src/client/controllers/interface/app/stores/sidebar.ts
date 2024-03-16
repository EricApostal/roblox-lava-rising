import { createProducer } from "@rbxts/reflex";

export interface IconState {
    visible: boolean;
}

const initialState: IconState = {
    visible: false,
};

export const sidebarProducer = createProducer(initialState, {
    sidebarVisible: (state, newState: boolean) => ({ ...state, visible: newState }),
});

