import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import logger from "redux-logger";

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { Provider } from "react-redux";

//reducer to set data based on inputs submitted
const feedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_FEELING":
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    case "SET_UNDERSTANDING":
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    case "SET_SUPPORT":
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    case "CLEAR_FEEDBACK":
      return {};
    case "DELETE_FEEDBACK":
      return state.filter((feedback) => feedback.id !== action.payload);
    default:
      return state;
  }
};

//reducer to hold input data in a list
const feedbackListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_FEEDBACK_LIST":
      return action.payload;
    case "CLEAR_FEEDBACK_LIST":
      return [];
    default:
      return state;
  }
};

const storeInstance = createStore(
  combineReducers({
    feedbackReducer,
    feedbackListReducer,
  }),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
