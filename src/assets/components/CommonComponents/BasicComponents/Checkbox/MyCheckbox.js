import React from "react";
import "./checkbox.css";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import PropTypes from "prop-types";

export default class MyCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {
            color,
            checked,
            onChange,
            disabled,
            className,
        } = this.props;
        return (
            <div className={className}>
                <Checkbox size={"small"}
                          disabled={disabled}
                          onChange={onChange}
                          checked={checked}
                          style={{
                              color: disabled ? "var(--disabled-color)" : color // disabled-color is #b4b4b4
                          }}/>
            </div>
        );
    }
}


MyCheckbox.defaultProps = {
    color: "var(--primary-color)",
    className: "check-box-container",
    checked: false,
    disabled: false,
};

MyCheckbox.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
}