import React from "react";
import "./responsePopup.css";
import Popup from "reactjs-popup";
import PropTypes from 'prop-types';
import {Scrollbars} from "react-custom-scrollbars";
import Icon from "../../../../icons/Icon";

class InfoPopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type: "info",
            primaryColor: "var(--light-sky)",
            secondaryColor: "#eeffea",
        }

    }

    componentDidMount() {
        this.getInfo(this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getInfo(nextProps)
    }

    getInfo(passedData){
        if(passedData.type !== undefined && passedData.type !== null){
            let {type} = passedData;
            if(type === "success"){
                this.setState({
                    type: "success",
                    primaryColor: "#1A9D6E"
                })
            }
            else if(type === "fail"){
                this.setState({
                    type: "success",
                    primaryColor: "#F86A6A"
                })
            }
            else if(type === "warning"){
                this.setState({
                    type: "warning",
                    primaryColor: "#F6864B",
                    // primaryColor: "#F6A454",
                })
            }
            else{
                this.setState({
                    type: "info",
                    primaryColor: "var(--light-sky)"
                })
            }
        }
    }


    render() {
        return (
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
                <div className="info-popup">
                    <div className="info-header">
                        <div className="info-popup-title-division">
                            {/*<Icon className="info-icon" icon={"info"} size={24}/>*/}
                            <div className="info-title">
                                {
                                    this.props.title !== undefined && this.props.title !== null?
                                        this.props.title
                                        :
                                        "Info"
                                }
                            </div>
                        </div>

                        {
                            this.props.noExitButton !== undefined && this.props.noExitButton?
                                null
                                :
                                <button className="info-popup-exit-btn" onClick={this.props.onClose}>
                                    <Icon icon={"close"}/>
                                </button>
                        }

                    </div>
                    <div className="info-body"  style={{
                        minHeight: this.props.contextHeight !== undefined && this.props.contextHeight !== null? this.props.contextHeight : "150px",
                        height: 'auto',
                        overflow: 'hidden',
                        width: this.props.contextWidth !== undefined && this.props.contextWidth ? this.props.contextWidth: "100%",
                    }}>
                        {
                            this.props.children
                        }
                    </div>

                    {
                        this.props.noButton?

                            null
                            :
                            <div className="response-popup-bottom-row">
                                {
                                    this.props.secondaryButtonText !== undefined && this.props.secondaryButtonText !== null?
                                        <button className="response-popup-cancel-btn" style={{borderColor: this.state.primaryColor, color: this.state.primaryColor}} onClick={this.props.onClose}>
                                            {this.props.secondaryButtonText}
                                        </button>
                                        :
                                        null
                                }

                                <button className="response-popup-submit-btn" style={{background: this.state.primaryColor}} onClick={this.props.onSubmit}>
                                    {
                                        this.props.primaryButtonText !== undefined && this.props.primaryButtonText !== null?
                                            this.props.primaryButtonText
                                            :
                                            "Ok"
                                    }
                                </button>
                            </div>
                    }



                </div>

            </Popup>
        );
    }

}

InfoPopup.defaultProps = {
    noButton: false
}
InfoPopup.propTypes = {
    type: PropTypes.oneOf(["error","info","warning"]),
    open: PropTypes.bool.isRequired,
    noExitButton: PropTypes.bool,
    contextHeight: PropTypes.string,
    contextWidth: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    title: PropTypes.string.isRequired,
    secondaryButtonText: PropTypes.string,
    primaryButtonText: PropTypes.string,
    noButton: PropTypes.bool,
};

export default InfoPopup