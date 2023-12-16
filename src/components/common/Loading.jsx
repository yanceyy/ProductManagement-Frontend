import './index.less';

import { Spin } from 'antd';

export function Loading() {
    return (
        <div className={'global-loading'}>
            <Spin size="large" />
        </div>
    );
}
