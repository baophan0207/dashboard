import React from "react";
import "./loadingStyle.less"
import "./loadingStyle.css"
import PropTypes from "prop-types";


class Loading extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            noOfCircle: 8
        }
    }

    getLoadingCircle(){
        let count =this.state.noOfCircle;
        let size=20;
        let duration = 1.5;
        let circles = [];
        if(this.props.count !== undefined && this.props.count !== null){
            count = this.props.count
        }
        if(this.props.circleSize !== undefined && this.props.circleSize !== null){
            size = this.props.circleSize;
        }

        if(this.props.duration !== undefined && this.props.duration !== null){
            duration = this.props.duration;
        }

        for(let i=0;i<count;i++){
            let delayTime = i*0.15 + 0.6;
            circles.push(
                <div className="linear-pulsate-circle"
                     style={{
                         animationDelay:delayTime+"s",
                         width: size+"px",
                         height: size+"px",
                         animationDuration:duration+"s"}}/>);
        }
        return(circles)
    }

    render() {
        const {title,direction,color} = this.props;
        return (
            <div className='loading-layout' style={{flexDirection:direction}}>
                {
                    title !== undefined && title !== null?
                        <div className='loading-title' style={{color: color !== undefined && color !== null ? color:"var(--primary-color)"}}>{title}</div>
                        :
                        null
                }

                <div className="linear-pulsate-circle-container"
                     style={{width: this.props.width!==undefined && this.props.width !== null?this.props.width+"px":"246px"}}>
                    {this.getLoadingCircle()}
                </div>
            </div>
        )

    }
}


Loading.propTypes = {
    width: PropTypes.number,
    circleSize: PropTypes.number,
    duration: PropTypes.number,
    count: PropTypes.number,
    direction: PropTypes.oneOf(["column","row"]),
    title:PropTypes.string.isRequired,
};

export default Loading;