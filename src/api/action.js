import ajax from "./ajax"


export const login = (username,password)=>ajax("http://localhost:3000/login",{username,password},'POST')

export const addUser = (username,password)=> ajax("http://159.75.128.32:3000/api/user/add",{username,password},'POST')
