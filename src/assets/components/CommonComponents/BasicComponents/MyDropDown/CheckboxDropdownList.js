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
import Icon from "../../../../IconLibrary/Icon";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {MyTooltip} from "../Tooltip/Tooltip";
import {hasDataList} from "../../CommonMethods";

export default class CheckboxDropdownList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: "",
            disabled: false
        }
    }

    componentDidMount() {
        const {selectedItem, disabled} = this.props;
        this.setState({
            selectedItem,
            disabled: disabled === true
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {selectedItem, disabled} = nextProps;
        this.setState({
            selectedItem,
            disabled: disabled === true
        })
    }

    handleChange = (event) => {
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
            values,
            className,
            height,
            itemDesign,
            selectedCount,
            removeSelectedCount,
            selectedItemDesign,
            pageType
            // deletable
        } = this.props;
        const {selectedItem, disabled} = this.state;
        // console.log("#selected item in drop down: ", selectedItem)
        return (
            <div className={"my-drop-down-default-style " + className} style={{
                height: height,
                filter: disabled ? "grayScale(100%)" : "grayScale(0%)",
                opacity: disabled ? 0.4 : 1
            }}>
                <Select size={"small"}
                        value={selectedItem}
                        disabled={disabled === true}
                        required
                        displayEmpty
                        onChange={(e) => this.handleChange(e)}
                        renderValue={(value) => {
                            return (
                                pageType === "patent_search" ?
                                    selectedItemDesign !== undefined && selectedItemDesign !== null ?
                                        hasDataList(selectedItem) ?
                                            selectedItemDesign(selectedItem)
                                            :
                                            <div className="my-dropdown-placeholder">
                                                {"Select options"}
                                            </div>
                                        :
                                        <div className="patent-info-selection-label">
                                            {"Select options"}
                                        </div>
                                    :
                                    <div className="patent-info-selection-label">
                                        {"Select Patent Info"}
                                    </div>
                            )
                        }}
                        className={error ? "my-dropdown-box error" : "my-dropdown-box"}>
                    {/*{placeholder && <MenuItem disabled value="">{placeholder}</MenuItem>}*/}
                    <div className="drop-down-title">
                        {
                            pageType === "patent_search" ?
                                "Choose at least one"
                                :
                                "Select Patent Info"
                        }
                    </div>
                    {
                        pageType === "patent_search" ?
                            null
                            :
                            removeSelectedCount === true ?
                                <div className="selected-item-card"/>
                                :
                                <div className="selected-item-card">
                                    <div className="selected-item-count">Selected:</div>
                                    <div className="selected-item-vlaue">{selectedCount}</div>
                                </div>
                    }

                    {
                        values.map((eachItem, itemIndex) =>
                            eachItem.Name !== "PatentID" && eachItem.Name !== "Document No." ?
                                <MenuItem value={eachItem.Name}>
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
                                            itemDesign(eachItem.Name, eachItem, itemIndex)
                                    }
                                </MenuItem>
                                :
                                null
                        )
                    }
                </Select>
            </div>
        )
    }
}

CheckboxDropdownList.defaultProps = {
    width: '300px',
    error: false,
    disabled: false,
    placeholder: 'Select one option',
    margin: '0px',
    height: '30px',
    menuMaxHeight: 200,
    className: "",
    values: [
        {Name: "Item 1 sdflkj;sa saklfdj;lkdsj ;"},
        {Name: "Item 2"}
    ],
    itemDesign: "default",
    deletable: false,
}

CheckboxDropdownList.propTypes = {
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
