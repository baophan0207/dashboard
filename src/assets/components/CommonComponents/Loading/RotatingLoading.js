import React from 'react';

class RotatingLoading extends React.Component{
    render() {
        let {title} = this.props;
        return (
            <div className='simple-rotate-loading-container'>
                <div className = "main-loading-text">{title}</div>
                <div className='main-loading-spinner'>
                </div>
            </div>
        );
    }
}
export default RotatingLoading;