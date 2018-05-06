import * as React from "react";
// import { connect } from "react-redux";

import { AxisBottom, AxisLeft } from "@vx/axis";
import { curveBasis } from "@vx/curve";
import { GlyphDot } from "@vx/glyph";
import { Group } from "@vx/group";
import { genDateValue } from "@vx/mock-data";
import { ParentSize } from "@vx/responsive";
import { scaleLinear, scaleTime } from "@vx/scale";
import { AreaClosed, LinePath } from "@vx/shape";

import { extent, max, Numeric } from "d3-array";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";
// import { Spring } from 'react-spring';

import * as PropTypes from "prop-types";

import ResponsiveGraphWrapper from "./responsive-graph-wrapper";
// import { createAction } from "./state/actions/doSomething";

export interface IPoint {
    date: Date;
    value: number;
}

export interface ILocalGraph {
    graphData?: IPoint[];

    width?: number;
    height?: number;
    parentWidth?: number;
    parentHeight?: number;
    top?: number;
    left?: number;

    xAxisTickFormat: any;
    yAxisTickFormat: any;
}

export interface IGraph {
    data: IPoint[];

    width: number;
    height: number;
    top: number;
    left: number;

    xScale: ScaleTime<Date, Numeric>;
    yScale: ScaleLinear<any, Numeric>;
}

export type PointSelector<T extends {}, K extends keyof T> = (point: T) => T[K];
export type GlyphFactory<Point> = (linePoint: Point, i: number) => any;
export type GlyphFactoryFactory<Point> = (
    xScale: ScaleTime<Date, Numeric>,
    yScale: ScaleLinear<number, Numeric>,
    getXValue: PointSelector<Point, keyof Point>,
    getYValue: PointSelector<Point, keyof Point>,
) => GlyphFactory<Point>;

const getXValue: PointSelector<IPoint, keyof IPoint> = (point: IPoint) => point.date;
const getYValue: PointSelector<IPoint, keyof IPoint> = (point: IPoint) => point.value;

const glyphFactory: GlyphFactoryFactory<IPoint> = (xScale, yScale, XValueGetter, YValueGetter) =>
    (linePoint: IPoint, i: number) => {
        return (
            <g key={`line-point-${i}`}>
                <GlyphDot
                    cx={xScale(XValueGetter(linePoint))}
                    cy={yScale(YValueGetter(linePoint))}
                    r={6}
                    fill="#fff"
                    stroke="#01f2ff"
                    strokeWidth={10}
                />
                <GlyphDot
                    cx={xScale(XValueGetter(linePoint))}
                    cy={yScale(YValueGetter(linePoint))}
                    r={6}
                    fill="#01f2ff"
                    stroke="#7e20dc"
                    strokeWidth={3}
                />
                <GlyphDot
                    cx={xScale(XValueGetter(linePoint))}
                    cy={yScale(YValueGetter(linePoint))}
                    r={4}
                    fill="#ffffff"
                />
            </g>
        );
    };

const Graph: React.SFC<IGraph> = ({ data, xScale, yScale, width, height, top, left }) => (
        <svg width={width} height={height}>
            <LinePath
                data={data}
                xScale={xScale}
                yScale={yScale}
                x={getXValue}
                y={getYValue}
                stroke="#7e20dc"
                strokeWidth={2}
                strokeDasharray="2,2"
                glyph={glyphFactory(xScale, yScale, getXValue, getYValue)}
                curve={curveMonotoneX}
            />
        </svg>
    );

export interface ISampleWidgetProps {
    // state?: any; // TODO: Specialize type
    // dispatch?: any; // TODO: specialize type

    graphData: IPoint[];
    children?: any;
}

const tickLabel = (
    <text
        fill="rgb(25, 29, 34)"
        opacity="0.20"
        fontSize={10}
        dy="0.25em"
        textAnchor="middle"
        fontWeight="bold"
    />
);

const getXScale = (width, graphData: IPoint[]) => scaleTime({
    domain: extent(graphData, getXValue),
    range: [0, width],
});

const getYScale = (height, graphData: IPoint[]) => scaleLinear({
    domain: [0, max(graphData, getYValue)],
    nice: true,
    range: [0, height],
});

const LocalGraph: React.SFC<ILocalGraph> = ({
    width,
    height,
    top,
    left,
    graphData,
    xAxisTickFormat,
    yAxisTickFormat,
}: ILocalGraph) => {

    const xScale = getXScale(width, graphData as IPoint[]);
    const yScale = getYScale(height, graphData as IPoint[]);

    const leftOffset = 0; // 35;
    const topOffset = 0; // 35;

    const graphProps = {
        data: graphData as IPoint[],
        height: height || 0,
        left: (left || 0) + leftOffset,
        top: (top || 0) + topOffset,
        width: width || 0,
        xScale,
        yScale,
    };

    return (
        <Group width={width} height={height}>
            <svg width={width} height={height}>
                <g>
                    <AxisLeft
                        scale={yScale}
                        left={graphProps.left}
                        top={graphProps.top}
                        numTicks={3}
                        stroke="#eaf0f6"
                        tickLabelComponent={yAxisTickFormat}
                        tickFormat={yScale.tickFormat(3, "0")}
                    />

                    <Graph {...graphProps}/>

                    <AxisBottom
                        left={graphProps.left}
                        top={graphProps.top}
                        scale={xScale}
                        stroke="#eaf0f6"
                        tickLabelComponent={xAxisTickFormat}
                    />
                </g>
            </svg>
        </Group>
    );
};

const StatelessGraph: React.SFC<ISampleWidgetProps>  = ({ graphData }: ISampleWidgetProps) => (
    <ResponsiveGraphWrapper>
        <LocalGraph
            graphData={graphData}
            xAxisTickFormat={tickLabel}
            yAxisTickFormat={tickLabel}
        />
    </ResponsiveGraphWrapper>
);

StatelessGraph.propTypes = {
    graphData: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.instanceOf(Date),
            value: PropTypes.number,
        }),
    ),
};

export default StatelessGraph;
