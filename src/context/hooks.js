import { useContext } from 'react';
import { headTitleContext, userContext } from './context';

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
