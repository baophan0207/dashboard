/*

 Copyright (c) 2016-2023, AnyGen AI Inc.  All rights reserved.


 IMPORTANT - PLEASE READ THIS CAREFULLY BEFORE ATTEMPTING TO USE ANY SOFTWARE,

 DOCUMENTATION, OR OTHER MATERIALS.

 This software is the confidential and proprietary information of AnyGen AI Inc

 ("Confidential Information") and is protected by applicable copyright or other

 intellectual property laws and treaties. All title and ownership rights in and

 to the software (including but not limited to any source code, images,

 photographs, animations, video, audio, music, text embedded in the software),

 the intellectual property embodied in the software, and any trademarks or

 service marks of AnyGen AI Inc. that are used in connection with the

 software, are and shall at all times remain exclusively owned by AnyGen AI,

 Inc. and its licensors.  Under no circumstances shall you disclose such

 Confidential Information and trade secrets, distribute, disclose or otherwise

 make available to any third party any portion of the software's source code

 and shall use it only in accordance with the terms of the license agreement

 enclosed with this product or as entered into with AnyGen AI, Inc.


 You are prohibited from any attempt to disassemble the code, or attempt in

 any manner to reconstruct, discover, reuse or modify any source code or

 underlying algorithms of the software.


 THIS SOFTWARE IS PROVIDED "AS IS" AND THERE ARE NO WARRANTIES, CLAIMS OR

 REPRESENTATIONS MADE BY AnyGen AI, INC., OR ITS LICENSORS, SUBSIDIARIES

 AND AFFILIATES, EITHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WARRANTIES

 OF QUALITY, PERFORMANCE, NON-INFRINGEMENT, MERCHANTABILITY, OR FITNESS FOR

 A PARTICULAR PURPOSE, NOR ARE THERE ANY WARRANTIES CREATED BY COURSE OF

 DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE. AnyGen AI, INC. DOES NOT

 WARRANT THAT THIS SOFTWARE WILL MEET ANY CLIENT'S NEEDS OR BE FREE FROM

 ERRORS, OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED.
*/

import React from "react";
import "./basicComponent.css"
import GlxPopup from "./GlxPopup/GlxPopup";
import PropTypes from "prop-types";
import SysPopup from "./SysPopup/SysPopup";

class MenuTab extends React.Component {
    constructor(props) {
        super(props);
        let {MenuList} = this.props;
        this.state = {
            menuList: MenuList,
            chosenMenu: {},
            HelpMode: false,
            activeColor: "white",
        }
    }

    componentDidMount() {
        this.getDataFromCaller(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.getDataFromCaller(nextProps)
    }

    getDataFromCaller(data) {
        if (data.MenuList !== undefined && data.MenuList !== null) {
            let {MenuList} = data;
            this.setState({
                menuList: MenuList,
            })
        }
        if (data.HelpMode !== undefined && data.HelpMode !== null) {
            let {HelpMode} = data;
            this.setState({
                HelpMode: HelpMode,
            })
        }
        if (data.activeColor !== undefined && data.activeColor !== null) {
            let {activeColor} = data;
            this.setState({
                activeColor: activeColor,
            })
        }
    }

    changeTab(id) {
        let menuList = this.state.menuList;
        for (let i = 0; i < menuList.length; i++) {
            menuList[i].isSelected = false;
        }
        menuList[id].isSelected = true;
        this.setState({
            menuList: menuList,
            chosenMenu: menuList[id],
        })

        let {onChangeHandler} = this.props;
        onChangeHandler(menuList, menuList[id]);

    }

    render() {
        return (

            <div className={this.state.HelpMode ? "sirius-menu-tab-bar HelpMode" : "sirius-menu-tab-bar"}>
                {
                    this.state.menuList.map((res, index) => {
                        return (
                            <button className={res.isSelected ? "sirius-menu-tab active" : "sirius-menu-tab"}
                                    key={index}
                                    style={{
                                        background:
                                            res.isSelected ?
                                                res.activeColor !== undefined && res.activeColor !== null && res.activeColor !== " " ?
                                                    res.activeColor.length !== 0 ?
                                                        res.activeColor
                                                        :
                                                        "white"
                                                    :
                                                    "white"
                                                :
                                                "transparent"
                                    }}
                                    disabled={res.disabled}
                                    onClick={this.changeTab.bind(this, index)}>
                                {res.name}
                                {
                                    res.isSelected ?
                                        <div className="sirius-menu-tab-active-bar">
                                            <div className="sirius-menu-tab-circle"/>
                                            {/*<div className="sirius-menu-tab-line"/>*/}
                                            <div className="sirius-menu-tab-circle2"/>
                                        </div>
                                        :
                                        null
                                }
                            </button>
                        )
                    })
                }
            </div>
        )
    }
}

SysPopup.propTypes = {
    menuList: PropTypes.array.isRequired,


}
export default MenuTab;
