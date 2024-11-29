import React from 'react';
import './loading.css';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";

class SimpleLoading extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Popup
                contentStyle={{
                    background: 'transparent',
                    width: 'auto',
                    height: 'auto',
                    textAlign: 'center',
                    border: 'none',

                }}
                open={this.props.open}
                lockScroll={true}
                closeOnDocumentClick={false}>
                <button className="loadingContainer">
                    {this.props.loadingText} &emsp;
                    <span className="loading-icon"/>
                </button>
            </Popup>
        )
    }
}
SimpleLoading.defaultProps = {
    open: false,
    loadingText: "Loading",
}
SimpleLoading.propTypes = {
    open : PropTypes.bool.isRequired,
    loadingText : PropTypes.string.isRequired
}
export default SimpleLoading;