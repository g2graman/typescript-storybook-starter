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

interface IPoint {
    date: Date;
    value: any;
}

const graphData: IPoint[] = genDateValue(20);

const gradientId = "PinkRed";

const getXValue = (point: IPoint) => point.date;
const getYValue = (point: IPoint) => point.value;

const Graph = ({ interpolate, data, xScale, yScale }: any) => (
    <AreaClosed
        data={data.map((d, i) => ({ ...d, value: interpolate[i] }))}
        xScale={xScale}
        yScale={yScale}
        x={getXValue}
        y={getYValue}
        strokeWidth={2}
        stroke={`url(#${gradientId})`}
        fill={`url(#${gradientId})`}
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

    public getMaxValue = (data) => max(data, getYValue);
    public getYScale = (height, maxYValue: any) => scaleLinear({
        domain: [0, maxYValue],
        nice: true,
        range: [height, 0],
    })

    public interpolateValuesToScale = (data: IPoint[], maxYValue: any) =>
        data.map((d) => Math.random() * maxYValue)

    public getGraphExtras = (data: IPoint[], xScale, yScale) => ({
        data,
        xScale,
        yScale,
    })

    public renderGraph = ({ width, height }) => {
        const xScale = scaleTime({
            domain: extent(graphData, getXValue),
            range: [0, width],
        });

        const yMax: any = this.getMaxValue(graphData);
        const yScale = this.getYScale(height, yMax);
        const interpolate = this.interpolateValuesToScale(graphData, yMax);
        const extra = this.getGraphExtras(graphData, xScale, yScale);

        return (
            <div style={{ width: "100%", height: "100vh", cursor: "pointer" }} onClick={this.toggle}>
                <svg width={width} height={height}>
                    <GradientPinkRed id={`${gradientId}`} />
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
