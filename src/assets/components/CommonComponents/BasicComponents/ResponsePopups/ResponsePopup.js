import React from "react";
import "./responsePopup.css";
import Popup from "reactjs-popup";
import Icon from '../../../../icons/Icon';
import PropTypes from 'prop-types';


class ResponsePopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type: "success",
            primaryColor: "var(--cta-color)",
            secondaryColor: "#eeffea",
            cancelBtn: false,
            exitBtn:true,
            responseWidth:this.props.responseWidth !== undefined?this.props.responseWidth:"440"
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
                    type: "fail",
                    // primaryColor: "#F86A6A";
                    primaryColor: "var(--main-dark-color)"
                })
            }
            else if(type === "warning"){
                this.setState({
                    type: "warning",
                    // primaryColor: "#4d67eb",
                    // primaryColor: "#F6A454",
                    primaryColor: "var(--main-dark-color)"
                })
            }
            else if(type === "confirmation"){
                this.setState({
                    type: "confirmation",
                    // primaryColor: "#487AE7",

                    primaryColor: "var(--main-dark-color)"
                })
            }
            else{
                this.setState({
                    type: "info",
                    // primaryColor: "#487AE7"
                    primaryColor: "var(--main-dark-color)"
                })
            }
        }

        if(passedData.exitBtn !== undefined && passedData.exitBtn !== null){
            let {exitBtn} =passedData;
            this.setState({
                exitBtn:exitBtn
            })
        }
        if(passedData.width !== undefined && passedData.width !== null){
            let {width} =passedData;
            this.setState({
                responseWidth:width
            })
        }
    }


    render() {
        let children = React.Children.toArray(this.props.children);
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
                    <div className="response-popup" style={{borderColor: this.state.primaryColor, width: this.state.responseWidth+"px"}}>
                        {
                            this.state.exitBtn !== undefined && this.state.exitBtn !==null && this.state.exitBtn?
                                <button className="response-popup-exit-btn"  style={{fill:this.state.primaryColor,top:'0px',right:'0px'}} onClick={this.props.onClose}>
                                    <Icon icon={"close"} />
                                </button>
                                :
                                null
                        }
                        <div className="response-popup--header">
                            {
                                this.state.type === "info"?
                                    <div className="response-icon-division">
                                        <div className="response-info">
                                            <Icon icon="info" size={40}/>
                                        </div>
                                        {/*<div className="response-icon--outline" style={{borderColor: this.state.primaryColor}}/>*/}
                                        <div className="response-spot1"/>
                                        <div className="response-spot2"/>
                                        <div className="response-spot3"/>
                                    </div>
                                    :
                                    this.state.type === "success"?
                                        <div className="response-icon-division">
                                            <div className="response-icon--short-line" style={{background: this.state.primaryColor}}/>
                                            <div className="response-icon--long-line" style={{background: this.state.primaryColor}}/>
                                            <div className="response-icon--outline" style={{borderColor: this.state.primaryColor}}/>
                                            <div className="response-spot1"/>
                                            <div className="response-spot2"/>
                                            <div className="response-spot3"/>
                                        </div>
                                        :
                                        this.state.type === "confirmation"?
                                            <div className="response-icon-division">
                                                <div className="response-question-mark">
                                                    <Icon icon="questionmark_without_dot" size={24}/>
                                                </div>
                                                <div className="response-question-dot" style={{background: this.state.primaryColor}}/>
                                                <div className="response-icon--outline" style={{borderColor: this.state.primaryColor}}/>
                                                <div className="response-spot1"/>
                                                <div className="response-spot2"/>
                                                <div className="response-spot3"/>
                                            </div>
                                            :
                                            <div className="response-icon-division">
                                                <div className="response-warning">
                                                    !
                                                </div>
                                                <div className="response-icon--outline" style={{borderColor: this.state.primaryColor}}/>
                                                <div className="response-spot1"/>
                                                <div className="response-spot2"/>
                                                <div className="response-spot3"/>
                                            </div>
                            }

                            <h3 className="response-popup-title">

                                {
                                    this.props.title !== undefined && this.props.title !== null?
                                        this.props.title.length > 50 ?
                                            this.props.title.substring(50) + "..."
                                            :
                                            this.props.title

                                        :
                                        this.state.type === "info"?
                                            "Info"
                                            :
                                            this.state.type === "warning"?
                                                "Warning!"
                                                :
                                                this.state.type === "fail"?
                                                    "Fail!"
                                                    :
                                                    "Success!"

                                }
                            </h3>
                        </div>
                        {
                            this.props.bodyContext !== undefined && this.props.bodyContext !== "" ?
                                <div className="response-popup--body">
                                    <p>
                                        {this.props.bodyContext}
                                    </p>
                                </div>
                                :
                                <div className="response-popup--body">
                                    {
                                        children.map((res,index)=> res)
                                    }
                                </div>
                        }
                        <div className="response-popup-bottom-row">
                            {
                                this.props.cancelBtn !== undefined && this.props.cancelBtn !== null?
                                    this.props.cancelBtn?
                                        <button className="response-popup-cancel-btn"
                                                style={{borderColor: "var(--cta-color)", color: "var(--main-dark-color)"}}
                                                onClick={
                                                    this.props.onCancel !== undefined && this.props.onCancel !== null?
                                                        this.props.onCancel
                                                        :
                                                        this.props.onClose}>
                                            {
                                                this.props.secondaryButtonText !== undefined && this.props.secondaryButtonText!== null?
                                                    this.props.secondaryButtonText
                                                    :
                                                    "Cancel"
                                            }
                                        </button>
                                        :
                                        null
                                    :
                                    null
                            }

                            {
                                this.props.disabledPrimaryBtn === true?
                                    null
                                    :
                                    <button className="response-popup-submit-btn"
                                            style={{background: "var(--cta-color)"}}
                                            onClick={
                                                this.props.onSubmit !== undefined && this.props.onSubmit !== null?
                                                    this.props.onSubmit
                                                    :
                                                    this.props.onClose
                                            }>
                                        {
                                            this.props.primaryButtonText !== undefined && this.props.secondaryButtonText !== null?
                                                this.props.primaryButtonText
                                                :
                                                "Ok"
                                        }
                                    </button>
                            }
                        </div>
                    </div>

                </Popup>
                :
                null
        );
    }

}

ResponsePopup.propTypes = {
    open:               PropTypes.bool.isRequired,
    type:               PropTypes.oneOf(["success","fail","info","warning","confirmation"]).isRequired,
    title:              PropTypes.string.isRequired,
    bodyContext:        PropTypes.string,
    primaryButtonText:  PropTypes.string,
    secondaryButtonText:PropTypes.string,
    responseWidth:      PropTypes.number,
    cancelBtn:          PropTypes.bool,
    exitBtn:            PropTypes.bool,
    onClose:            PropTypes.func.isRequired,
    onSubmit:           PropTypes.func,
    onCancel:           PropTypes.func,
};

export default ResponsePopup