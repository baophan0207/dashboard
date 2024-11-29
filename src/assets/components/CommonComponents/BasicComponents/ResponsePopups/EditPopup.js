import React from "react";
import Icon from "../../../../icons/Icon";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import BeaconSpot from "../../BeaconSpot";
class EditPopup extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getInfo(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getInfo(nextProps)
    }

    getInfo(passedData){
        if (passedData.disabledSubmit !== undefined && passedData.disabledSubmit !== null){
            let {disabledSubmit, open} = this.props;
            if(open === undefined){
                open = false
            }
            this.setState({
                disabledSubmit: disabledSubmit,
                open
            })
        }
    }

    render() {
        let {openBeaconSpot} = this.props;
        return (
            this.props.open?
            <Popup contentStyle={{
                width: "auto",
                background: "transparent",
                border: "none",
                borderRadius: 0,
                padding: 0
            }}
                   open={this.props.open}
                   closeOnDocumentClick={false}
                   lockScroll={true}>
                <div className="edit-popup">
                    <div className="edit-header">
                        {/*{*/}
                        {/*    icon === ""?*/}
                        {/*        null*/}
                        {/*        :*/}
                        {/*        <Icon className="edit-icon" icon={icon} size={20}/>*/}
                        {/*}*/}
                        <div className="edit-title">
                            {
                                this.props.title !== undefined && this.props.title !== null?
                                    this.props.title
                                    :
                                    "Edit"
                            }
                        </div>
                        <button className="response-popup-exit-btn" onClick={this.props.onClose}>
                            <Icon icon={"close"} fill={'white'} />
                        </button>

                    </div>
                    {
                        this.props.children
                    }

                    <div className="edit-btn-row">
                        <button className="edit-cancel-btn" onClick={this.props.onClose}>
                            <Icon icon="close" className="edit-cancel-icon" size={14}/> Cancel
                        </button>

                        <button className="edit-submit-btn" disabled={this.props.disabledSubmit} ref={this.props.submitRef} onClick={this.props.onSubmit}>
                           <Icon icon="check_circle_outline" className="edit-submit-icon" size={16}/> {this.props.submitText}
                            {
                                openBeaconSpot === true ?
                                    <BeaconSpot
                                        open={true}
                                        spotStyle={{color: "green"}}
                                    />
                                    : null
                            }
                        </button>
                    </div>
                </div>

            </Popup>
                :
                null
        );
    }

}

EditPopup.defaultProps = {
    icon:           "edit",
    submitText : 'Submit',
}

EditPopup.propTypes = {
    icon:           PropTypes.string,
    open:           PropTypes.bool.isRequired,
    title:          PropTypes.string.isRequired,
    onClose:        PropTypes.func.isRequired,
    onSubmit:       PropTypes.func.isRequired,
    disabledSubmit: PropTypes.bool.isRequired,
    submitText: PropTypes.string
};

export default EditPopup