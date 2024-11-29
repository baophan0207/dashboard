import React from "react";
import "./StyleSheet.css";
import Icon from "../../../IconLibrary/Icon";
import PropTypes from "prop-types";
import CreateButton from "../BasicComponents/MainCTOButton/CreateButton";

export default class ExpandableLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isExpand: true,
        }
    }

    expanderHandler = () =>{
        this.setState({
            isExpand: !this.state.isExpand
        })
    }
    render() {
        let {width, className, backgroundColor, children} = this.props;
        return (
            <div className={this.state.isExpand?
                "expander-layout "+className
                :
                "expander-layout collapse "+className}
                 style={{width: width, background: backgroundColor}}>
                <div className="layout-expander"
                     onClick={this.expanderHandler.bind(this)}
                     style={{left: this.state.isExpand ? "calc("+width+" - 1px)" : 0}}>
                    <Icon
                        icon={this.state.isExpand ? "expander_show" : "expander_hide"}
                        className="layout-expander-icon"/>
                </div>

                {children}
            </div>
        );
    }
}



ExpandableLayout.defaultProps = {
    width: "300px",
    backgroundColor: "#f5f7f9",
    className: ""


}
ExpandableLayout.propTypes = {
    width: PropTypes.string,
    className: PropTypes.string,
    backgroundColor: PropTypes.string,
}