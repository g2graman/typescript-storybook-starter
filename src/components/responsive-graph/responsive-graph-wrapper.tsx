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
    children: React.ReactNode;
}

const augmentChildWithDimensions = (parent: IGraphParent, child: React.ReactNode) => React.cloneElement(
    child as React.ReactElement<any>, {
        height: parent.height,
        left: parent.left,
        ref: () => parent.ref,
        resize: parent.resize,
        top: parent.top,
        width: parent.width,
    },
);

const augmentChildrenWithDimensions = (children: React.ReactNode, parent: IGraphParent) => React.Children.map(
    children, augmentChildWithDimensions.bind(
        augmentChildWithDimensions,
        parent,
    ));

class ResponsiveGraphWrapper extends React.Component<IResponsiveGraphWrapperProps> {
    public render() {
        const { children } = this.props;

        return (
            <div style={{ width: "100%", height: "100%" }}>
                <ParentSize>
                    {augmentChildrenWithDimensions.bind(this, children)}
                </ParentSize>
            </div>
        );
    }
}

export default ResponsiveGraphWrapper;
