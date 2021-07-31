import ajax from "./ajax"

const BASEURL = "http://localhost:3000"


/*
account login
*/
export const login = (username, password) => ajax(BASEURL + "/login", {
    username,
    password
}, 'POST')


/*
signup new user
*/

export const addUser = (username, password) => ajax(BASEURL + "/api/user/add", {
    username,
    password
}, 'POST')


/*
read category list
*/

export const regetCategory = (parentId) => ajax(BASEURL + "/manage/category/list", {parentId})


/*
add category
*/
export const readdCategory = (parentId, categoryName) => ajax(BASEURL + "/manage/category/add", {
    parentId,
    categoryName
}, 'POST')


/*
update category list
*/

export const reupdateCategory = (categoryId, categoryName) => ajax(BASEURL + "/manage/category/update", {
    categoryId,
    categoryName
}, 'POST')


/*
get product list
*/
export const regetList = (pageNum, pageSize) => ajax(BASEURL + "/manage/product/list", {
    pageNum,
    pageSize
}, 'GET')


/*
search product
*/
export const researchProducts = (pageNum, pageSize, searchName, searchType) => ajax(BASEURL + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName
}, 'GET')

/*
Get category name by Id
*/
export const regetCategoryById = (categoryId) => ajax(BASEURL + "/manage/category/info", {
    categoryId
}, 'GET')


/*
Update the status of product
 */
export const reupdateStatus = (productId, status) => ajax(BASEURL + "/manage/product/updateStatus", {
    productId,
    status
}, 'POST')
