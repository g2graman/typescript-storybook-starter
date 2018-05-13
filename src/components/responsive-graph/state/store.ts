import { applyMiddleware, compose, createStore, Middleware, Reducer } from "redux";
import { createLogger } from "redux-logger";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const isDevelopment = process.env.NODE_ENV === "development";

const configureStore = (initialState = {}, reducer: Reducer) => {
    const logger: Middleware = createLogger({collapsed: true});

    const middlewares: Middleware[] = [];

    if (isDevelopment) {
        middlewares.push(logger);
    }

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
        // other store enhancers if any
    );

    return createStore(
        reducer,
        initialState,
        enhancer,
    );
};

export default configureStore;
