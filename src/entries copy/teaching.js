/* eslint-disable import/default */

import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import renderRoutes from "../routes/renderer/RouteRenderer";
import configureStore from "../store/configureStore";
import TeachingRoute from "../routes/TeachingRoute";
import BaseRoute from "../routes/BaseRoute";

import "../../node_modules/toastr/build/toastr.min.css";
import "../styles/react-bootstrap-switch.min.css";
import "../styles/dragula.css";
import "../modules/tasks/task.css";
import "../styles/react-select.css";
import "../styles/react-draft-wysiwyg.css";
import "../styles/styles.scss";
// import { syncHistoryWithStore } from 'react-router-redux';

import rootReducer from "../reducers/index";
const store = configureStore({}, rootReducer);

// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);

const Route = [
    ...TeachingRoute,
    ...BaseRoute,
];

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={renderRoutes(Route)} />
    </Provider>,
    document.getElementById("app"),
);
