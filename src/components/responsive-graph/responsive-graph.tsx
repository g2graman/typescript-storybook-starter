import * as React from "react";

import { map, path } from "ramda";
// import { connect } from "react-redux";

import { AxisBottom, AxisLeft } from "@vx/axis";
import { curveBasis } from "@vx/curve";
import { Group } from "@vx/group";
import { genDateValue } from "@vx/mock-data";
import { ParentSize } from "@vx/responsive";
import { scaleLinear, scaleTime } from "@vx/scale";

import * as PropTypes from "prop-types";

import { IPoint } from "./graph-data";
import GraphShell from "./graph-shell";
import ResponsiveGraphWrapper from "./responsive-graph-wrapper";
// import { createAction } from "./state/actions/doSomething";

export interface IStatelessGraphProps {
    // state?: any; // TODO: Specialize type
    // dispatch?: any; // TODO: specialize type

    makeExtra?: any;

    graphData: IPoint[];
    tickFormatters?: {
        x?: React.SVGProps<SVGElement>,
        y?: React.SVGProps<SVGElement>,
    };
}

export const defaultTickLabel = (
    <text
        fill="rgb(25, 29, 34)"
        opacity="0.20"
        fontSize={10}
        dy="0.25em"
        textAnchor="middle"
        fontWeight="bold"
    />
);

const ResponsiveGraph: React.SFC<IStatelessGraphProps> = ({
  makeExtra = null,
  graphData,
  tickFormatters: {
      x: xTickFormat,
      y: yTickFormat,
  } = {
      x: defaultTickLabel,
      y: defaultTickLabel,
  },
}: IStatelessGraphProps) => (
    <ResponsiveGraphWrapper>
        <GraphShell
            margin={{left: 32, right: 32, top: 5, bottom: 32}}
            graphData={graphData}
            xAxisTickFormat={xTickFormat}
            yAxisTickFormat={yTickFormat}
            makeExtra={makeExtra}
        />
    </ResponsiveGraphWrapper>
);

ResponsiveGraph.propTypes = {
    graphData: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.instanceOf(Date),
            value: PropTypes.number,
        }),
    ).isRequired,
    tickFormatters: PropTypes.shape({
        x: PropTypes.instanceOf(SVGElement),
        y: PropTypes.instanceOf(SVGElement),
    }),
};

export default ResponsiveGraph;
