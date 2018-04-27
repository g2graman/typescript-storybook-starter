import { Reducer } from "redux";

import { IReducerMap } from "../../../declarations";

import { ActionType as GenericActionType } from "./actions";
import { DO_SOMETHING_TOKEN/*, IDoSomething*/ } from "./actions/doSomething";

export type ActionReducerMap = IReducerMap<{}>;

const ModuleReducerMap: ActionReducerMap = {
    [DO_SOMETHING_TOKEN as string]: (state = {}/*, action: IDoSomething*/) => {
        return state;
    },
};

const stateReducer: Reducer<{}, any> = (state = {}, action: GenericActionType) => {
    if (action && ModuleReducerMap.hasOwnProperty(action.type)) {
        return ModuleReducerMap[action.type](state, action as GenericActionType);
    }

    return state;
};

export const StateReducer: Reducer<{}, any> = stateReducer;
