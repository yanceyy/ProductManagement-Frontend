import ajax from './ajax';
import {BASEURL} from '../utils/constants';

/*
account login
*/
export const login = (username, password) =>
    ajax(
        BASEURL + '/auth/login',
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
    ajax(BASEURL + '/category', {parentId});

/*
add category
*/
export const reAddCategory = (pCategoryId, name) =>
    ajax(
        BASEURL + '/category',
        {
            pCategoryId,
            name,
        },
        'Post',
    );

/*
update category list
*/

export const reUpdateCategory = (categoryId, name) =>
    ajax(
        BASEURL + `/category/${categoryId}`,
        {
            name
        },
        'Patch',
    );

/*
get a product list
*/
export const reGetList = (pageNum, pageSize) =>
    ajax(
        BASEURL + '/product',
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
        BASEURL + '/product/search',
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
        BASEURL + `/category/${categoryId}`,
        {},
        'GET',
    );

/*
Update the status of product
 */
export const reUpdateStatus = (productId, status) =>
    ajax(
        BASEURL + `/product/${productId}`,
        {
            status,
        },
        'Patch',
    );

/*
Delete Pictures
 */
export const reDeletePicture = (name) =>
    ajax(
        BASEURL + `/upload/image/${name}`,
        {},
        'Delete',
    );

/*
Add products
*/

export const reAddProduct = (product) => {
    return ajax(
        BASEURL + '/product',
        {
            ...product,
        },
        'Post',
    );
}

/*
Update products
*/

export const reUpdateProduct = (id, product) => {
    return ajax(
        BASEURL + `/product/${id}`,
        {
            ...product,
        },
        'Patch',
    );
}


/*
Obatin role list
*/

export const reGetRoleList = () => ajax(BASEURL + '/role');

/*
Create role
*/

export const reCreateRole = (name) =>
    ajax(
        BASEURL + '/role',
        {
            name,
        },
        'POST',
    );

/*
Update role
*/

export const reUpdateRole = ({_id, policies}) =>
    ajax(
        BASEURL + `/role/${_id}`,
        {
            policies
        },
        'patch',
    );

/*
Add user
*/

export const reAddUser = ({username, password, phone, email, roleId}) =>
    ajax(
        BASEURL + '/user',
        {
            username,
            password,
            phone,
            email,
            roleId,
        },
        'post',
    );

/*
Obatin user list
*/

export const reGetUserList = () => ajax(BASEURL + '/user');

/*
Delete user
*/

export const reDeleteUser = (userId) =>
    ajax(BASEURL + `/user/${userId}`, {}, 'Delete');

/*
Add user
*/

export const reUpdateUser = ({
                                 _id,
                                 username,
                                 password,
                                 phone,
                                 email,
                                 roleId,
                             }) =>
    ajax(
        BASEURL + `/user/${_id}`,
        {
            username,
            password,
            phone,
            email,
            roleId
        },
        'Patch',
    );
