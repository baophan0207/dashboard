import React from 'react';
import './loading.css';

class MoonLoading extends React.Component{
    render() {
        return(
            <div className='main-loading-container'>
                <div className='moon-loading-container'>
                    <div className='moon-loading rotate-moon'/>
                </div>
            </div>
        )
    }
}
export default MoonLoading;