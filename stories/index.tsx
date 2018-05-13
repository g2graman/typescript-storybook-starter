import { storiesOf } from "@storybook/react";

import * as React from "react";
// import { Provider as ReduxProvider } from "react-redux";

import { genDateValue } from "@vx/mock-data";
import { host } from "storybook-host";

// import { StateReducer } from "../src/components/widget/state/reducers";
// import configureStore from "../src/components/widget/state/store";
import { IPoint } from "../src/components/responsive-graph/graph-data";
import ResponsiveGraph from "../src/components/responsive-graph/responsive-graph";

/*
const store = configureStore({
        state: null,
    },
    StateReducer,
);
*/

const storyNameSpace = storiesOf(ResponsiveGraph.name, module);

storyNameSpace
    // .addDecorator((getStory) => <ReduxProvider store={store} children={getStory()}/>)
    .addDecorator(host({
        border: false,
        cropMarks: false,
        height: "100%",
        padding: "32px",
        title: ResponsiveGraph.name,
        width: "100%",
    }))
    .add("Regular Graph", () => <ResponsiveGraph graphData={genDateValue(20) as IPoint[]} />)
    .add("Graph with upper half coloured", () => {
        const childFactory = ({ width, yScale, extent: { y: [yMin, yMax] } }) => {
           const topRegion = yScale(yMax);
           const bottomRegion = yScale((yMin + yMax) / 2);

           return (bottomRegion - topRegion) > 0
                ? (
                   <rect
                       x={0}
                       width={width}
                       y={topRegion}
                       height={bottomRegion - topRegion}
                       fill="steelblue"
                       fillOpacity={0.5}
                   />
               ) : null;
        };

        return (
            <ResponsiveGraph graphData={genDateValue(20) as IPoint[]} makeExtra={childFactory}>
                {childFactory}
            </ResponsiveGraph>
        );
    });
