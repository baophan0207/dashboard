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
import Popup from "reactjs-popup";
import Icon from "../../../icons/Icon";
import PropTypes from "prop-types";

class DropDownSelect extends React.Component{
    constructor(props) {
        super(props);
        let {MenuList} = this.props;
        this.state = {


            /** Boolean Data **/
            Open: true,
            CloseOnDocumentClick: false,
            CloseOnEscape: false,
            LockScroll: false,
            HelpMode: false,
            ExitBtn: true,
            SaveBtn: false,
            RefreshBtn: false,
            ResetBtn: false,
            HelpBtn: true,

            /** Others **/
            Title:"Sample Popup",

        }
    }

    componentDidMount() {
        this.getDataFromCaller(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.getDataFromCaller(nextProps)
    }

    getDataFromCaller(data){



        /** Boolean Data **/
        if(data.Open !== undefined && data.Open !== null && typeof data.Open === "boolean"){
            let {Open} = data;
            this.setState({
                Open : Open,
            })
        }
        if(data.CloseOnDocumentClick !== undefined && data.CloseOnDocumentClick !== null && typeof data.CloseOnDocumentClick === "boolean"){
            let {CloseOnDocumentClick} = data;
            this.setState({
                CloseOnDocumentClick : CloseOnDocumentClick,
            })
        }
        if(data.CloseOnEscape !== undefined && data.CloseOnEscape !== null && typeof data.CloseOnEscape === "boolean"){
            let {CloseOnEscape} = data;
            this.setState({
                CloseOnEscape : CloseOnEscape,
            })
        }
        if(data.LockScroll !== undefined && data.LockScroll !== null && typeof data.LockScroll === "boolean"){
            let {LockScroll} = data;
            this.setState({
                LockScroll : LockScroll,
            })
        }
        if(data.HelpMode !== undefined && data.HelpMode !== null){
            let {HelpMode} = data;
            this.setState({
                HelpMode : HelpMode,
            })
        }
        if(data.ExitBtn !== undefined && data.ExitBtn !== null){
            let {ExitBtn} = data;
            this.setState({
                ExitBtn : ExitBtn,
            })
        }
        if(data.SaveBtn !== undefined && data.SaveBtn !== null){
            let {SaveBtn} = data;
            this.setState({
                SaveBtn : SaveBtn,
            })
        }
        if(data.RefreshBtn !== undefined && data.RefreshBtn !== null){
            let {RefreshBtn} = data;
            this.setState({
                RefreshBtn : RefreshBtn,
            })
        }
        if(data.ResetBtn !== undefined && data.ResetBtn !== null){
            let {ResetBtn} = data;
            this.setState({
                ResetBtn : ResetBtn,
            })
        }


        if(data.Title !== undefined && data.Title !== null){
            let {Title} = data;
            this.setState({
                Title : Title,
            })
        }


    }


    changeTab(id){
        let menuList  = this.state.menuList;
        for(let i=0; i<menuList.length;i++){
            menuList[i].isSelected = false;
        }
        menuList[id].isSelected = true;
        this.setState({
            menuList: menuList,
            ChosenMenu: menuList[id],
        })

        let {onChangeHandler}=this.props;
        onChangeHandler(menuList, menuList[id]);

    }





    render() {
        return (
            <Popup contentStyle={{
                width: "auto",
                borderRadius:0,
                padding: 0,
                background: "transparent",
                position: "relative",
                border:"none",
                boxShadow: "0 14px 28px 2px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            }}
                   open={this.state.Open}
                   closeOnDocumentClick={this.state.CloseOnDocumentClick}
                   lockScroll={this.state.LockScroll}
                   closeOnEscape={this.state.CloseOnEscape}>
                <button className="popup--exit" onClick={this.props.onClose}>
                    <Icon icon='close' fill='#ffffff' size={16} className='close-icon' />
                </button>
                <button className="popup--help-btn" onClick={this.props.openHelp}>
                    <Icon icon="help" fill="white" size={16}/>
                </button>
                <div className="one-click-config-confirmation-popup">
                    <div className="one-click-config-confirmation-header">
                        <Icon icon="one_drop_app" size={40} className="one-click-config-title-icon"/>
                        <div>{this.state.Title}</div>
                    </div>
                    <div className="one-click-config-confirmation-body">
                        {this.props.children}
                    </div>
                </div>
            </Popup>
        )
    }
}


CreatePopup.propTypes ={
    Open: PropTypes.bool.isRequired,
    Title: PropTypes.string.isRequired,
    CloseOnDocumentClick: PropTypes.bool,
    CloseOnEscape: PropTypes.bool,
    LockScroll: PropTypes.bool,
    HelpMode: PropTypes.bool,
    ExitBtn: PropTypes.bool,
    SaveBtn: PropTypes.bool,
    RefreshBtn: PropTypes.bool,
    ResetBtn: PropTypes.bool,
    HelpBtn: PropTypes.bool,


}
export default DropDownSelect;
