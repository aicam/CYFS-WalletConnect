import React, {useEffect} from 'react';
import styles from './App.module.less';
import {init} from '@www/initialize';
import Welcome from '@www/pages/Welcome/Welcome';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";
import {ApplicationState} from "./stores";
import {Store} from "redux";
import {History} from "history";
import GreenomicsHomepage from '@www/pages/Welcome/Welcome';
import RouterComponent from './routerComponent';

import {
    createBrowserRouter,
    RouterProvider,
    Route,
    BrowserRouter
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GreenomicsHomepage/>,
    },
    {
        path: "/test",
        element: <div>Hello World</div>
    }
]);

interface MainProps {
    store: Store<ApplicationState>;
    history: History;
}

const App: React.FC<MainProps> = ({store, history}) => {
    useEffect(() => {
        init();
    }, []);
    return (
        <BrowserRouter>
            <Provider store={store}>
                <RouterComponent />
            </Provider>
        </BrowserRouter>
    );
}

export default App;