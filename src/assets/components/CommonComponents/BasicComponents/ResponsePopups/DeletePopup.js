import React, { Component } from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import Icon from '../../../../icons/Icon';
import './deletePopup.css';

export default class DeleteNewPopup extends Component {
    render() {
        const { title, bodyText, confirmButtonLabel, cancelButtonLabel, onClose, onCancel, onDelete, open } = this.props;
        const contentStyle = { width: 'fit-content',borderRadius: 0,padding: 0, border:'none' };
        const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
        return (
            <div className="popup-container">
                <div>
                    <Popup
                        open={open}
                        closeOnDocumentClick={false}
                        lockScroll
                        contentStyle={contentStyle}
                        overlayStyle={overlayStyle}
                    >
                        <div className="delete-model-modal-container">
                            <div className="delete-model-modal-body-container">
                                <div>
                                    <div className="delete-model-modal-heading">
                                        <span>{title}</span>
                                    </div>
                                    <div className="delete-model-modal-info">
                                        <span>{bodyText}</span>
                                    </div>
                                </div>
                                <span className="delete-model-modal-close-container" onClick={onClose}><Icon icon='close' size={16} className='delete-popup-close-icon' /></span>
                            </div>
                            <div className="delete-model-modal-footer-container">
                                <button className="delete-model-modal-cancel-button" onClick={onCancel === undefined ? onClose : onCancel} >{cancelButtonLabel}</button>
                                <button className="delete-model-modal-confirm-button" onClick={onDelete}>{confirmButtonLabel}</button>
                            </div>
                        </div>
                    </Popup>
                </div>
            </div>
        );
    }
}

DeleteNewPopup.propTypes = {
    title: PropTypes.string,
    bodyText: PropTypes.string.isRequired,
    confirmButtonLabel: PropTypes.string,
    cancelButtonLabel: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

DeleteNewPopup.defaultProps = {
    bodyText: "Are you sure to delete this?",
    confirmButtonLabel: "Delete",
    cancelButtonLabel: "Cancel",
}

