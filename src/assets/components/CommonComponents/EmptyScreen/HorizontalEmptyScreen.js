import React from "react";
import defaultEmptyImg from "../../../images/EmptyIllustration/defaultEmpty.svg";
import PropTypes from "prop-types";
import CreateButton from "../BasicComponents/MainCTOButton/CreateButton";
import "./emptyScreen.css";
import "./emptyScreen.less"

class HorizontalEmptyScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emptyImage: defaultEmptyImg,

        }
    }

    componentDidMount() {
        this.getDataFromCaller(this.props);

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getDataFromCaller(nextProps);
    }


    getDataFromCaller(data) {
        // if(data.image !== undefined && data.image !== null){
        //     let {image} = this.props;
        //     this.setState({
        //         emptyImage: image
        //     })
        // }
    }

    render() {
        return (
            <div className="horizontal-empty-layout">
                <img alt={""} src={this.props.image} className="horizontal-empty-illustration"/>
                <div className="horizontal-empty-text">
                    <div className="horizontal-empty-text-header">
                        {this.props.header}
                    </div>
                    <div className="horizontal-empty-text-body">
                        {this.props.bodyContext}
                    </div>
                    {
                        this.props.createBtn ?
                            this.props.disabled ?
                                <div className="empty-page-create-btn">
                                    <button className="main-cta-btn"
                                            disabled={true}>
                                        {this.props.createText}
                                    </button>
                                </div>
                                :
                                <div className="empty-page-create-btn"  id="createEmptyApplication">
                                    <CreateButton onClick={this.props.onCreate}
                                                  disabled={this.props.disabled}
                                                  multiCreator={this.props.multiCreate}
                                                  buttonHeight="35px"
                                                  noIcon={true}
                                                  createTypeList={this.props.createTypeList}>
                                        {this.props.createText}
                                    </CreateButton>
                                </div>
                            :
                            null
                    }

                </div>
            </div>
        );
    }
}

HorizontalEmptyScreen.defaultProps = {
    header: "",
    bodyContext: "There is no data",
    image: defaultEmptyImg,
    createText: "Create One",
    createBtn: false,
    multiCreate: false,
    createTypeList: null,
    disabled: false
}
HorizontalEmptyScreen.propTypes = {
    header: PropTypes.string.isRequired,
    bodyContext: PropTypes.string.isRequired,
    image: PropTypes.bool.isRequired,
    createBtn: PropTypes.bool.isRequired,
    onCreate: PropTypes.func,
    createText: PropTypes.string,
    multiCreate: PropTypes.bool,
    disabled: PropTypes.bool
}
export default HorizontalEmptyScreen;