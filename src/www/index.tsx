import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";
import App from './App'

const history = createBrowserHistory();
const initialState: any = {};
const store = configureStore(history, initialState);

import 'antd/dist/antd.css';
import {createHashRouter} from "react-router-dom";
import GreenomicsHomepage from "@www/pages/Welcome/Welcome";


ReactDOM.render(
    <App store={store} history={history} />,
    document.getElementById('root')
)
;
