import * as React from "react";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";

import { StateReducer } from "../src/components/widget/state/reducers";
import configureStore from "../src/components/widget/state/store";
import SampleWidget from "../src/components/widget/widget";

const store = configureStore({
        state: null,
    },
    StateReducer,
);

test("Say my name, say my name...", () => {
    const tree1 = create(
        <Provider store={store}>
            <SampleWidget name="Michael" />
        </Provider>,
    ).toJSON();
    expect(tree1).toMatchSnapshot();
});
