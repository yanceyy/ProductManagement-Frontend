import ajax from './ajax';
import { BASEURL } from '../utils/constants';

/*
account login
*/
export const login = (username, password) =>
    ajax(
        BASEURL + '/login',
        {
            username,
            password,
        },
        'POST',
    );

/*
signup new user
*/

export const addUser = (username, password) =>
    ajax(
        BASEURL + '/api/user/add',
        {
            username,
            password,
        },
        'POST',
    );

/*
read category list
*/

export const reGetCategory = (parentId) =>
    ajax(BASEURL + '/manage/category/list', { parentId });

/*
add category
*/
export const reAddCategory = (parentId, categoryName) =>
    ajax(
        BASEURL + '/manage/category/add',
        {
            parentId,
            categoryName,
        },
        'POST',
    );

/*
update category list
*/

export const reUpdateCategory = (categoryId, categoryName) =>
    ajax(
        BASEURL + '/manage/category/update',
        {
            categoryId,
            categoryName,
        },
        'POST',
    );

/*
get product list
*/
export const reGetList = (pageNum, pageSize) =>
    ajax(
        BASEURL + '/manage/product/list',
        {
            pageNum,
            pageSize,
        },
        'GET',
    );

/*
search product
*/
export const reSearchProducts = (pageNum, pageSize, searchName, searchType) =>
    ajax(
        BASEURL + '/manage/product/search',
        {
            pageNum,
            pageSize,
            [searchType]: searchName,
        },
        'GET',
    );

/*
Get category name by Id
*/
export const reGetCategoryById = (categoryId) =>
    ajax(
        BASEURL + '/manage/category/info',
        {
            categoryId,
        },
        'GET',
    );

/*
Update the status of product
 */
export const reUpdateStatus = (productId, status) =>
    ajax(
        BASEURL + '/manage/product/updateStatus',
        {
            productId,
            status,
        },
        'POST',
    );

/*
Delete Pictures
 */
export const reDeletePicture = (name) =>
    ajax(
        BASEURL + '/manage/img/delete',
        {
            name,
        },
        'POST',
    );

/*
Add and update products
*/

export const reAddUpdateProduct = (product) =>
    ajax(
        BASEURL + '/manage/product/' + (product._id ? 'update' : 'add'),
        {
            ...product,
        },
        'POST',
    );

/*
Obatin role list
*/

export const reGetRoleList = () => ajax(BASEURL + '/manage/role/list', 'GET');

/*
Create role
*/

export const reCreateRole = (roleName) =>
    ajax(
        BASEURL + '/manage/role/add',
        {
            roleName,
        },
        'POST',
    );

/*
Update role
*/

export const reUpdateRole = ({ _id, menus, auth_time, auth_name }) =>
    ajax(
        BASEURL + '/manage/role/update',
        {
            _id,
            menus,
            auth_time,
            auth_name,
        },
        'POST',
    );

/*
Add user
*/

export const reAddUser = ({ username, password, phone, email, role_id }) =>
    ajax(
        BASEURL + '/manage/user/add',
        {
            username,
            password,
            phone,
            email,
            role_id,
        },
        'POST',
    );

/*
Obatin user list
*/

export const reGetUserList = () => ajax(BASEURL + '/manage/user/list', 'GET');

/*
Delete user
*/

export const reDeleteUser = (userId) =>
    ajax(BASEURL + '/manage/user/delete', { userId }, 'POST');

/*
Add user
*/

export const reUpdateUser = ({
    _id,
    username,
    password,
    phone,
    email,
    role_id,
}) =>
    ajax(
        BASEURL + '/manage/user/update',
        {
            _id,
            username,
            password,
            phone,
            email,
            role_id,
        },
        'POST',
    );
