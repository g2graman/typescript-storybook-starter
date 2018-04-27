import * as React from "react";
import { connect } from "react-redux";

export interface ISampleWidgetProps {
    name: string;

    state: any; // TODO: Specialize type
    dispatch: any; // TODO: specialize type
}

class SampleWidget extends React.Component<ISampleWidgetProps, {}> {
    public render() {
        return <div><h1>Hello {this.props.name}</h1></div>;
    }
}

export default connect(
    (state) => ({ state }),
    (dispatch) => ({ dispatch }),
)(SampleWidget);
