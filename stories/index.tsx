import { setAddon, storiesOf, Story } from "@storybook/react";
import JSXAddon from "storybook-addon-jsx";

import * as React from "react";
import { Provider as ReduxProvider } from "react-redux";

import { StateReducer } from "../src/components/widget/state/reducers";
import configureStore from "../src/components/widget/state/store";
import SampleWidget from "../src/components/widget/widget";

setAddon(JSXAddon);

const store = configureStore({
        state: null,
    },
    StateReducer,
);

const storyNameSpace = storiesOf(SampleWidget.WrappedComponent.name, module) as (Story & {addWithJSX: any});

storyNameSpace
    .addDecorator((getStory) => <ReduxProvider store={store} children={getStory()}/>)
    .addWithJSX(SampleWidget.WrappedComponent.name, () => <SampleWidget name="Michael"/>);
