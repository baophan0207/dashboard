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

import React from "react";
import "./StyleSheet.css";
import Icon from "../../../IconLibrary/Icon";
import Select from "@material-ui/core/Select/Select";
import {MyTooltip} from "../BasicComponents/Tooltip/Tooltip";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import PropTypes from "prop-types";
import {Divider} from "@material-ui/core";
import "../BasicComponents/MyDropDown/MyDropDown.css"
import {isValidData} from "../CommonMethods";

export default class TypeBasedSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: this.props.sortBy,
            sortByOptions: this.props.sortByOptions,
            sortOrder: this.props.sortOrder, // asc
            sortOrderOptions: [
                {Name: "Ascending", MenuName: "asc", Icon: "asc"},
                {Name: "Descending", MenuName: "desc", Icon: "desc"}
            ],
        }
    }

    componentDidMount() {
        const {sortByOptions, sortBy, sortOrder} = this.props;
        this.setState({
            sortBy,
            sortOrder,
            sortByOptions
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {sortByOptions, sortBy, sortOrder} = nextProps;
        this.setState({
            sortBy,
            sortOrder,
            sortByOptions
        })
    }

    handleChange = (event) => {
        if (isValidData(event.target.value)) {
            if (event.target.value === "Ascending" || event.target.value === "Descending") {
                if ((event.target.value === "Ascending" && this.state.sortOrder === "asc") || event.target.value === "Descending" && this.state.sortOrder === "desc") {
                    // no need to change
                } else {
                    this.props.onSortOrderChange(event.target.value)
                }
            } else {
                let sortByOptions = this.state.sortByOptions
                let eventValue = event.target.value
                let sortBy = eventValue
                for (let index = 0; index < sortByOptions.length; index++) {
                    if (sortByOptions[index].Name === eventValue) {
                        if (sortByOptions[index].MenuName) {
                            sortBy = sortByOptions[index].MenuName
                        }
                        break
                    }
                }
                this.props.onChange(sortBy)
            }
        }
    }

    getDisplayName = (name) => {
        let displayName = name
        for (let index = 0; index < this.state.sortByOptions.length; index++) {
            if (this.state.sortByOptions[index].MenuName === name) {
                displayName = displayName = this.state.sortByOptions[index].Name
            }
        }
        return displayName
    }

    render() {
        let {
            disabled,
            placeHolder,
            width,
        } = this.props;
        const {sortBy, sortOrder, sortByOptions, sortOrderOptions} = this.state;
        let displayName = this.getDisplayName(sortBy)
        return (
            <div className="type-based-sort-box" style={{width: width}}>
                <div className="type-based-sort-label">
                    <Icon icon={"sort"} title={"Sort"} size={14}/>
                </div>
                <div className="type-based-sort-drop-down-box">

                    <Select size={"small"}
                            disabled={disabled === true}
                            value={sortBy}
                            required
                            displayEmpty
                            onChange={(e) => this.handleChange(e)}
                            renderValue={(value) => {
                                return (
                                    <MyTooltip title={displayName}>
                                        <div className="my-dropdown-display-container">
                                            <div className="my-dropdown-display-value">
                                                {displayName}
                                            </div>
                                        </div>
                                    </MyTooltip>
                                )
                            }}
                            className="my-dropdown-box">
                        {placeHolder && <MenuItem disabled value="">{placeHolder}</MenuItem>}
                        <div className="my-drop-down-group-title">
                            {"Sort by"}
                        </div>
                        {
                            sortByOptions.map((eachItem) =>
                                sortBy === eachItem.MenuName || sortBy === eachItem.Name ?
                                    <MenuItem value={eachItem.Name}>
                                        <div className={"my-drop-down-item active"}>
                                            <div className="my-drop-down-item-label">
                                                {eachItem.Name}
                                            </div>
                                            <Icon icon="check_circle_outline" size={14}
                                                  className="my-drop-down-item-check-icon"/>
                                        </div>
                                    </MenuItem>
                                    :
                                    <MenuItem value={eachItem.Name}>
                                        <div className={"my-drop-down-item"}>
                                            <div className="my-drop-down-item-label">
                                                {eachItem.Name}
                                            </div>
                                        </div>
                                    </MenuItem>
                            )
                        }
                        <Divider/>
                        <div className="my-drop-down-group-title">
                            {"Sort order"}
                        </div>
                        {
                            sortOrderOptions.map((eachItem) =>
                                <MenuItem value={eachItem.Name}>
                                    <div className="my-drop-down-item">
                                        <div className="my-drop-down-item-label">
                                            {eachItem.Name}
                                        </div>
                                        {
                                            sortOrder === eachItem.MenuName &&
                                            <Icon icon="check_circle_outline" size={14}
                                                  className="my-drop-down-item-check-icon"/>
                                        }
                                    </div>
                                </MenuItem>)
                        }
                    </Select>
                </div>
            </div>
        );
    }
}
TypeBasedSort.defaultProps = {
    width: '150px',
    error: false,
    disabled: false,
    placeholder: 'Sort by',
    margin: '0px',
    height: '30px',
    menuMaxHeight: 200,
    className: "",
    sortByOptions: [
        {Name: "Item 1"}, {Name: "Item 2"}
    ],
    sortBy: ""
}

TypeBasedSort.propTypes = {
    width: PropTypes.string,
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    margin: PropTypes.string,
    onChange: PropTypes.func,
    onSortOrderChange: PropTypes.func,
    sortByOptions: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
        })
    ).isRequired,
    height: PropTypes.string,
    menuMaxHeight: PropTypes.number,
    sortBy: PropTypes.string,
}
