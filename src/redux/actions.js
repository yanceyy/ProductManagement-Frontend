import { SET_HEAD_TITLE } from './action-types';

/*
set the title
*/

export const setHeadTitle = (title) => ({ type: SET_HEAD_TITLE, data: title });
