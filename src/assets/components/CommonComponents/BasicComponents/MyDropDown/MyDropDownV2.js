import './MyDropDown.css'
import React from "react";
import PropTypes from 'prop-types'
import Icon from "../../../../IconLibrary/Icon";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {MyTooltip} from "../Tooltip/Tooltip";
import {Divider} from "@material-ui/core";
import Pagination from "../PaginationV1/Pagination";
import MyCheckbox from "../Checkbox/MyCheckbox";

export default class MyDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "",
            showPagination: false,
            openState: false,
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
        // this.setState({selectedItem: event.target.value,})
        this.props.onChange(event.target.value)
    }

    handleDeleteItem = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onDelete()
    }

    changeVersion = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onChangeVersion()
    }

    viewInfo = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onViewInfo()
    }
    handleOpen = () => {
        console.log("#handleOpen: ", this.state.openState)
        this.setState({
            openState: true
        })
    }

    handleClose = (event) => {
        // let currentDocument = document.getElementById("select-testing")
        // if (currentDocument !== undefined && currentDocument !== null) {
        //
        // }
        // console.log("event name: ", event.target.name)
        // console.log("class name? ", document.activeElement.className)
        let activeClassName = document.activeElement.className;
        if (activeClassName === "MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded") {
            this.setState({
                openState: false
            })
        }
    }

    render() {
        let {
            error,
            values,
            className,
            height,
            itemDesign,
            deletable,
            selectedItemDesign,
            additionalMenuList,
            additionalMenuDesign,
            type,
            addSearchBox,
            addCheckBox,
            selectAllItems,
            hideTooltip,
            showBothValue,
            disabledDefaultOnChange
        } = this.props;
        const {selectedItem, showPagination} = this.state;
        return (
            <div className={"my-drop-down-default-style " + className} style={{height: height}}>
                <Select size={"small"}
                        id={"select-testing"}
                        open={this.state.openState}
                        onOpen={() => this.handleOpen()}
                        onClose={(event) => this.handleClose(event)}
                        value={selectedItem}
                        required
                        displayEmpty
                        onChange={(e) => disabledDefaultOnChange === true ? () => {
                        } : this.handleChange(e)}
                        renderValue={() => {
                            return (
                                <div className="my-drop-down-selected-item">
                                    {
                                        error ?
                                            <MyTooltip title={selectedItem}>
                                                <div className="my-dropdown-display-container error">
                                                    <Icon icon={"warning"} size={14}/>
                                                    {
                                                        selectedItemDesign === "default" ?
                                                            itemDesign === "default" ?
                                                                <div className="my-dropdown-display-value error">
                                                                    {selectedItem}
                                                                </div>
                                                                :
                                                                itemDesign(selectedItem)
                                                            :
                                                            selectedItemDesign(selectedItem)
                                                    }
                                                </div>
                                            </MyTooltip>
                                            :
                                            selectedItem !== undefined && selectedItem !== null && selectedItem !== "" ?
                                                hideTooltip === true ?
                                                    selectedItemDesign === "default" ?
                                                        itemDesign === "default" ?
                                                            <div className="my-dropdown-display-value">
                                                                {selectedItem}
                                                            </div>
                                                            :
                                                            itemDesign(selectedItem)
                                                        :
                                                        selectedItemDesign(selectedItem)
                                                    :
                                                    <MyTooltip title={selectedItem}>
                                                        {
                                                            selectedItemDesign === "default" ?
                                                                itemDesign === "default" ?
                                                                    <div className="my-dropdown-display-value">
                                                                        {selectedItem}
                                                                    </div>
                                                                    :
                                                                    itemDesign(selectedItem)
                                                                :
                                                                selectedItemDesign(selectedItem)
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
                                            <button onMouseDown={(event) => this.changeVersion(event, "onMouseDown")}
                                                    className="menu-button my-drop-down-delete">
                                                <Icon icon={"modelVersion"} size={14} title={"Change Version"}/>
                                            </button>
                                            <button onMouseDown={(event) => this.viewInfo(event, "onMouseDown")}
                                                    className="menu-button my-drop-down-delete">
                                                <Icon icon={"info"} size={14} title={"View Model Details"}/>
                                            </button>
                                        </>
                                    }
                                    {
                                        deletable === true &&
                                        <button onMouseDown={(event) => this.handleDeleteItem(event, "onMouseDown")}
                                                className="menu-button my-drop-down-delete">
                                            <Icon icon={"cross"} size={8}/>
                                        </button>
                                    }
                                    {/*{*/}
                                    {/*    deletable &&*/}
                                    {/*    <button className="menu-button my-drop-down-delete" disabled>*/}
                                    {/*        <Icon icon={"cross"} size={8}/>*/}
                                    {/*    </button>*/}
                                    {/*}*/}
                                </div>
                            )
                        }}
                        className={error ? "my-dropdown-box error" : "my-dropdown-box"}>
                    {/*{placeholder && <MenuItem disabled value="">{placeholder}</MenuItem>}*/}
                    {/*{*/}
                    {/*    addSearchBox &&*/}
                    {/*    <div className="my-drop-down-search-box">*/}
                    {/*        <PSSearchBox height={"30px"}/>*/}
                    {/*    </div>*/}
                    {/*}*/}

                    {
                        addCheckBox &&
                        <div className="my-drop-down-select-all-row">
                            <MyCheckbox checked={selectAllItems}
                                        onChange={() => this.props.onChangeSelectAll("selectAllItems")}/>
                            Select All
                        </div>
                    }

                    <div className="drop-down-items-list"
                         style={{
                             height: showPagination ? "300px" : "auto",
                             marginTop: addCheckBox ? 0 : "10px",
                             padding: addCheckBox ? "0 15px" : 0
                         }}>
                        {
                            values.map((eachItem) =>
                                eachItem.Name === "divider" || eachItem.Name === "Divider" ?
                                    <Divider/>
                                    :
                                    <MenuItem value={eachItem.Name}>
                                        {
                                            itemDesign === "default" ?
                                                <div className="my-drop-down-item">
                                                    {
                                                        addCheckBox &&
                                                        <MyCheckbox checked={eachItem.isSelected === true}
                                                                    onChange={() => this.props.onChange(eachItem.Name)}
                                                                    className="my-drop-down-check-box"/>
                                                    }
                                                    <div className="my-drop-down-item-label">
                                                        {
                                                            showBothValue === true ?
                                                                eachItem.Value + " - " + eachItem.Name
                                                                :
                                                                eachItem.Name
                                                        }
                                                    </div>
                                                    {
                                                        eachItem.Description &&
                                                        <MyTooltip title={eachItem.Description}>
                                                            <Icon icon="info" size={14}/>
                                                        </MyTooltip>
                                                    }
                                                </div>
                                                :
                                                itemDesign(eachItem.Name)
                                        }
                                    </MenuItem>
                            )
                        }
                    </div>

                    {
                        showPagination &&
                        <div className="drop-down-pagination-row">
                            <Pagination
                                paginationType={"only pagination-circle"}
                                noOfPages={99}
                                onChangePage={() => {
                                }}
                                currentPage={1}
                            />
                        </div>
                    }

                    {
                        additionalMenuList.length !== 0 &&
                        <div className="drop-down-items-list">
                            <Divider/>
                            {
                                additionalMenuList.map((eachItem) =>
                                    eachItem.Name === "divider" || eachItem.Name === "Divider" ?
                                        <Divider/>
                                        :
                                        <MenuItem value={eachItem.Name}>
                                            {
                                                additionalMenuDesign === "default" ?
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
                                                    additionalMenuDesign(eachItem)
                                            }
                                        </MenuItem>
                                )
                            }
                        </div>
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
    additionalMenuList: [],
    additionalMenuDesign: "default",
    type: "Default",
    addSearchBox: false,
    addCheckBox: false,
}

MyDropDown.propTypes = {
    width: PropTypes.string,
    error: PropTypes.bool,
    addSearchBox: PropTypes.bool,
    addCheckBox: PropTypes.bool,
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
    selectedItemDesign: PropTypes.any,
    deletable: PropTypes.bool,
    additionalMenuList: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
        })
    ),
    additionalMenuDesign: PropTypes.any,
    type: PropTypes.oneOf(["Model Selector", "Default"])
}
