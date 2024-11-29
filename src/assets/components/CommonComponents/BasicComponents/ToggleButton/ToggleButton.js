import React, { Component } from "react";
import "./toggleButton.css";
import PropTypes from "prop-types";
import Icon from "../../../../IconLibrary/Icon";

export default class ToggleButton extends Component {
    constructor(props) {
        super(props);
        const activeOption = this.props.activeOption;
        this.state = {
            activeOption: activeOption,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeOption !== prevProps.activeOption) {
            this.setState({
                activeOption: this.props.activeOption,
            })
        }
    }

    render() {
        const { options, activeOption, disabled, onClickOptionHandler, height } = this.props;
        const btns = options.map((option, index) =>
            {
                const activeOptionBtnDesign = (activeOption === option.name) ? "toggle-button-active-option-btn" : "";
                return (
                    <button
                        key={index}
                        value={option.name}
                        onClick={(e) => onClickOptionHandler(e.currentTarget.value)}
                        className={`toggle-button-option-button ${activeOptionBtnDesign}`}
                        style={{
                            backgroundColor: (activeOption === option.name) ? option.activeColor : "",
                            height: height,
                            maxHeight: height,
                            width: this.props.width !== "fit-content"?"calc(100% / "+this.props.options.length:"fit-content"
                        }}
                        disabled={disabled}
                    >
                        <div className="toggle-button-button-label-container">
                            {
                                (option.icon) ?
                                    <span className="toggle-button-button-icon">
                                        {option.icon}
                                    </span>
                                    :""

                            }
                            <span className="toggle-button-button-label">
                                {option.name}
                            </span>
                        </div>
                    </button>
                );
            }
        );
        return (
            <div className="toggle-button-container">
                <div className="toggle-button-container-background" style={{width: this.props.width}}>
                    <div className="toggle-button-buttons">
                        {btns}
                    </div>
                </div>
                <div className="toggle-button-button-indicator"></div>
            </div>
        );
    }
}

ToggleButton.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        activeColor: PropTypes.string,
        icon: PropTypes.instanceOf(Icon),
    })),
    activeOption: PropTypes.string.isRequired,
    onClickOptionHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    height: PropTypes.any,
}

ToggleButton.defaultProps = {
    disabled: false,
    options: [
        {
            name: "Yes",
            activeColor: "var(--primary-color)",
        },
        {
            name: "No",
            activeColor: "var(--primary-color)"
        }
    ],
    activeOption: "Yes",
    height: "24px",
    width: "fit-content"
}