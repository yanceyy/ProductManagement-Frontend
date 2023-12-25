/* request api

*/

import axios from "axios";
import {message} from "antd";
import memoryUtils from "../utils/memoryUtils";

window.as = axios

function removeNullAndUndefined(obj) {
    obj = JSON.parse(JSON.stringify(obj));

    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') {
            removeNullAndUndefined(obj[key]);
        } else if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
        }
    });

    return obj;
}


const MAXIMUM_TIMEOUT = 10000;

export default function ajax(url, data = {}, method = "GET") {
    let request;

    data = removeNullAndUndefined(data);

    return new Promise((resolve) => {

        // add authorization token in header
        const bearerToken = memoryUtils?.user?.token

        // Prepare the headers
        const headers = {
            Authorization: `Bearer ${bearerToken}` // Set the Authorization header
        };

        if (method === "GET") { // GET request
            request = axios.get(url, {
                params: data,
                headers: headers,
                timeout: MAXIMUM_TIMEOUT
            });
        } else {
            request = axios({url, method: method, data, headers: headers, timeout: MAXIMUM_TIMEOUT});
        }

        request.then(response => {
            resolve(response.data);
        }).catch(error => {
            const returnedErrorMessage = error?.response?.data?.message

            // Unauthorized error we clear the local storage info and redirect to login page
            if (error?.response.status === 401) {
                localStorage.removeItem("user_key")
                delete memoryUtils?.user;
                window.location.href = '/login';
            }

            message.error(returnedErrorMessage || error.message);
        })

    })
}
