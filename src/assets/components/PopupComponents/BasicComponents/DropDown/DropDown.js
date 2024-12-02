import React, { Fragment, useState, useEffect } from 'react'
import './DropDown.css'
import PropTypes from 'prop-types'
import Icon from '../../../../icons/Icon'

const DropDown = (props) => {
    const [state, setState] = useState({
        value: '',
        list: [],
        icon: props.icon,
        iconColor: props.iconColor,
        showDropDownList: false,
        disabled: props.disabled,
        multiLabel: props.multiLabel,
        listTitle: props.listTitle,
        dropDownListStyle: props.dropDownListStyle,
        placeholder: props.placeholder,
        className: props.className,
        dropDownStyle: props.dropDownStyle,
    })

    useEffect(() => {
        if (
            props.list !== undefined &&
            props.list !== null &&
            props.list !== ''
        ) {
            const {
                list,
                value,
                icon,
                iconColor,
                disabled,
                multiLabel,
                listTitle,
                dropDownListStyle,
                placeholder,
                className,
                dropDownStyle,
            } = props
            setState((prev) => ({
                ...prev,
                list,
                value,
                icon,
                iconColor,
                disabled,
                multiLabel,
                listTitle,
                dropDownListStyle,
                placeholder,
                className,
                dropDownStyle,
            }))
        }
    }, [props])

    const handleDropDownList = () => {
        setState((prev) => ({
            ...prev,
            showDropDownList: !prev.showDropDownList,
        }))
    }

    const handleClickDropDownValue = (chosenValue) => {
        props.onChange(chosenValue)
        setState((prev) => ({
            ...prev,
            value: chosenValue,
            showDropDownList: false,
        }))
    }

    const handleClickMultiDropDown = (chosenList) => {
        props.onChange(chosenList)
        setState((prev) => ({
            ...prev,
            value: chosenList,
            showDropDownList: false,
        }))
    }

    const handleOpenPopup = (eventName) => {
        setState((prev) => ({
            ...prev,
            [eventName]: true,
        }))
    }

    const handleClosePopup = (eventName) => {
        setState((prev) => ({
            ...prev,
            [eventName]: false,
        }))
    }

    return (
        <div
            className="default-dropdown-box-container"
            onClick={handleDropDownList}
            onMouseLeave={() => {
                handleClosePopup('showDropDownList')
            }}
        >
            <button
                style={state.dropDownStyle}
                className={`default-dropdown-content-container ${state.className}`}
                disabled={state.disabled}
            >
                {state.icon !== 'empty' ? (
                    <div className="default-dropdown-icon-container">
                        <Icon
                            icon={state.icon}
                            size={16}
                            style={{ fill: state.iconColor }}
                            className="default-dropdown-content-icon"
                        />
                    </div>
                ) : null}
                {state.value !== undefined &&
                state.value !== null &&
                state.value !== '' ? (
                    <input
                        readOnly={true}
                        type="text"
                        value={state.value.label}
                        className="default-dropdown-value-label"
                    />
                ) : (
                    <input
                        readOnly={true}
                        type="text"
                        value={state.placeholder}
                        className="default-dropdown-value-label"
                    />
                )}

                <button className="default-dropdown-button">
                    <Icon
                        icon="down_arrow"
                        size={20}
                        className="show-dropdown-list"
                    />
                </button>
            </button>
            {state.list !== undefined &&
            state.list !== null &&
            state.list !== '' ? (
                state.showDropDownList && !state.disabled ? (
                    state.list.length > 0 ? (
                        state.multiLabel ? (
                            <div className="default-dropdown-multi-label-list">
                                {state.list.map((dropdownList) => (
                                    <Fragment key={dropdownList.value}>
                                        <div className="drop-down-multi-label">
                                            {dropdownList.label}
                                        </div>
                                        {dropdownList.options.length !== 0 ? (
                                            <div className="default-dropdown-title-list">
                                                {dropdownList.options.map(
                                                    (dropdownValue) => (
                                                        <button
                                                            className="default-dropdown-value"
                                                            onClick={handleClickMultiDropDown.bind(
                                                                null,
                                                                dropdownValue
                                                            )}
                                                            disabled={
                                                                dropdownValue.disabled
                                                            }
                                                        >
                                                            {
                                                                dropdownValue.value
                                                            }
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        ) : null}
                                    </Fragment>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="default-dropdown-list"
                                style={state.dropDownListStyle}
                            >
                                {state.listTitle !== '' &&
                                state.listTitle !== undefined ? (
                                    <label className="default-dropdown-list-title">
                                        {state.listTitle}
                                    </label>
                                ) : null}
                                {state.list.map((dropDownValue) => (
                                    <button
                                        key={dropDownValue.value}
                                        className={
                                            state.listTitle === undefined &&
                                            false &&
                                            state.listTitle === ''
                                                ? 'default-dropdown-content'
                                                : 'default-dropdown-content show-title'
                                        }
                                        onClick={handleClickDropDownValue.bind(
                                            null,
                                            dropDownValue
                                        )}
                                        disabled={dropDownValue.disabled}
                                    >
                                        {dropDownValue.label}
                                    </button>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="default-dropdown-list">
                            <button className="empty-dropdown-content">
                                There is no option
                            </button>
                        </div>
                    )
                ) : null
            ) : null}
        </div>
    )
}

DropDown.defaultProps = {
    icon: 'empty',
    iconColor: 'transparent',
    dropDownStyle: {},
    multiLabel: false,
    placeholder: 'Choose Value',
}
DropDown.propTypes = {
    disabled: PropTypes.node,
    listTitle: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    className: PropTypes.object,
    dropDownListStyle: PropTypes.shape(PropTypes.object),
    value: PropTypes.exact({
        label: PropTypes.string,
        value: PropTypes.string,
    }).isRequired,
    list: PropTypes.exact({
        label: PropTypes.string,
        value: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
}

export default DropDown
