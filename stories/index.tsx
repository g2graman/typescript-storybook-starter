import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Provider } from "react-redux";

import { StateReducer } from "../src/components/widget/state/reducers";
import configureStore from "../src/components/widget/state/store";
import SampleWidget from "../src/components/widget/widget";

const store = configureStore({
        state: null,
    },
    StateReducer,
);

storiesOf("SampleWidget", module)
    .addDecorator((story) => <Provider store={store} children={story()}/>)
    .add("SampleWidget", () => <SampleWidget name="Michael" />);
