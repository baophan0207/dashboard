import './MyDropDown.css'
import React from "react";
import PropTypes from 'prop-types'
import Icon from "../../../../IconLibrary/Icon";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {MyTooltip} from "../Tooltip/Tooltip";
import {Divider} from "@material-ui/core";

export default class MyDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: ""
        }
    }

    componentDidMount() {
        const {selectedItem} = this.props;
        this.setState({
            selectedItem
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {selectedItem} = nextProps;
        this.setState({
            selectedItem
        })
    }

    handleChange = (event) => {
        console.log("event value: ", event)
        this.setState({selectedItem: event.target.value,})
        this.props.onChange(event.target.value)
    }

    handleDeleteItem = (event, keyword) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onDelete()
    }
    changeVersion = (event, keyword) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onChangeVersion()
    }
    viewInfo = (event, keyword) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onViewInfo()
    }

    handleCheckAction = (event) => {
        console.log("handle check action", event)
    }

    render() {
        let {
            error,
            values,
            className,
            height,
            itemDesign,
            selectedItemDesign,
            deletable,
            type,
            hideManageVersion,
            disabled,
            disabledDeleteBtn,
            hideSelectionTooltip = false
        } = this.props;
        const {selectedItem} = this.state;
        // console.log("#selectedItem: ", selectedItem)
        return (
            <div className={"my-drop-down-default-style " + className} style={{height: height}}>
                <Select size={"small"}
                        value={selectedItem}
                        disabled={values.length === 0 || disabled === true}
                        required
                        displayEmpty
                        onChange={(e) => this.handleChange(e)}
                        renderValue={() => {
                            return (
                                <div className="my-drop-down-selected-item">
                                    {
                                        error ?
                                            <MyTooltip title={selectedItem}>
                                                <div className="my-dropdown-display-container error">
                                                    <Icon icon={"warning"} size={14}/>
                                                    {
                                                        itemDesign === "default" ?
                                                            <div className="my-dropdown-display-value error">
                                                                {selectedItem}
                                                            </div>
                                                            :
                                                            itemDesign(selectedItem)
                                                    }
                                                </div>
                                            </MyTooltip>
                                            :
                                            selectedItem !== undefined && selectedItem !== null && selectedItem !== "" ?
                                                <MyTooltip title={hideSelectionTooltip === true ? "" : selectedItem}>
                                                    {
                                                        selectedItemDesign !== "default" ?
                                                            selectedItemDesign(selectedItem)
                                                            :
                                                            itemDesign === "default" ?
                                                                <div className="my-dropdown-display-container">
                                                                    <div className="my-dropdown-display-value">
                                                                        {selectedItem}
                                                                    </div>
                                                                </div>
                                                                :
                                                                itemDesign(selectedItem)
                                                    }
                                                </MyTooltip>
                                                :
                                                <div className="my-dropdown-placeholder">
                                                    {this.props.placeholder}
                                                </div>
                                    }
                                    {
                                        type === "Model Selector" &&
                                        <>
                                            {
                                                hideManageVersion === true ?
                                                    null
                                                    :
                                                    <button
                                                        onMouseDown={(event) => this.changeVersion(event, "onMouseDown")}
                                                        className="menu-button my-drop-down-delete">
                                                        <Icon icon={"modelVersion"} size={14} title={"Change Version"}/>
                                                    </button>
                                            }
                                            <button onMouseDown={(event) => this.viewInfo(event, "onMouseDown")}
                                                    className="menu-button my-drop-down-delete">
                                                <Icon icon={"info"} size={14} title={"View Model Details"}/>
                                            </button>
                                        </>
                                    }
                                    {
                                        type === true &&
                                        <button onMouseDown={(event) => this.changeVersion(event, "onMouseDown")}
                                                className="menu-button my-drop-down-delete">
                                            <Icon icon={"cross"} size={8}/>
                                        </button>
                                    }
                                    {
                                        deletable &&
                                        <button onMouseDown={(event) => this.handleDeleteItem(event)}
                                                className="menu-button my-drop-down-delete"
                                                disabled={disabledDeleteBtn === true}>
                                            <Icon icon={"cross"} size={8}/>
                                        </button>
                                    }
                                </div>
                            )
                        }}
                            className={error ? "my-dropdown-box error" : "my-dropdown-box"}>
                        {/*{placeholder && <MenuItem disabled value="">{placeholder}</MenuItem>}*/}
                        {
                            values.map((eachItem, itemIndex) =>
                            eachItem.Name === "divider" || eachItem.Name === "Divider" ?
                            <Divider key={itemIndex}/>
                            :
                            <MenuItem key={itemIndex} value={eachItem.Name}>
                        {
                            itemDesign === "default" ?
                            <div className="my-drop-down-item">
                            <div className="my-drop-down-item-label">
                        {eachItem.Name}
                            </div>
                        {
                            eachItem.Description &&
                            <MyTooltip title={eachItem.Description}>
                            <Icon icon="info" size={14}/>
                            </MyTooltip>
                        }
                            </div>
                            :
                            itemDesign(eachItem.Name, eachItem.Version)
                        }
                            </MenuItem>
                            )
                        }
                            </Select>
                            </div>
                            )
                        }
}

MyDropDown.defaultProps = {
    width: '300px',
    error: false,
    disabled: false,
    placeholder: 'Select one option',
    margin: '0px',
    height: '30px',
    menuMaxHeight: 200,
    className: "",
    values: [
        {Name: "Item 1"}, {Name: "Item 2"}
    ],
    itemDesign: "default",
    selectedItemDesign: "default",
    deletable: false,
}

MyDropDown.propTypes = {
    width: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    margin: PropTypes.string,
    onChange: PropTypes.func,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
        })
    ).isRequired,
    height: PropTypes.string,
    menuMaxHeight: PropTypes.number,
    selectedItem: PropTypes.string,
    itemDesign: PropTypes.any,
    deletable: PropTypes.bool,
}
