import React from 'react';
import './loading.css';
import PropTypes from 'prop-types';


class CircleSwipeLoading extends React.Component{
    render() {
        let {loadingMessage,loadingColor,direction}= this.props;
        return (
            <div className="swipe-circle-loading-container" style={{flexDirection: direction}}>
                <div style={{color: loadingColor !== undefined && loadingColor !== null && loadingColor !== "" ? loadingColor: "#cdcdcd"}} className='circle-swipe-loading-message'>{loadingMessage}</div>
                <div className='swipe-circle-loading' >
                    <div style={{background: loadingColor !== undefined && loadingColor !== null && loadingColor !== "" ? loadingColor: "#cdcdcd"}}/>
                    <div style={{background: loadingColor !== undefined && loadingColor !== null && loadingColor !== "" ? loadingColor: "#cdcdcd"}}/>
                    <div style={{background: loadingColor !== undefined && loadingColor !== null && loadingColor !== "" ? loadingColor: "#cdcdcd"}}/>
                    <div style={{background: loadingColor !== undefined && loadingColor !== null && loadingColor !== "" ? loadingColor: "#cdcdcd"}}/>
                </div>
            </div>
        );
    }
}
CircleSwipeLoading.defaultValues={
    loadingMessage: "Loading",
    loadingColor:   '#cdcdcd',
    direction: 'row',
}
CircleSwipeLoading.propType= {
    loadingMessage: PropTypes.string,
    loadingColor: PropTypes.string,
    direction: PropTypes.string,
}
export default CircleSwipeLoading;