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
import "./sysPopup.css"
import Popup from "reactjs-popup";
import Icon from "../../../../IconLibrary/Icon";
import PropTypes from "prop-types";
import DuoIcon from "../../../../IconLibrary/DuoIcon";
class SysPopup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            /** Boolean Data **/
            Open: false,
            CloseOnDocumentClick: false,
            CloseOnEscape: false,
            LockScroll: false,
            HelpMode: false,
            ExitBtn: true,
            SaveBtn: false,
            RefreshBtn: false,
            ResetBtn: false,
            HelpBtn: false,
            MinimizeBtn: false,
            SettingBtn: false,
            CreateBtn: false,
            SettingTooltip:"Advanced Setting",
            BottomRow: false,
            DisableSubmit: false,
            DisableClose: false,
            DisableReset: false,
            DisableAdvanced: false,
            DisableCreate: false,



            /** Style Control **/
            ActiveColor: "rgba(255, 255, 255, 0.51)",
            LayoutWidth: "100%",
            containerHeight:"auto",
            BodyHeight:"78vh",

            /** Menu List **/
            TabMenuList: [],
            MainMenuList: [],
            SubMenuList: [],
            ChosenMenu:{},

            /** Others **/
            iconColorList: [],
            iconName: '',
            Title:"Sample Popup",
            iconType : "single",

        }
    }

    _isMounted = false
    componentDidMount() {
        this._isMounted =true
        if (this._isMounted){
            this.setState({
                Open : true
            })
            this.getDataFromCaller(this.props)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getDataFromCaller(nextProps)
    }

    componentWillUnmount() {
        this._isMounted = false
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

        if(data.HelpBtn !== undefined && data.HelpBtn !== null){
            let{HelpBtn}= data;
            this.setState({
                HelpBtn: HelpBtn
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
        if(data.SettingBtn !== undefined && data.SettingBtn !== null){
            let {SettingBtn} = data;
            this.setState({
                SettingBtn : SettingBtn,
            })
        }
        if(data.MinimizeBtn !== undefined && data.MinimizeBtn !== null){
            let {MinimizeBtn} = data;
            this.setState({
                MinimizeBtn : MinimizeBtn,
            })
        }
        if(data.CreateBtn !== undefined && data.CreateBtn !== null){
            let {CreateBtn} = data;
            this.setState({
                CreateBtn : CreateBtn,
            })
        }
        if(data.SettingTooltip !== undefined && data.SettingTooltip !== null){
            let {SettingTooltip} = data;
            this.setState({
                SettingTooltip : SettingTooltip,
            })
        }

        if(data.DisableSubmit !== undefined && data.DisableSubmit !== null){
            let {DisableSubmit} = data;
            this.setState({
                DisableSubmit : DisableSubmit,
            })
        }
        if(data.BottomRow !== undefined && data.BottomRow !== null){
            let {BottomRow} = data;
            this.setState({
                BottomRow : BottomRow,
            })
        }
        if(data.DisableClose !== undefined && data.DisableClose !== null){
            let {DisableClose} = data;
            this.setState({
                DisableClose : DisableClose,
            })
        }

        if(data.DisableAdvanced !== undefined && data.DisableAdvanced !== null){
            let {DisableAdvanced} = data;
            this.setState({
                DisableAdvanced : DisableAdvanced,
            })
        }

        if(data.DisableReset !== undefined && data.DisableReset !== null){
            let {DisableReset} = data;
            this.setState({
                DisableReset : DisableReset,
            })
        }
        if(data.DisableCreate !== undefined && data.DisableCreate !== null){
            let {DisableCreate} = data;
            this.setState({
                DisableCreate : DisableCreate,
            })
        }

        /** Style Control **/
        if(data.ActiveColor !== undefined && data.ActiveColor !== null){
            let {ActiveColor} = data;
            this.setState({
                ActiveColor : ActiveColor,
            })
        }
        if(data.LayoutWidth !== undefined && data.LayoutWidth !== null){
            let {LayoutWidth} = data;
            this.setState({
                LayoutWidth : LayoutWidth,
            })
        }
        if(data.containerHeight !== undefined && data.containerHeight !== null){
            let {containerHeight} = data;
            this.setState({
                containerHeight : containerHeight,
            })
        }

        /** Menu List **/
        if(data.TabMenuList !== undefined && data.TabMenuList !== null){
            let {TabMenuList} = data;
            this.setState({
                menuList : TabMenuList,
            })
        }
        if(data.MainMenuList !== undefined && data.MainMenuList !== null){
            let {MainMenuList} = data;
            this.setState({
                MainMenuList : MainMenuList,
            })
        }
        if(data.SubMenuList !== undefined && data.SubMenuList !== null){
            let {SubMenuList} = data;
            this.setState({
                SubMenuList : SubMenuList,
            })
        }

        /** Others **/
        if(data.Title !== undefined && data.Title !== null){
            let {Title} = data;
            this.setState({
                Title : Title,
            })
        }
        if(data.iconColorList !== undefined && data.iconColorList !== null){
            let {iconColorList} = data;
            this.setState({
                iconColorList : iconColorList,
            })
        }
        if(data.iconName !== undefined && data.iconName !== null){
            let {iconName} = data;
            this.setState({
                iconName : iconName,
            })
        }
        if(data.iconType !== undefined && data.iconType !== null){
            let {iconType} = data;
            this.setState({
                iconType : iconType,
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
        let children = React.Children.toArray(this.props.children);
        return (
            this.state.Open?
                <Popup contentStyle={{
                    width: "auto",
                    background: "transparent",
                    padding: 0,
                    border: "none",
                    borderRadius: 0,
                }}
                       open={this.state.Open}
                       closeOnDocumentClick={this.state.CloseOnDocumentClick}
                       lockScroll={this.state.LockScroll}
                       closeOnEscape={this.state.CloseOnEscape}>

                    <div className="sys-popup-layout" style={{width: this.state.LayoutWidth}}>

                        <div className="sys-popup-header">
                            <div className="sys-popup-header-left">
                                {
                                    this.state.iconName !== "" && this.state.iconName !== undefined && this.state.iconName !== null ?
                                        this.state.iconType === "single" ?
                                            <Icon icon={this.state.iconName} size={20}  className="sys-popup-icon"/>
                                            :
                                            this.state.iconColorList !== undefined && this.state.iconColorList !== null && this.state.iconColorList !== "" ?
                                                <DuoIcon name={this.state.iconName} colorList={this.state.iconColorList} size={30}  className="sys-popup-icon"/>
                                                :
                                                null
                                        :
                                        null
                                }


                                <div className="sys-popup-title" title={this.state.Title}>
                                    {this.state.Title}
                                </div>
                            </div>

                            <div className="sys-popup-main-menu-bar">
                                {
                                    this.state.CreateBtn?
                                        <button className="sys-popup-main-menu" title="Reset " onClick={this.props.onCreateNew} disabled={this.state.DisableCreate}>
                                            <Icon icon='add' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }
                                {
                                    this.state.MainMenuList !== undefined && this.state.MainMenuList !== null && this.state.MainMenuList !== ""?
                                        this.state.MainMenuList.length !== 0?
                                            this.state.MainMenuList.map((res,index)=>{
                                                return(
                                                    <button className="sys-popup-main-menu_custom"
                                                            disabled={res.disabled}
                                                            onClick={res.onActive}
                                                            title={
                                                                res.tooltip !== undefined && res.tooltip !== null && res.tooltip !== ""?
                                                                    res.tooltip
                                                                    :
                                                                    null
                                                            }>
                                                        {
                                                            res.icon !== undefined && res.icon !== null && res.icon !== ""?
                                                                <Icon icon={res.icon} size={16}/>
                                                                :
                                                                null
                                                        }
                                                        {
                                                            res.name !== undefined && res.name !== null && res.name !== ""?
                                                                <span>&nbsp;{res.name}</span>
                                                                :
                                                                null
                                                        }
                                                    </button>
                                                )
                                            })
                                            :
                                            null
                                        :
                                        null
                                }

                                {
                                    this.state.ResetBtn?
                                        <button className="sys-popup-main-menu" title="Reset " onClick={this.props.OnReset} disabled={this.state.DisableReset}>
                                            <Icon icon='reset' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }
                                {
                                    this.state.RefreshBtn?
                                        <button className="sys-popup-main-menu" title="Refresh" onClick={this.props.onRefresh}>
                                            <Icon icon='refresh' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }

                                {
                                    this.state.SaveBtn?
                                        <button className="sys-popup-main-menu" title="Save" onClick={this.props.onSave}>
                                            <Icon icon='save' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }
                                {
                                    this.state.SettingBtn?
                                        <button className="sys-popup-main-menu" title={this.state.SettingTooltip} onClick={this.props.onAdvanced} disabled={this.state.DisableAdvanced}>
                                            <Icon icon='setting' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }
                                {
                                    this.state.HelpBtn?
                                        <button className="sys-popup-main-menu" title="Help" onClick={this.props.openHelp}>
                                            <Icon icon='help' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }
                                {
                                    this.state.MinimizeBtn?
                                        <button className="sys-popup-main-menu" title="Close" onClick={this.props.onMinimize}>
                                            <Icon icon='minimum_window' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }

                                {
                                    this.state.ExitBtn?
                                        <button className="sys-popup-main-menu" title="Close" onClick={this.props.onClose}>
                                            <Icon icon='close' className='sys-popup-menu-icon' size={16}/>
                                        </button>
                                        :
                                        null
                                }









                            </div>
                        </div>
                        <div className="sys-popup-body-container">
                            <div className="sys-popup-body" id="sys_popup_body">
                                {children.map((res,index)=> res)}
                            </div>

                            {
                                this.props.BottomRow !==  undefined  && this.props.BottomRow !== null ?
                                    <div className="sys-popup-bottom-row" style={{paddingTop: this.state.containerHeight}}>
                                        <button className="sys-popup-cancel-btn" onClick={this.props.onClose} disabled={this.state.DisableClose}>
                                            Cancel
                                        </button>
                                        <button className="sys-popup-submit-btn" onClick={this.props.onSave} disabled={this.state.DisableSubmit}>
                                            Save
                                        </button>
                                    </div>
                                    :
                                    null

                            }
                        </div>

                    </div>
                </Popup>
                :
                null
        )
    }
}


SysPopup.propTypes ={
    Open: PropTypes.bool.isRequired,
    CloseOnDocumentClick: PropTypes.bool,
    CloseOnEscape:  PropTypes.bool,
    LockScroll: PropTypes.bool,
    HelpMode: PropTypes.bool,
    ExitBtn: PropTypes.bool,
    SaveBtn: PropTypes.bool,
    RefreshBtn: PropTypes.bool,
    ResetBtn: PropTypes.bool,
    HelpBtn: PropTypes.bool,
    CreateBtn: PropTypes.bool,
    DisableSubmit: PropTypes.bool,
    DisableClose: PropTypes.bool,
    MinimizeBtn: PropTypes.bool,
    SettingBtn: PropTypes.bool,
    DisableReset: PropTypes.bool,
    DisableAdvanced: PropTypes.bool,
    DisableCreate: PropTypes.bool,
    ActiveColor: PropTypes.string,
    LayoutWidth: PropTypes.string,
    containerHeight: PropTypes.string,
    BodyHeight: PropTypes.string,
    Title: PropTypes.string.isRequired,
    TabMenuList: PropTypes.array,
    MainMenuList: PropTypes.array,
    SubMenuList: PropTypes.array,
    ChosenMenu:PropTypes.array,
    openHelp: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    onRefresh: PropTypes.func,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func,

    onAdvanced: PropTypes.func,
    onMinimize: PropTypes.func,
    onChangeHandler: PropTypes.func,
    Header: PropTypes.element,
    iconName: PropTypes.string,
    iconColorList: PropTypes.array,
    iconType: PropTypes.oneOf(['single','duo'])

}
export default SysPopup;