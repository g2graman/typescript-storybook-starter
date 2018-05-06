import { storiesOf, Story } from "@storybook/react";

import * as React from "react";
// import { Provider as ReduxProvider } from "react-redux";

import { genDateValue } from "@vx/mock-data";

// import { StateReducer } from "../src/components/widget/state/reducers";
// import configureStore from "../src/components/widget/state/store";
import StatelessGraph, { IPoint } from "../src/components/stateless-graph/stateless-graph";

/*
const store = configureStore({
        state: null,
    },
    StateReducer,
);
*/

const storyNameSpace = storiesOf(StatelessGraph.name, module);

storyNameSpace
    // .addDecorator((getStory) => <ReduxProvider store={store} children={getStory()}/>)
    .add("Graph", () => <StatelessGraph graphData={genDateValue(10) as IPoint[]}/>);
