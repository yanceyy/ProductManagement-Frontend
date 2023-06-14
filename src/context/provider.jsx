import { headTitleContext, userContext } from './context';
import { useState } from 'react';
import storageUtils from '../utils/storageUtils';

export const HeadTitleProvider = function ({ children }) {
    const [headTitle, setHeadTitle] = useState('Home');
    return (
        <headTitleContext.Provider value={{ headTitle, setHeadTitle }}>
            {children}
        </headTitleContext.Provider>
    );
};
export const UserProvider = function ({ children }) {
    const [user, setUser] = useState(() => storageUtils.getUser());
    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};
