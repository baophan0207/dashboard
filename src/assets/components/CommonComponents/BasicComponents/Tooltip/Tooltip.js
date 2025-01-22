import React, {Component} from "react";
import {Tooltip} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types'

export class MyTooltip extends Component {

    render() {
        const {title, tooltipType, isArrow, position, style, maxWidth} = this.props

        const gettingColors = () => {
            switch (tooltipType) {
                case "error":
                    return ["var(--error-color)", "white"]
                case "warning":
                    return ["var(--warning-color)", "white"]
                case "information":
                    return ["var(--light-sky)", "black"]
                default :
                    return ["white", "#555555"]
            }
        }

        const CustomToolTip = withStyles(theme => ({
            arrow: {
                color: style ? style.backgroundColor : gettingColors()[0],
                fontSize: 20,

                "&::before": {
                    border: style ? style.border : `1px solid ${tooltipType === "normal" ? "#cdcdcd" : "transparent"}`,
                }
            },
            tooltip: {
                backgroundColor: style ? style.backgroundColor : gettingColors()[0],
                color: style ? style.color : gettingColors()[1],
                border: style ? style.border : `1px solid ${tooltipType === "normal" ? "#cdcdcd" : "transparent"}`,
                fontSize: style ? style.fontSize : 10,
                borderRadius: "3px",
                boxShadow: "0px 1px 10px 0px rgba(0, 0, 0, 0.25)",
                maxWidth: maxWidth
            },
        }))(Tooltip);

        return (
            position?
                <CustomToolTip arrow={isArrow} title={title} placement={position}>
                    {this.props.children}
                </CustomToolTip>
                :

                <CustomToolTip arrow={isArrow} title={title}>
                    {this.props.children}
                </CustomToolTip>
        )
    }
}

MyTooltip.defaultProps = {
    title: "sample",
    isArrow: true,
    tooltipType: "normal",
    position: "",
    maxWidth: 300
}


MyTooltip.propTypes = {
    title: PropTypes.string.isRequired,
    isArrow: PropTypes.bool,
    maxWidth: PropTypes.number,
    tooltipType: PropTypes.oneOf(["error", "warning", "normal", "information"]).isRequired,
    position: PropTypes.oneOf(['bottom-end',
        'bottom-start',
        'bottom',
        'left-end',
        'left-start',
        'left',
        'right-end',
        'right-start',
        'right',
        'top-end',
        'top-start',
        'top']).isRequired
}