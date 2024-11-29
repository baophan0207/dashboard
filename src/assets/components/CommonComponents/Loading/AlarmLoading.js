import React from 'react';
import './loading.css';
import PropTypes from "prop-types";

class AlarmLoading extends React.Component{
    render() {
        return(
            <div className='alarm-loading-container'>
                   <span className="two-circle-loading-text">
                        {
                            this.props.loadingText !== undefined && this.props.loadingText !== null?
                                this.props.loadingText
                                :
                                null
                        }
                    </span>
                <div className='alarm-loading'>
                    <div/>
                    <div/>

                </div>
            </div>
        )
    }
}

AlarmLoading.defaultTypes = {
    loadingText: "Loading"
}
AlarmLoading.propTypes = {
    loadingText: PropTypes.string.isRequired
}
export default AlarmLoading;

