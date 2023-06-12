import {Spin} from "antd";
import "./index.less";

export function Loading() {
    return (
        <div className={"global-loading"}>
            <Spin size="large"/>
        </div>
    )
}