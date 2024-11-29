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

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "./contextMenu.css";
import Icon from "../../../IconLibrary/Icon";
import DuoIcon from "../../../IconLibrary/DuoIcon";
import {isValidData} from "../CommonMethods";
import PropTypes from "prop-types";
import Divider from '@mui/material/Divider';
import MyRadio from "../BasicComponents/MyRadio/MyRadio";

export default class MyContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,

            nestedMenu: null,
            nestedMenuOpen: false,
            inventionStatusList: [
                {Name: "To Be Filed", MenuName: "to_be_filed", Color: "#09092d"},
                {Name: "Not Filed", MenuName: "not_filed", Color: "#b84e4e"},
                {Name: "Filed", MenuName: "filed", Color: "#b84e4e"},
                {Name: "Granted", MenuName: "granted", Color: "#6ac134"},
                {Name: "None", MenuName: "", Color: "#09092d"},
            ],
        }
    }

    componentDidMount() {
        this.setState({
            open: false,
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            open: false,
        })
    }

    handleClick = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.setState({
            anchorEl: event.currentTarget,
            open: !this.state.open
        })
    };

    handleNestedClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({
            nestedMenu: event.currentTarget,
            nestedMenuOpen: !this.state.nestedMenuOpen
        })
    };

    chooseItem = (menu, event) => {
        event.preventDefault()
        event.stopPropagation()
        const {handleSelectMenu} = this.props;
        this.setState({
            anchorEl: null,
            open: false
        })
        if (handleSelectMenu !== undefined && handleSelectMenu !== null) {
            let selectedMenuName = isValidData(menu.MenuName) ? menu.MenuName : menu.Name
            handleSelectMenu(selectedMenuName)
        }
    }

    chooseNestedItem = (menu, event) => {
        event.preventDefault()
        event.stopPropagation()
        const {handleSelectMenu} = this.props;
        this.setState({
            nestedMenu: null,
            nestedMenuOpen: false
        })
        // if (handleSelectMenu !== undefined && handleSelectMenu !== null) {
        //     let selectedMenuName = isValidData(menu.MenuName) ? menu.MenuName : menu.Name
        //     handleSelectMenu(selectedMenuName)
        // }
    }

    handleClose = (event) => {
        event.preventDefault()
        event.stopPropagation()
        this.setState({
            anchorEl: null,
            open: false
        })
    };

    handleNestedClose = () => {
        this.setState({
            nestedMenu: null,
            nestedMenuOpen: false
        })
    }

    getCustomMenuDesign = (type, selectedValue) => {
        return (
            type === "Invention Status" ?
                <div className="invention-status-menu-list-container">
                    <div className="invention-status-menu-list-title">
                        {"Mark this invention as "}
                    </div>
                    <div className={"invention-status-menu-list"}>
                        {
                            this.state.inventionStatusList.map((eachMenu, index) =>
                                <div onClick={() => this.props.onChange(eachMenu.MenuName)} key={index}
                                     className="invention-status-menu-item">
                                    <MyRadio checked={selectedValue === eachMenu.MenuName}
                                             onChange={() => {
                                             }}
                                        // onChange={() => this.props.onChange(eachMenu.MenuName)}
                                    />
                                    {eachMenu.Name}
                                </div>
                            )
                        }
                    </div>
                </div>
                :
                null
        )
    }

    render() {
        let {
            menuList,
            fill,
            maxHeight,
            menuIcon,
            menuType,
            customMenuDesign,
            selectedValue,
            handleSelectNestedMenu,
            parentMenuName
        } = this.props;
        return (
            <>
                {
                    menuType === "custom" ?
                        <div onClick={this.handleClick.bind(this)}>
                            <span>
                               {parentMenuName}
                           </span>
                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={this.state.open ? 'long-menu' : undefined}
                                aria-expanded={this.state.open ? 'true' : undefined}
                                aria-haspopup="true"
                                // onClick={this.handleClick.bind(this)}
                                // onMouseEnter={this.handleClick.bind(this)}
                                // onMouseLeave={this.handleClick.bind(this)}
                            >
                                <Icon icon={menuIcon} style={{fill: fill}}/>
                            </IconButton>
                        </div>
                        :
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={this.state.open ? 'long-menu' : undefined}
                            aria-expanded={this.state.open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick.bind(this)}
                            // onMouseEnter={this.handleClick.bind(this)}
                            // onMouseLeave={this.handleClick.bind(this)}
                        >
                            <Icon icon={menuIcon} style={{fill: fill}}/>
                        </IconButton>
                }
                <Menu
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleClose.bind(this)}
                    PaperProps={{
                        style: {
                            maxHeight: maxHeight,
                            display: "flex",
                            flexDirection: "column",
                        },
                    }}
                >
                    {
                        menuType === "default" ?
                            menuList.map((menu, mid) => (
                                menu.Availability === false ?
                                    null
                                    :
                                    menu.Name === "divider" || menu.Name === "Divider" ?
                                        <Divider/>
                                        :
                                        <MenuItem key={mid}
                                                  disabled={menu.Disabled === true}
                                                  onClick={menu.Disabled === true ? () => {
                                                  } : this.chooseItem.bind(this, menu)}>
                                            <div className="menu-item">
                                                {
                                                    menu.IconType === "duo" ?
                                                        <DuoIcon name={menu.Icon} size={14}
                                                                 className={menu.Disabled ? "menu-item-icon disabled" : "menu-item-icon"}/>
                                                        :
                                                        menu.Icon === "reinforcement" ?
                                                            <DuoIcon name={menu.Icon} size={14}
                                                                     colorList={['', "#000000", "#000000", "#000000", "#000000"]}
                                                                     className={menu.Disabled ? "menu-item-icon disabled" : "menu-item-icon"}/>
                                                            :
                                                            <Icon icon={menu.Icon}
                                                                  style={{fill: menu.MenuName === "delete" || menu.Name === "Delete" || menu.Name === "Remove" ? "var(--fail-color)" : "var(--light-sky)"}}
                                                                  className={menu.Disabled ? "menu-item-icon disabled" : "menu-item-icon"}/>
                                                }
                                                {
                                                    menu.NestedType === "custom" ?
                                                        null
                                                        :
                                                        menu.Name
                                                }
                                                {
                                                    menu.Disabled &&
                                                    menu.DisabledInformation !== undefined && menu.DisabledInformation !== null && menu.DisabledInformation !== "" &&
                                                    <Icon icon={"info"}
                                                          title={menu.DisabledInformation}
                                                          size={14}
                                                          className="context-menu-disabled-explaination"/>
                                                }

                                                {
                                                    menu.NestedType === "custom" ?
                                                        <MyContextMenu menuIcon={"forward_arrow"}
                                                                       menuType={"custom"}
                                                                       parentMenuName={menu.Name}
                                                                       selectedValue={menu.Value}
                                                                       onChange={(value) => handleSelectNestedMenu(menu.MenuName, value)}
                                                                       customMenuDesign={menu.NestedMenuFunction}
                                                                       menuList={[{Name: "Invention Status"}]}/>
                                                        :
                                                        null

                                                }
                                            </div>
                                        </MenuItem>
                            ))
                            :
                            this.getCustomMenuDesign(customMenuDesign, selectedValue)
                    }
                </Menu>
            </>
        );
    }
}

MyContextMenu.defaultProps = {
    maxHeight: 300,
    menuIcon: "edit_more",
    menuType: "default",
}

MyContextMenu.propTypes = {
    maxHeight: PropTypes.any,
    menuList: PropTypes.arrayOf(PropTypes.shape({
        Name: PropTypes.string
    })).isRequired,
    menuIcon: PropTypes.string,
    menuType: PropTypes.oneOf(["default", "custom"]),
    customMenuDesign: PropTypes.func,
}