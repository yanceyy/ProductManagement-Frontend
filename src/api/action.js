import ajax from "./ajax"


export const login = (username,password)=>ajax("http://localhost:3000/login",{username,password},'POST')

export const addUser = (username,password)=> ajax("http://localhost:3000/api/user/add",{username,password},'POST')

export const regetCategory = (parentId)=> ajax("http://localhost:3000/manage/category/list",{parentId})

export const readdCategory = (parentId,categoryName)=> ajax("http://localhost:3000/manage/category/add",{parentId,categoryName},'POST')
export const reupdateCategory = (categoryId,categoryName)=> ajax("http://localhost:3000/manage/category/update",{categoryId,categoryName},'POST')