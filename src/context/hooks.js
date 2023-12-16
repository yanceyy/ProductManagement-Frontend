import { headTitleContext, userContext } from './context';

import { useContext } from 'react';

export function useHeadTitle() {
    const { headTitle, setHeadTitle } = useContext(headTitleContext);
    return {
        headTitle,
        setHeadTitle,
    };
}

export function useUser() {
    const { user, setUser } = useContext(userContext);

    return {
        user,
        setUser,
    };
}
