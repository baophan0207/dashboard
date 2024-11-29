import React from "react";
import './loading.css'
import PropTypes from "prop-types";

class TwoCircleLoading extends React.Component{
    render() {
        return(
            <div className='two-circle-loading-container'>
                <div className="two-circle-loading-text" style={{color:this.props.textColor}}>
                    {
                        this.props.loadingText !== undefined && this.props.loadingText !== null ?
                            this.props.loadingText
                            :
                            null
                    }
                </div>
                <div className='Circle Circle-rotate'/>
            </div>
        )
    }
}
TwoCircleLoading.propTypes = {
    loadingText: PropTypes.string,
};
export default TwoCircleLoading;