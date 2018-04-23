import * as React from "react";
import { create } from "react-test-renderer";

import { SampleWidget } from "../src/components/widget";

test("Say my name, say my name...", () => {
    const tree1 = create(
        <SampleWidget name="Michael" />,
    ).toJSON();
    expect(tree1).toMatchSnapshot();
});
