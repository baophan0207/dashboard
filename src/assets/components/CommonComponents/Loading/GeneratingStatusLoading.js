import React from 'react';
import './loading.css';
import PropTypes from 'prop-types';
import Icon from "../../../icons/Icon";

class GeneratingStatusLoading extends React.Component{
    render() {
        let {statusName } = this.props;
        return (
            <div className="status-loading-container">
                <label className="status-loading-color">{statusName}</label>&nbsp;
                <Icon icon="app6" size={20}
                      className="generating-loading-icon"/>
            </div>
        );
    }
}

GeneratingStatusLoading.defaultProps={
    statusName: ""
}
GeneratingStatusLoading.propTypes={
    statusName: PropTypes.string.isRequired,
    loadingSpeed: PropTypes.number,
};
export default GeneratingStatusLoading;