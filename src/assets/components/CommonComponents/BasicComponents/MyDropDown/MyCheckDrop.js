/*
 *
 *
 *  Copyright (c) 2016-2023, AnyGen AI Inc.  All rights reserved.
 *
 *
 *  IMPORTANT - PLEASE READ THIS CAREFULLY BEFORE ATTEMPTING TO USE ANY SOFTWARE,
 *
 *  DOCUMENTATION, OR OTHER MATERIALS.
 *
 *  This software is the confidential and proprietary information of AnyGen AI Inc
 *
 *  ("Confidential Information") and is protected by applicable copyright or other
 *
 *  intellectual property laws and treaties. All title and ownership rights in and
 *
 *  to the software (including but not limited to any source code, images,
 *
 *  photographs, animations, video, audio, music, text embedded in the software),
 *
 *  the intellectual property embodied in the software, and any trademarks or
 *
 *  service marks of AnyGen AI Inc. that are used in connection with the
 *
 *  software, are and shall at all times remain exclusively owned by AnyGen AI,
 *
 *  Inc. and its licensors.  Under no
 *   circumstances shall you disclose such
 *
 *  Confidential Information and trade secrets, distribute, disclose or otherwise
 *
 *  make available to any third party any portion of the software's source code
 *
 *  and shall use it only in accordance with the terms of the license agreement
 *
 *  enclosed with this product or as entered into with AnyGen AI, Inc.
 *
 *
 *  You are prohibited from any attempt to disassemble the code, or attempt in
 *
 *  any manner to reconstruct, discover, reuse or modify any source code or
 *
 *  underlying algorithms of the software.
 *
 *
 *  THIS SOFTWARE IS PROVIDED "AS IS" AND THERE ARE NO WARRANTIES, CLAIMS OR
 *
 *  REPRESENTATIONS MADE BY AnyGen AI, INC., OR ITS LICENSORS, SUBSIDIARIES
 *
 *  AND AFFILIATES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES
 *
 *  OF QUALITY, PERFORMANCE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR
 *
 *  A PARTICULAR PURPOSE, NOR ARE THERE ANY WARRANTIES CREATED BY COURSE OF
 *
 *  DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE. AnyGen AI, INC. DOES NOT
 *
 *  WARRANT THAT THIS SOFTWARE WILL MEET ANY CLIENT'S NEEDS OR BE FREE FROM
 *
 *  ERRORS, OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED.
 * /
 */

import './MyDropDown.css'
import React from "react";
import PropTypes from 'prop-types'
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import MyCheckbox from "../Checkbox/MyCheckbox";
import Pagination from "../PaginationV1/Pagination";

export default class MyCheckDrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "",
            selectAllItems: false,
            selectedCount: 0,
            values: []
        }
    }

    componentDidMount() {
        const {selectedItem, selectAllItems, selectedCount, values} = this.props;
        this.setState({
            selectedItem,
            selectAllItems,
            selectedCount,
            values
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {selectedItem, selectAllItems, selectedCount, values} = nextProps;
        this.setState({
            selectedItem,
            selectAllItems,
            selectedCount,
            values
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

    render() {
        let {
            error,
            className,
            height,
            menuMaxHeight,
            title,
            onChangeSelectItem,
            onChangeSelectAll
        } = this.props;
        const {
            values,
            selectAllItems,
            selectedCount
        } = this.state;
        const {selectedItem} = this.state;
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
                    <div className="check-drop-down-info-row">
                        <div className="selected-item-count">Selected:</div>
                        <div className="selected-item-vlaue">{selectedCount}</div>
                    </div>

                    <MenuItem value={"All"}>
                        <div className="check-drop-down-item select-all">
                            <MyCheckbox onChange={onChangeSelectAll}
                                        checked={selectAllItems}
                            />
                            <div className="check-drop-down-item-label">
                                {"Select All"}
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
