import { storiesOf } from "@storybook/react";
import * as React from "react";

import { SampleWidget } from "../src/components/widget";

storiesOf("SampleWidget", module)
    .add("SampleWidget", () => <SampleWidget name="Michael" />);
