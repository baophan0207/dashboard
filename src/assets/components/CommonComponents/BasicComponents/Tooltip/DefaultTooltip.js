import React from "react";
import "./Tooltip.css";
import PropTypes from "prop-types";

export default class DefaultTooltip extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let {title, description} = this.props;
        return(
            <div className="default-tooltip-box">
                {
                    title !== null && title !== undefined && title !== "" &&
                    <div className="default-tooltip-box-title">{title}</div>
                }
                {
                    description !== null && description !== undefined && description !== "" &&
                    <div className="default-tooltip-box-description">
                        {description}
                    </div>
                }
            </div>
        )
    }
}

DefaultTooltip.propTypes = {
    title: PropTypes.any,
    description: PropTypes.string.isRequired
}