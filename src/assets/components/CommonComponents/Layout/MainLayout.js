import React from "react";
import "./StyleSheet.css";
import Icon from "../../../IconLibrary/Icon";
import {MyTooltip} from "../BasicComponents/Tooltip/Tooltip";

export default class MainLayout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let {children} = this.props;
        return (
            <div className="main-layout">
                <div className="main-header">
                    {children[0]}
                    {children[1]}
                </div>
                {children[2]}

            </div>
        );
    }
}

export class Left extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let {title, children} = this.props;
        return (
            <div className="main-header--left">
               <MyTooltip title={title}>
                   <h3 className="main-header--title">{title}</h3>
               </MyTooltip>
                {children}
            </div>
        );
    }

}

export class Right extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let {children} = this.props;
        return (
            <div className="main-header--right">
                {children}
            </div>
        );
    }
}

export class Body extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        let {children} = this.props;
        return (
            <div className="main-body">
                {children}
            </div>
        );
    }

}

