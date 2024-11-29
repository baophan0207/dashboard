import React from "react";
import "./contextMenu.css";
import Icon from "../../../IconLibrary/Icon";
import PropTypes from "prop-types";
import DuoIcon from "../../../IconLibrary/DuoIcon";
import {isValidData} from "../CommonMethods";

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableMenu: true
        }
    }

    handleSelectMenu(menu, event) {
        console.log("entered to handleSelectMenu in context menu : ", menu)
        event.preventDefault()
        event.stopPropagation()
        const {handleSelectMenu} = this.props;
        this.setState({
            enableMenu: false
        })
        if (handleSelectMenu !== undefined && handleSelectMenu !== null) {
            let selectedMenuName = isValidData(menu.MenuName) ? menu.MenuName : menu.Name
            handleSelectMenu(selectedMenuName)
        }
    }

    enableMenu = () => {
        this.setState({
            enableMenu: true
        })
    }

    render() {
        let {
            menuList,
            iconType,
            fill,
            contextMenuIcon,
            top,
            bottom,
            left,
            right,
            height,
            header,
            directMenu
        } = this.props;
        return (
            directMenu === true ?
                this.state.enableMenu &&
                <div className="custom-context-menu-list"
                     style={{
                         display: "block",
                         top: top,
                         bottom: bottom,
                         left: left,
                         right: right,
                         maxHeight: height,
                         paddingTop: header !== undefined && header !== null && header.length !== 0 ? 0 : "5px"
                     }}>
                    {
                        header !== undefined && header !== null && header.length !== 0 ?
                            <div className="custom-context-menu-list-header" title={header}>
                                <div className="custom-context-menu-list-header-text">
                                    {header}
                                </div>
                            </div>
                            :
                            null
                    }
                    {
                        menuList.map((menu, mid) =>
                            menu.Name === "divider" ?
                                <div key={menu.Name + "_" + mid} className="custom-context-menu-divider"/>
                                :
                                menu.IsAvailable === false ?
                                    null
                                    :
                                    <div
                                        onMouseUp={menu.Disabled === true ? () => {
                                        } : this.handleSelectMenu.bind(this, menu)}
                                        className={menu.Disabled === true ? "custom-context-menu disabled" : "custom-context-menu"}
                                        key={menu + "_" + mid}>
                                        {
                                            iconType === "single" ?
                                                <Icon icon={menu.Icon} className="custom-context-menu-icon"/>
                                                :
                                                <DuoIcon name={menu.Icon} className="custom-context-menu-icon"
                                                         size={12}/>
                                        }
                                        <div className="custom-context-menu-name">
                                            {menu.Name}
                                        </div>
                                    </div>
                        )
                    }
                </div>
                :
                <div className="custom-context-menu-btn">
                    {
                        // iconType === "single" ?
                            <Icon onMouseOver={this.enableMenu} icon={contextMenuIcon} style={{fill: fill}}/>
                        //     :
                        // <DuoIcon onMouseOver={this.enableMenu} name={contextMenuIcon} size={16}/>
                    }
                    {
                        this.state.enableMenu === true &&
                        <div className="custom-context-menu-list"
                             style={{
                                 top: top,
                                 bottom: bottom,
                                 left: left,
                                 right: right,
                                 maxHeight: height,
                                 paddingTop: header !== undefined && header !== null && header.length !== 0 ? 0 : "5px"
                             }}>
                            {
                                header !== undefined && header !== null && header.length !== 0 ?
                                    <div className="custom-context-menu-list-header">
                                        <div className="custom-context-menu-list-header-text">
                                            {header}
                                        </div>

                                    </div>
                                    :
                                    null
                            }
                            {
                                menuList.map((menu, mid) =>
                                    menu.Name === "divider" ?
                                        <div key={menu.Name + "_" + mid} className="custom-context-menu-divider"/>
                                        :
                                        menu.IsAvailable === false ?
                                            null
                                            :
                                            <div
                                                onMouseUp={menu.Disabled === true ? () => {
                                                } : this.handleSelectMenu.bind(this, menu)}
                                                className={menu.Disabled === true ? "custom-context-menu disabled" : "custom-context-menu"}
                                                key={menu + "_" + mid}>
                                                {
                                                    iconType === "single" ?
                                                        <Icon icon={menu.Icon} className="custom-context-menu-icon"/>
                                                        :
                                                        <DuoIcon name={menu.Icon} className="custom-context-menu-icon"
                                                                 size={12}/>
                                                }
                                                <div className="custom-context-menu-name">
                                                    {menu.Name}
                                                </div>
                                            </div>
                                )
                            }
                        </div>
                    }
                </div>
        );
    }

}

ContextMenu.defaultProps = {
    menuList: [
        {
            Name: "Long menu name",
            Icon: "info",
            Disabled: false
        },
        {
            Name: "Info",
            Icon: "info"
        },
        {
            Name: "Share",
            Icon: "info",
            Disabled: true
        },
    ],
    iconType: "single",
    contextMenuIcon: "edit_more",
    top: 0,
    bottom: "auto",
    right: "auto",
    left: 28,
    fill: "#555555",
    height: "400px"
}
ContextMenu.propTypes = {
    menuList: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Icon: PropTypes.string,
        })
    ).isRequired,
    iconType: PropTypes.oneOf(["single", "duo"]),
    top: PropTypes.any,
    bottom: PropTypes.any,
    left: PropTypes.any,
    right: PropTypes.any,
    fill: PropTypes.string,
    height: PropTypes.string,
};

export default ContextMenu;