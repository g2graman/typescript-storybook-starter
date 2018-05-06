import { ParentSize } from "@vx/responsive";
import * as React from "react";

export interface IDimensions {
    height: number;
    left: number;
    top: number;
    width: number;
}

export type IGraphParent = {
    ref: React.Ref<any>;
    resize: any;
} & IDimensions;

export interface IResponsiveGraphWrapperProps {
    children: React.ReactElement<any>;
    debounceTime?: number;
}

const augmentChildWithDimensions = (parent: IGraphParent, child: React.ReactElement<any>) => React.cloneElement(
    child as React.ReactElement<any>, {
        height: parent.height,
        left: parent.left,
        ref: parent.ref,
        resize: parent.resize,
        top: parent.top,
        width: parent.width,
    },
);

const augmentChildrenWithDimensions = (children: React.ReactElement<any>, parent: IGraphParent) => React.Children.map(
    children, augmentChildWithDimensions.bind(
        augmentChildWithDimensions,
        parent,
    ));

const ResponsiveGraphWrapper: React.SFC<IResponsiveGraphWrapperProps> = ({
        children,
        debounceTime,
    }: IResponsiveGraphWrapperProps,
) => (
    <ParentSize debounceTime={debounceTime || 200}>
        {augmentChildrenWithDimensions.bind(augmentChildrenWithDimensions, children)}
    </ParentSize>
);

export default ResponsiveGraphWrapper;
