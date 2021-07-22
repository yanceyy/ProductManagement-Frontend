import ajax from "./ajax"


export const login = (username,password)=>ajax("http://159.75.128.32:5000/api/user/login",{name: username,password},'POST')

export const addUser = (username,password)=> ajax("http://159.75.128.32:5000/api/user/add",{name: username,password},'POST')
