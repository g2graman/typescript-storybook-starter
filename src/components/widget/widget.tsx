import * as React from "react";
import { connect } from "react-redux";

import { curveBasis } from "@vx/curve";
import { GradientPinkRed } from "@vx/gradient";
import { genDateValue } from "@vx/mock-data";
import { ParentSize } from "@vx/responsive";
import { scaleLinear, scaleTime } from "@vx/scale";
import { AreaClosed, Line, LinePath } from "@vx/shape";
import { extent, max } from "d3-array";
import { Spring } from "react-spring";

// import { createAction } from "./state/actions/doSomething";

const graphData = genDateValue(20);
const x = (d) => d.date;
const y = (d) => d.value;

const Graph = ({ interpolate, data, xScale, yScale }: any) => (
    <AreaClosed
        data={data.map((d, i) => ({ ...d, value: interpolate[i] }))}
        xScale={xScale}
        yScale={yScale}
        x={x}
        y={y}
        strokeWidth={2}
        stroke={"url(#PinkRed)"}
        fill={"url(#PinkRed)"}
        curve={curveBasis}
    />
);

export interface ISampleWidgetProps {
    name: string;

    state: any; // TODO: Specialize type
    dispatch: any; // TODO: specialize type
}

export interface ISampleWidgetState {
    toggle: boolean;
}

class SampleWidget extends React.Component<ISampleWidgetProps, ISampleWidgetState> {
    public state = { toggle: true };
    public toggle = () => this.setState((state) => ({ toggle: !state.toggle }));

    public renderGraph = ({ width, height }) => {
        const xScale = scaleTime({ range: [0, width], domain: extent(graphData, x) });
        const yMax: any = max(graphData, y);
        const yScale = scaleLinear({ range: [height, 0], domain: [0, yMax], nice: true });
        const interpolate = graphData.map((d) => Math.random() * yMax);
        const extra = { data: graphData, xScale, yScale };

        return (
            <div style={{ width: "100%", height: "100vh", cursor: "pointer" }} onClick={this.toggle}>
                <svg width={width} height={height}>
                    <GradientPinkRed id="PinkRed" />
                    <g>
                        <Spring to={{ interpolate }} {...extra} children={Graph} />
                    </g>
                </svg>
            </div>
        );
    }

    public render() {
        return (
            <ParentSize>
                {this.renderGraph}
            </ParentSize>
        );
    }
}

export default connect(
    (state) => ({ state }),
    (dispatch) => ({ dispatch }),
)(SampleWidget);
