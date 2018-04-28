import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import * as YOUTUBE_API from "../utils/searchUtil";
import RootReducer from "../reducers/rootReducer";

const store = createStore(
    RootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware.withExtraArgument({ YOUTUBE_API }))
);

export default store;
