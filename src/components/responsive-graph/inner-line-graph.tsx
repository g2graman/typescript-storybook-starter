import * as React from "react";

import { Numeric } from "d3-array";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { curveMonotoneX } from "d3-shape";

import { GlyphDot } from "@vx/glyph";
import { LinePath } from "@vx/shape";

import { getXValue, getYValue, IPoint, PointSelector } from "./graph-data";

export interface IInnerLineGraph {
    data: IPoint[];

    width: number;
    height: number;

    xScale: ScaleTime<Date, Numeric>;
    yScale: ScaleLinear<any, Numeric>;

    xValueGetter: PointSelector<IPoint, keyof IPoint>;
    yValueGetter: PointSelector<IPoint, keyof IPoint>;
}

export type GlyphFactory<Point> = (linePoint: Point, i: number) => any;
export type GlyphFactoryFactory<Point> = (
    xScale: ScaleTime<Date, Numeric>,
    yScale: ScaleLinear<number, Numeric>,
    getXValue: PointSelector<Point, keyof Point>,
    getYValue: PointSelector<Point, keyof Point>,
) => GlyphFactory<Point>;

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

const InnerLineGraph: React.SFC<IInnerLineGraph> = ({ data, xScale, yScale, xValueGetter, yValueGetter }) => (
    <LinePath
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={getXValue}
        y={getYValue}
        stroke="#7e20dc"
        strokeWidth={2}
        strokeDasharray="2,2"
        glyph={glyphFactory(xScale, yScale, xValueGetter, yValueGetter)}
        curve={curveMonotoneX}
    />
);

export default InnerLineGraph;
