import React, {useState} from "react";
import './StyleSheet.css'
import {MyTooltip} from "../Tooltip/Tooltip";
import Icon from "../../../../IconLibrary/Icon";
import PropTypes from 'prop-types'
import DuoIcon from "../../../../IconLibrary/DuoIcon";

const MyIconToggler = ({itemList, toggleFunction, width, height, label, disabled, IconFillRule, toggleIndex}) => {

    const [activeToggle, setActiveToggle] = useState(toggleIndex)

    function handleIconToggler(i) {
        setActiveToggle(i)
        toggleFunction(i)  // function from props
    }

    return (
        <div className={disabled ? 'my-icon-toggler-container-disabled' : 'my-icon-toggler-container'}
             style={{width: width, height: height}}
        >
            {/*<div className='my-icon-toggler-title' style={{color: disabled && '#333333'}}>{label}</div>*/}
            <div className='my-icon-toggler-icons-container'>
                {
                    itemList.map((eachItem, i) => {
                        return (
                            <MyTooltip title={eachItem.Name}>
                                <div
                                    className={activeToggle === i ? 'my-icon-toggler-body-active' : 'my-icon-toggler-body'}
                                    onClick={disabled === true ? () => {
                                    } : () => handleIconToggler(i)}
                                    style={{backgroundColor: disabled ? '#999999' : '',}}
                                >
                                    {
                                        eachItem.IconType === "Duo" ?
                                            <DuoIcon name={eachItem.Icon} size={16} fillRule={IconFillRule}
                                                     style={{fill: activeToggle === i ? 'white' : '#09092d'}}/>
                                            :
                                            <Icon icon={eachItem.Icon}
                                                  size={16}
                                                  fillRule={IconFillRule}
                                                  style={{fill: activeToggle === i ? 'white' : '#09092d'}}/>
                                    }
                                </div>
                            </MyTooltip>
                        )
                    })}
            </div>
        </div>
    )
}

export default MyIconToggler;

MyIconToggler.prototype = {
    itemList: PropTypes.arrayOf(
        PropTypes.shape({
            Name: PropTypes.string,
            Icon: PropTypes.string.isRequired,
            Disabled: PropTypes.bool
        })
    ).isRequired,
    toggleFunction: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    IconFillRule: PropTypes.string,
}

MyIconToggler.defaultProps = {
    itemList: [
        {id: 1, Name: 'card_view', Icon: 'card_view2',},
        {id: 2, Name: 'table_view', Icon: 'table1',}],
    toggleFunction: () => {
    },
    width: 'fit-content',
    height: '30px',
    label: 'View',
    disabled: false,
    IconFillRule: ""
}























