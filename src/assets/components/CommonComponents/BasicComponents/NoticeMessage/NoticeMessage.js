import React from "react";
import "./noticeMessage.css";
import Icon from "../../Icon";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";

class NoticeMessage extends React.Component{
    constructor(props) {
        super(props);
        let {context,style} = this.props
        this.state = {
            context,
            style
        }

    }
    componentDidMount(){
        let {context,style} = this.props
        this.setState({
            context,
            style
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {context,style} = nextProps
        this.setState({
            context,
            style
        })
    }

    render() {
        let {context,style} = this.state;
        return (
            <div className="notice-message-row" style={style}>
                <Icon icon="info" className="notice-message-icon"/>
                <div className="notice-message">
                    {context}
                </div>
            </div>
        );
    }

}

NoticeMessage.defaultProps = {
    context: ""
}

NoticeMessage.propTypes ={
    context: PropTypes.string.isRequired
}

export default withRouter(NoticeMessage);
