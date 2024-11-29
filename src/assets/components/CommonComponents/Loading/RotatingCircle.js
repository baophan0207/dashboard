import React from 'react';
import './loading.css';
import PropTypes from 'prop-types';


class RotatingCircle extends React.Component{
    render() {
        return(
            <div className='rotating-circle-loading-container'>
                <div className='rotating-circle-loading-text'>
                    {this.props.loadingText}
                </div>
                <div className='rotating-loading-spinner'>

                </div>
            </div>
        )
    }
}

RotatingCircle.propTypes={
    loadingText: PropTypes.string.isRequired,
}
export default RotatingCircle;