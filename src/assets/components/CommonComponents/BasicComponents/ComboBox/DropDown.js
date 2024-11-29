import React from 'react';
import './comboBox.css';
import PropTypes from 'prop-types';
import Icon from '../../../../icons/Icon';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            list: [],
            icon: this.props.icon,
            iconColor: this.props.iconColor,
            showDropDownList: false,
            disabled: this.props.disabled,
            multiLabel: this.props.multiLabel,
            listTitle: this.props.listTitle,
            dropDownListStyle: this.props.dropDownListStyle,
            placeholder: this.props.placeholder,
            className: this.props.className,
            dropDownStyle: this.props.dropDownStyle
        }
    }

    componentDidMount() {
        if (this.props.list !== undefined && this.props.list !== null && this.props.list !== '') {
            let {
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
                dropDownStyle
            } = this.props;
            this.setState({
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
                dropDownStyle
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== undefined && nextProps.list !== null && nextProps.list !== '') {
            let {
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
                dropDownStyle
            } = nextProps;
            this.setState({
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
                dropDownStyle
            })
        }
    }

    handleDropDownList() {
        this.setState({
            showDropDownList: !this.state.showDropDownList
        })
    }

    handleClickDropDownValue(chosenValue) {
        let {onChange} = this.props;
        onChange(chosenValue);
        this.setState({
            value: chosenValue,
            showDropDownList: false,
        })
    }

    handleClickMultiDropDown(chosenList) {
        let {onChange} = this.props;
        onChange(chosenList);
        this.setState({
            value: chosenList,
            showDropDownList: false,
        })

    }

    handleOpenPopup = (eventName) => {
        this.setState({
            [eventName]: true
        })
    }

    handleClosePopup = (eventName) => {
        this.setState({
            [eventName]: false
        })
    }

    render() {
        let {
            value,
            disabled,
            list,
            iconColor,
            icon,
            listTitle,
            dropDownListStyle,
            placeholder,
            className,
            dropDownStyle
        } = this.state;
        return (
            <div className='default-dropdown-box-container'
                 onClick={this.handleDropDownList.bind(this)}
                 onMouseLeave={() => {
                     this.handleClosePopup("showDropDownList")
                 }}>
                <button style={dropDownStyle}
                        className={`default-dropdown-content-container ${className}`
                        } disabled={disabled}>
                    {
                        icon !== 'empty' ?
                            <div className='default-dropdown-icon-container'>
                                <Icon icon={icon} size={20} style={{fill: iconColor}}
                                      className='default-dropdown-content-icon'/>
                            </div>
                            :
                            null
                    }
                    {
                        value !== undefined && value !== null && value !== "" ?
                            <input type='text' value={value.label} className="default-dropdown-value-label"/>
                            :
                            <input type="text" value={placeholder} className="default-dropdown-value-label"/>
                    }

                    <button className='default-dropdown-button'>
                        <Icon icon='down_arrow' size={20} className='show-dropdown-list'/>
                    </button>
                </button>
                {
                    list !== undefined && list !== null && list !== "" ?
                        this.state.showDropDownList && !this.state.disabled ?
                            list.length > 0 ?
                                this.state.multiLabel ?
                                    <div className="default-dropdown-multi-label-list">
                                        {
                                            list.map((dropdownList) =>
                                                <>
                                                    <div className="drop-down-multi-label">{dropdownList.label}</div>
                                                    {
                                                        dropdownList.options.length !== 0 ?
                                                            <div className="default-dropdown-title-list">
                                                                {
                                                                    dropdownList.options.map((dropdownValue) =>
                                                                        <button className="default-dropdown-value"
                                                                                onClick={this.handleClickMultiDropDown.bind(this, dropdownValue)}
                                                                                disabled={dropdownValue.disabled}>{dropdownValue.value}</button>
                                                                    )
                                                                }
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                    :
                                    <div className='default-dropdown-list' style={dropDownListStyle}>
                                        {
                                            listTitle !== "" && listTitle !== undefined ?
                                                <label className="default-dropdown-list-title">
                                                    {listTitle}
                                                </label>
                                                :
                                                null
                                        }
                                        {
                                            list.map((dropDownValue) =>
                                                <button
                                                    className={listTitle === undefined && false && listTitle === "" ? 'default-dropdown-content' : 'default-dropdown-content show-title'}
                                                    onClick={this.handleClickDropDownValue.bind(this, dropDownValue)}
                                                    disabled={dropDownValue.disabled}>
                                                    {dropDownValue.label}
                                                </button>
                                            )
                                        }
                                    </div>
                                :
                                <div className="default-dropdown-list">
                                    <button className="empty-dropdown-content">There is no option</button>
                                </div>
                            :
                            null
                        :
                        null
                }

            </div>
        )
    }
}

DropDown.defaultProps = {
    icon: 'empty',
    iconColor: 'transparent',
    dropDownStyle: {},
    multiLabel: false,
    placeholder: 'Choose Value'
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
        value: PropTypes.string
    }).isRequired,
    list: PropTypes.exact({
        label: PropTypes.string,
        value: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,

}

export default DropDown;