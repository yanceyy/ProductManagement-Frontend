/* request api 

*/

import axios from "axios";

export default function ajax(url, data = {}, type = "GET") {
    if(type==="GET"){ // GET request
       return axios.get(url,{
           params:data})
    }else{
        return axios.post(url,data)
    }
}
