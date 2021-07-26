/* request api 

*/

import axios from "axios";
import {message} from "antd";


const MAXIMUM_TIMEOUT = 10000;

export default function ajax(url, data = {}, type = "GET") {
    let request;
    return new Promise((resolve,reject)=>{
        if(type==="GET"){ // GET request
            request =  axios.get(url,{
                params:data},{timeout:MAXIMUM_TIMEOUT});
         }else{
            request =  axios.post(url,data,{timeout:MAXIMUM_TIMEOUT});
         }

         request.then(response=>{
            resolve(response.data);
         }).catch(error=>{
            message.error("wrong request: "+error.message);
         })

    })

}
