/* request api

*/

import axios from "axios";
import {message} from "antd";
import memoryUtils from "../utils/memoryUtils";

window.as = axios


const MAXIMUM_TIMEOUT = 10000;

export default function ajax(url, data = {}, method = "GET") {
    let request;
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
            message.error(returnedErrorMessage || error.message);
        })

    })
}
