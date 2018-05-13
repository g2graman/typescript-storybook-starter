import * as React from "react";
// import { Provider } from "react-redux";
import { create } from "react-test-renderer";

import { genDateValue } from "@vx/mock-data";

// import { StateReducer } from "../src/components/widget/state/reducers";
// import configureStore from "../src/components/widget/state/store";
import { IPoint } from "../src/components/responsive-graph/graph-data";
import ResponsiveGraph from "../src/components/responsive-graph/responsive-graph";

/*const store = configureStore({
        state: null,
    },
    StateReducer,
);*/

test("Say my name, say my name...", () => {
    const tree1 = create(
        <ResponsiveGraph graphData={genDateValue(20) as IPoint[]} />,
    ).toJSON();
    expect(tree1).toMatchSnapshot();
});
