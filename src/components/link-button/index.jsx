import './index.less';

export default function LinkButton(props) {
    return (
        <button className="link-button" onClick={props.onClick}>
            {props.children}
        </button>
    );
}
