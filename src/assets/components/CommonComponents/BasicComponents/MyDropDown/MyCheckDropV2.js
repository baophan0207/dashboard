import './MyDropDown.css'
import React from "react";
import PropTypes from 'prop-types'
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import MyCheckbox from "../Checkbox/MyCheckbox";
import Pagination from "../PaginationV1/Pagination";
import Icon from "../../../../IconLibrary/Icon";

export default class MyCheckDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "",
            selectAllItems: false,
            selectedCount: 0,
            values: [],
            selectAllStandardItems: false,
            standardValues: [],
            isExpandStandard: true,
            isExpandColumn: true,
        }
    }

    componentDidMount() {
        const {
            selectedItem, selectAllItems, selectedCount, values, standardValues,
            selectAllStandardItems
        } = this.props;
        this.setState({
            selectedItem,
            selectAllItems,
            selectedCount,
            values,
            standardValues,
            selectAllStandardItems,
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {
            selectedItem, selectAllItems, selectedCount, values,
            standardValues,
            selectAllStandardItems,
        } = nextProps;
        this.setState({
            selectedItem,
            selectAllItems,
            selectedCount,
            values,
            standardValues,
            selectAllStandardItems,
        })
    }

    handleChange = (event) => {
        console.log("my check drop on change: ", event.target.value)
        this.setState({selectedItem: event.target.value,})
        this.props.onChange(event.target.value)
    }

    handleDeleteItem = (event, keyword) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onDelete()
    }

    handleExpand = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({
            isExpandColumn: !this.state.isExpandColumn
        })

    }

    handleExpandStandard = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({
            isExpandStandard: !this.state.isExpandStandard
        })
    }

    render() {
        let {
            error,
            className,
            height,
            menuMaxHeight,
            title,
            width,
            onChangeSelectItem,
            onChangeSelectStandardItem,
            onChangeSelectAll,
            onChangeSelectAllForStandardColumns
        } = this.props;
        const {
            values,
            selectAllItems,
            selectedCount,
            standardValues,
            selectAllStandardItems,
            selectedItem
        } = this.state;
        return (
            <div className={"my-drop-down-default-style " + className}>
                <Select size={"small"}
                        value={selectedItem}
                        required
                        displayEmpty
                        onChange={(e) => this.handleChange(e)}
                        renderValue={(value) => {
                            return (
                                <div className="patent-info-selection-label">
                                    {title}
                                </div>
                            )
                        }}
                        className={error ? "my-dropdown-box error" : "my-dropdown-box"}>
                    <div className="check-drop-down-title">{title}</div>
                    {/*<div className="check-drop-down-info-row">*/}
                    {/*    <div className="selected-item-count">Selected:</div>*/}
                    {/*    <div className="selected-item-vlaue">4</div>*/}
                    {/*</div>*/}

                    {/*<div className="check-drop-search-box">*/}
                    {/*    <PSSearchBox placeholder={"Search"} height={"30px"}/>*/}
                    {/*</div>*/}

                    {
                        standardValues.length > 0 ?
                            <>
                                <MenuItem value={"All"}>
                                    <div className="check-drop-down-item select-all">
                                        <div onClick={(event) => this.handleExpandStandard(event)}
                                             className={this.state.isExpandStandard === true ? "check-drop-expander collapse" : "check-drop-expander"}>
                                            <Icon
                                                icon={"drop_down"} size={14}/>
                                        </div>
                                        <MyCheckbox onChange={onChangeSelectAllForStandardColumns}
                                                    checked={selectAllStandardItems}
                                        />
                                        <div className="check-drop-down-item-label title">
                                            {"Standard Columns"}
                                            <Icon icon={"info"} size={14}
                                                  title={"Standard columns are columns that included in every module"}/>
                                        </div>

                                    </div>
                                </MenuItem>
                                <div className="check-drop-menu-list" style={{
                                    height: "auto"
                                }}>
                                    {
                                        standardValues.map((eachItem, index) =>
                                            <MenuItem value={eachItem}>
                                                <div className="check-drop-down-item">
                                                    {/*<MyCheckbox onChange={() => {}}/>*/}
                                                    <MyCheckbox checked={eachItem.isSelected}
                                                                onChange={() => onChangeSelectStandardItem(index, eachItem)}/>
                                                    <div className="check-drop-down-item-label">
                                                        {eachItem.Name}
                                                    </div>
                                                </div>
                                            </MenuItem>
                                        )
                                    }

                                </div>
                                <div className="Check-drop-divider"/>
                            </>
                            :
                            null
                    }

                    <MenuItem value={"All"}>
                        <div className="check-drop-down-item select-all">
                            <div onClick={(event) => this.handleExpand(event)}
                                 className={this.state.isExpandColumn === true ? "check-drop-expander collapse" : "check-drop-expander"}>
                                <Icon icon={"drop_down"} size={14}/>
                            </div>
                            <MyCheckbox onChange={onChangeSelectAll}
                                        checked={selectAllItems}
                            />
                            <div className="check-drop-down-item-label title">
                                {"Result Columns"}
                                <Icon icon={"info"} size={14}
                                      title={"Standard columns are columns that included in every module"}/>
                            </div>

                        </div>
                    </MenuItem>
                    <div className="check-drop-menu-list" style={{
                        height: values.length > 20 ? "300px" : "auto"
                    }}>
                        {
                            values.map((eachItem, index) =>
                                <MenuItem value={eachItem.Name}>
                                    <div className="check-drop-down-item">
                                        <MyCheckbox checked={eachItem.isSelected}
                                                    onChange={() => onChangeSelectItem(index, eachItem)}/>
                                        <div className="check-drop-down-item-label">
                                            {eachItem.Name}
                                        </div>
                                    </div>
                                </MenuItem>
                            )
                        }
                    </div>

                    {
                        values.length > 20 &&
                        <div className="check-drop-pagination-row">
                            <Pagination
                                paginationType={"only pager"}
                                noOfPages={99}
                                onChangePage={() => {
                                }}
                                currentPage={1}
                            />
                        </div>
                    }
                </Select>
            </div>
        )
    }
}

MyCheckDrop.defaultProps = {
    width: '300px',
    error: false,
    disabled: false,
    placeholder: 'Select one option',
    margin: '0px',
    height: '30px',
    menuMaxHeight: 200,
    className: "",
    values: [
        {Name: "this is long item testing to see how much this can be stretched and whether controller is working or not"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}, {Name: "Item 2"}
    ],
    itemDesign: "default",
    deletable: false,
    title: "Select Columns to Display"
}

MyCheckDrop.propTypes = {
    width: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    title: PropTypes.string,
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
