import React from "react";
import './loading.css';

class HourGlassLoading extends React.Component{
    render() {
        return(
            <div className='main-loading-container'>
                <div className='hourglass-loading-container'>
                    <div className='hourglass-left-small-square'/>
                    <div className='hourglass-right-small-square'/>
                    <div className='hourglass-loader'>

                    </div>
                </div>
            </div>
        )
    }
}
export default HourGlassLoading