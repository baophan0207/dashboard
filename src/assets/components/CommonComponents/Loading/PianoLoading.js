import React from "react";
import "./loadingStyle.less"
import "./loadingStyle.css"
import PropTypes from "prop-types";


class PianoLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noOfCircle: 8
        }
    }

    getLoadingCircle() {
        const {circleSize, duration, count, color} = this.props;
        let circles = [];
        for (let i = 0; i < count; i++) {
            let delayTime = i * 0.15 + 0.6;
            circles.push(
                <div className="linear-pulsate-circle"
                     key={i}
                     style={{
                         animationDelay: delayTime + "s",
                         width: circleSize + "px",
                         height: circleSize + "px",
                         color: color,
                         animationDuration: duration + "s",
                     }}/>);
        }
        return (circles)
    }

    render() {
        const {
            width,
            direction,
            title,
            color,
        } = this.props;
        return (
            <div className='loading-layout' style={{flexDirection: direction}}>
                <div className="piano-loading-title" style={{color: color}}>{title}</div>
                <div className="linear-pulsate-circle-container"
                     style={{width: width}}>
                    {this.getLoadingCircle()}
                </div>
            </div>
        )

    }
}

PianoLoading.defaultProps = {
    width: 246,
    circleSize: 15,
    duration: 1.5,
    count: 8,
    color: "var(--primary-color)",
    direction: "column",
    title: "Loading"
}

PianoLoading.propTypes = {
    width: PropTypes.number,
    circleSize: PropTypes.number,
    duration: PropTypes.number,
    count: PropTypes.number,
    color: PropTypes.string,
    direction: PropTypes.oneOf(["column", "row"]),
    title: PropTypes.string.isRequired,
};

export default PianoLoading;