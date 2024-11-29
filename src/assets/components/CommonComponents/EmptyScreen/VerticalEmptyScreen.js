import React from "react";
import defaultEmptyImg from "../../../images/EmptyIllustration/defaultEmpty.svg";
import PropTypes from "prop-types";
import "./emptyScreen.less";
import "./emptyScreen.css";
import CreateButton from "../BasicComponents/MainCTOButton/CreateButton";
import LottieAnimation from "../../../images/Lotties/LottieAnimation";
class VerticalEmptyScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            emptyImage : defaultEmptyImg,
        }
    }

    componentDidMount() {
        this.getDataFromCaller(this.props);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getDataFromCaller(nextProps);
    }

    getDataFromCaller(data){

    }

    render() {
        let {noImage, size, imageType,emptyTextColor} = this.props;
        let {children} = React.Children.toArray(this.props.children);
        return (
            <div className="vertical-empty-layout">
                {
                    noImage?
                        null
                        :
                        imageType === "lotties"?
                            <div className="vertical-empty-illustration" style={{width: size}}>
                                <LottieAnimation lotti={this.props.image}/>
                            </div>
                            :
                            <div className="vertical-empty-illustration-container" style={{width: size}}>
                                <img alt={""} src={this.props.image} className="vertical-empty-illustration"/>
                                {/*<img alt={""} src={defaultEmptyImg} className="vertical-empty-illustration"/>*/}
                            </div>
                }

                {
                    this.props.header !== undefined && this.props.header !== null?
                        <div className="vertical-empty-title">
                            {this.props.header}
                        </div>
                        :
                        null
                }
                <div className="vertical-empty-text" style={{color: emptyTextColor}}>
                    {this.props.bodyContext}
                </div>
                {
                    children !== undefined && children !== null && children.length > 0 ?
                        <div className="vertical-empty-loading-container">
                            {
                                children.map((res)=> res)
                            }
                        </div>
                        :
                        null
                }

                {
                    this.props.createBtn?
                        <div className="empty-page-create-btn vertical">
                            <CreateButton onClick={this.props.onCreate}
                                          multiCreator={this.props.multiCreate}
                                          buttonHeight = "35px"
                                          noIcon = {true}
                                          disabled={this.props.disabledOnCreate}
                                          createTypeList={this.props.createTypeList }>
                                {this.props.createText}
                            </CreateButton>
                        </div>
                        :
                        null
                }
                {
                    this.props.secondaryButton ?
                        <div className="empty-page-create-btn vertical">
                            <button className="empty-page-secondary-button" onClick={this.props.onClickSecondaryButton}>{this.props.secondaryButtonText}</button>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

VerticalEmptyScreen.defaultProps = {
    header :        "",
    bodyContext :   "",
    image :         defaultEmptyImg,
    createText :    "Create One",
    createBtn:      false,
    multiCreate:    false,
    createTypeList: null,
    noImage: false,
    size: "300px",
    imageType:      "normal",
    emptyTextColor: '#4b4b4b'
}
VerticalEmptyScreen.propTypes = {
    header :        PropTypes.string.isRequired,
    bodyContext :   PropTypes.any.isRequired,
    image :         PropTypes.string.isRequired,
    createBtn :     PropTypes.bool.isRequired,
    onCreate :      PropTypes.func,
    createText :    PropTypes.string,
    multiCreate :    PropTypes.bool,
    noImage :    PropTypes.bool,
    imageType:      PropTypes.oneOf(["lotties","normal"]),
    emptyTextColor: PropTypes.string,
    secondaryButton: PropTypes.bool,
    secondaryButtonText: PropTypes.string,
    onClickSecondaryButton: PropTypes.func,

}
export default VerticalEmptyScreen;