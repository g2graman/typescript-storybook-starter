import { applyMiddleware, createStore, Middleware, Reducer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createLogger } from "redux-logger";

const isDevelopment = process.env.NODE_ENV === "development";

const configureStore = (initialState = {}, reducer: Reducer) => {
    const logger: Middleware = createLogger({collapsed: true});

    const middlewares: Middleware[] = [];

    if (isDevelopment) {
        middlewares.push(logger);
    }

    return createStore(
        reducer,
        initialState,
        composeWithDevTools({})(
            applyMiddleware(
                ...middlewares,
            ),
        ),
    );
};

export default configureStore;
