import React from "react";
import PropTypes from "prop-types";
import MyTable from "../MyTable/MyTable";
import {MyTooltip} from "../BasicComponents/Tooltip/Tooltip";
import Icon from "../../../IconLibrary/Icon";

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {type, disabled, className, title, onClick, children} = this.props;
        let buttonClassName = type === "primary" ? "main-cta-btn" :
            type === "secondary" ? "main-secondary-btn" :
                type === "delete" ? "default-delete-btn" :
                    type === "icon" ? "menu-button" :
                        type === "link" ? "default-link-btn" :
                            type === "negativeIcon" ? "menu-button-delete" :
                            type === "exit" ? "main-exit-btn" :
                                "main-secondary-btn";
        if (className !== undefined && className !== null) {
            buttonClassName = buttonClassName + " " + className
        }
        return (
            type === "exit"?
                <MyTooltip title={"Close"}>
                    <button className="main-exit-btn" onClick={onClick}>
                        <Icon icon={"cross"} size={10}/>
                    </button>
                </MyTooltip>
                :
                <MyTooltip title={title}>
                    <button className={buttonClassName}
                            disabled={disabled}
                            onClick={onClick}>
                        {children}
                    </button>
                </MyTooltip>
        );
    }

}

Button.defaultProps = {
    type: "primary",
    disabled: false,
    title: ""
}

Button.propTypes = {
    type: PropTypes.oneOf(["primary", "secondary", "delete", "link", "negativeIcon", "icon", "exit"]),
    disabled: PropTypes.bool,
    title: PropTypes.any,
}
