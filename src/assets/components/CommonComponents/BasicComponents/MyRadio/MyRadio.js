import React from "react";
import './MyRadio.css'
import {Radio} from "@material-ui/core";
import PropTypes from 'prop-types'

export default class MyRadio extends React.Component {
    render() {
        let {checked, onChange, name, disabled, value, color, size, className} = this.props
        return (
            <div className={className}>
                <Radio
                    checked={checked}
                    onChange={(e) => onChange(e)}
                    value={value}
                    name={name}
                    style={{
                        color: disabled ? "var(--disabled-color)" : color // disabled-color is #b4b4b4
                    }}
                    disabled={disabled}
                    size={size}
                />
            </div>
        )
    }
}

MyRadio.defaultProps = {
    color: "var(--primary-color)",
    checked: false,
    disabled: false,
    value: 'a',
    name: 'a',
    size: 'small'
}

MyRadio.propTypes = {
    color: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    className: PropTypes.string
}