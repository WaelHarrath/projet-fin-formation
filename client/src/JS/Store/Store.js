//imports
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "../Reducers";
import thunk from "redux-thunk";

//compose enhancer
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//creation du store
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
