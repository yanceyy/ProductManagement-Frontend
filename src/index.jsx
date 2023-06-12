import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from "./redux/store"

import storageUtils from "./utils/storageUtils";
import memoryUtils from "./utils/memoryUtils"

const user = storageUtils.getUser()
memoryUtils.user = user;

ReactDOM.render (
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'));
