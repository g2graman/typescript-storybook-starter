import * as React from "react";

import {AxisBottom, AxisLeft} from "@vx/axis";
import {curveBasis} from "@vx/curve";
import {GlyphDot} from "@vx/glyph";
import {Group} from "@vx/group";
import {genDateValue} from "@vx/mock-data";
import {ParentSize} from "@vx/responsive";
import {scaleLinear, scaleTime} from "@vx/scale";
import {AreaClosed, LinePath} from "@vx/shape";

import {extent} from "d3-array";
// import { Spring } from 'react-spring';

import {getXValue, getYValue, IPoint} from "./graph-data";
import InnerLineGraph from "./inner-line-graph";

export interface IGraphShellProps {
    graphData: IPoint[];
    width?: number;
    height?: number;

    margin?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };

    xAxisTickFormat: any;
    yAxisTickFormat: any;

    makeExtra?: any;
}

const getXScale = (width, graphData: IPoint[]) => scaleTime({
    domain: extent(graphData, getXValue),
    range: [0, width],
});

const getYScale = (height, graphData: IPoint[]) => scaleLinear({
    domain: extent(graphData, getYValue),
    nice: true,
    range: [height, 0],
});

class GraphShell extends React.Component<IGraphShellProps> {
    public render() {
        const {
            width,
            height,
            margin: {left = 0, top = 0, right = 0, bottom = 0},
            graphData,
            xAxisTickFormat,
            yAxisTickFormat,
            makeExtra,
        }: IGraphShellProps = this.props;

        const yMax = height - top - bottom;
        const xMax = width - left - right;
        const xScale = getXScale(xMax, graphData as IPoint[]);
        const yScale = getYScale(yMax, graphData as IPoint[]);

        const graphProps = {
            data: graphData as IPoint[],
            extent: {
                x: extent(graphData, getXValue),
                y: extent(graphData, getYValue),
            },
            height,
            makeExtra,
            margin: { left, top, right, bottom },
            width,
            xMax,
            xScale,
            xValueGetter: getXValue,
            yMax,
            yScale,
            yValueGetter: getYValue,
        };

        return (
            <svg width={(width)} height={(height)}>
                <Group left={left} top={top}>
                    <AxisLeft
                        scale={yScale}
                        numTicks={4}
                        stroke="#eaf0f6"
                        tickLabelComponent={yAxisTickFormat}
                        tickFormat={yScale.tickFormat(3, "0")}
                    />

                    <InnerLineGraph {...graphProps}/>

                    <AxisBottom
                        top={yMax}
                        scale={xScale}
                        stroke="#eaf0f6"
                        tickLabelComponent={xAxisTickFormat}
                    />
                </Group>
            </svg>
        );
    }
}

export default GraphShell;
