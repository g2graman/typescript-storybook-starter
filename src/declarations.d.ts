import { Reducer } from "redux";

declare module "@storybook/addon-storyshots";

export interface IReducerMap<S> {
    [action: string]: Reducer<S, any>;
}
