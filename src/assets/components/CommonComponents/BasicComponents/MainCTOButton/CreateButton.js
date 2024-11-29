import React from "react";
import "./createButton.css";
import Icon from "../../../../icons/Icon";
import PropTypes from "prop-types";
import DuoIcon from "../../../../icons/DuoIcon";
import BeaconSpot from "../../BeaconSpot";

class CreateButton extends React.Component {
    constructor(props) {
        super(props);
    }

    chooseCreationType(typeID) {
        let {onClick} = this.props;
        onClick(typeID)
    }

    render() {
        const {
            disabled,
            id,
            title,
            children,
            multiCreator,
            createTypeList,
            beaconSpotList,
            onClick,
            isHighlight
        } = this.props;
        return (
            <button className="main-cta-btn"
                    id={id !== undefined && id !== null && id !== "" ? id : null}
                    title={title !== undefined && title !== null ? title : null}
                    onClick={multiCreator ? null : onClick} disabled={disabled}>
                {/*{*/}
                {/*    !noIcon?*/}
                {/*        <Icon icon={icon} size={icon==="add_source"?18:14} className="main-cta-btn-icon"/>*/}
                {/*        :*/}
                {/*        null*/}
                {/*}*/}
                {/*&nbsp;*/}
                {children}
                {
                    multiCreator ?
                        createTypeList !== undefined && createTypeList !== null && createTypeList.length !== 0 && !disabled ?
                            <>
                                <Icon icon={"drop_down"} className="main-cta-dropdown-icon"/>
                                <div className="main-cta-drop-down-list">
                                    {
                                        createTypeList.map((createType, cid) => {
                                            return (
                                                <div className="main-cta-drop-down-item"
                                                     onClick={this.chooseCreationType.bind(this, cid)}>
                                                    {
                                                        beaconSpotList !== undefined ?
                                                            <BeaconSpot
                                                                open={beaconSpotList[createType.TypeName] === true}
                                                                spotStyle={{
                                                                    color: "#00810c",
                                                                    left: "auto",
                                                                    right: "0px"
                                                                }}/>
                                                            :
                                                            null
                                                    }
                                                    <DuoIcon name={createType.Icon.IconName}
                                                             colorList={createType.Icon.ColorList}/>
                                                    &nbsp; {createType.TypeName}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>

                            :
                            null
                        :
                        null
                }
                {
                    isHighlight ?
                        <BeaconSpot open={true} spotStyle={{color: "#6affc2", left: "10%"}}/>
                        :
                        null

                }

            </button>
        );
    }

}


CreateButton.defaultProps = {
    icon: 'add',
    disabled: false,
    multiCreator: false,
    height: "30px",
    noIcon: false,
    isHighlight: false,

}
CreateButton.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    multiCreator: PropTypes.bool,
    isHighlight: PropTypes.bool,
    createTypeList: PropTypes.array,
    onClick: PropTypes.func.isRequired,
}

export default CreateButton;