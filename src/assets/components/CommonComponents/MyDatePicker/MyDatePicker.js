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
import "./myDatePicker.css";
import MyDropDown from "../BasicComponents/MyDropDown/MyDropDown";
import Icon from "../../../IconLibrary/Icon";
import DatePicker from "react-multi-date-picker"
import {getOperatorSpecificInfo} from "../CommonMethods";
import {hasDataList} from "../CommonMethods";

export default class MyDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultDateOption: [
                {Name: "Equals"},
                {Name: "Does Not Equal"},
                {Name: "Before"},
                {Name: "After"},
                {Name: "Between"},
                {Name: "YTD"},
                {Name: "Last"},
                {Name: "Is Blank"},
                {Name: "Is Not Blank"}
            ],
            dateOption: [
                // {Name: "Today"},
                // {Name: "Yesterday"},
                // {Name: "On"},
                {Name: "Equals"},
                {Name: "Does Not Equal"},
                {Name: "Before"},
                {Name: "After"},
                {Name: "Between"},
                {Name: "YTD"},
                {Name: "Last"},
                {Name: "Is Blank"},
                {Name: "Is Not Blank"}
            ],
            selectedDateOption: "Equals",
            selectedDateValue: "", // new Date()
            fromValue: "",
            toValue: "",
            inputValue: 1,
            periodUnitOptions: [{Name: "Year"}, {Name: "Month"}, {Name: "Day"}],
            activePeriodUnitOption: "Day"
        }
    }

    componentDidMount() {
        this.prepareInitialData(this.props)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.prepareInitialData(nextProps)
    }

    prepareInitialData = (props) => {
        const {option, value, fromValue, toValue, inputValue, dateUnit, dateOptions} = props;
        this.setState({
            dateOption: hasDataList(dateOptions) ? dateOptions : this.state.defaultDateOption,
            selectedDateOption: option,
            selectedDateValue: value ? value : "",
            fromValue: fromValue ? fromValue : "",
            toValue: toValue ? toValue : "",
            inputValue: inputValue ? inputValue : 1,
            activePeriodUnitOption: dateUnit ? dateUnit : "Day",
        })
    }


    handleChangeSelectedDateOption = (selectedDateOption) => {
        if (selectedDateOption !== this.state.selectedDateOption) {
            this.setState({
                selectedDateOption
            })
            if (this.props.onChangeOption !== undefined && this.props.onChangeOption !== null) {
                this.props.onChangeOption(selectedDateOption)
            }
        }
    }

    handleChangeInputValue = (event) => {
        let inputValue = event.target.value;
        this.setState({
            inputValue
        })
        if (this.props.onChangeValue !== undefined && this.props.onChangeOption !== null) {
            this.props.onChangeValue(inputValue)
        }
    }

    handleChangeDateUnit = (activePeriodUnitOption) => {
        if (this.state.activePeriodUnitOption !== activePeriodUnitOption) {
            this.setState({
                activePeriodUnitOption
            })
            if (this.props.onChangeDateUnit !== undefined && this.props.onChangeDateUnit !== null) {
                this.props.onChangeDateUnit(activePeriodUnitOption)
            }
        }
    }

    onChangeValue = (value) => {
        if (value !== undefined && value !== null) {
            let selectedDateValue = value.format("YYYY-MM-DD")
            this.setState({
                selectedDateValue
            })
            if (this.props.onChangeValue !== undefined && this.props.onChangeValue !== null) {
                this.props.onChangeValue(selectedDateValue)
            }
        }
    }

    onChangeFromValue = (value) => {
        if (value !== undefined && value !== null) {
            let fromValue = value.format("YYYY-MM-DD")
            this.setState({
                fromValue
            })
            if (this.props.onChangeFromValue !== undefined && this.props.onChangeFromValue !== null) {
                this.props.onChangeFromValue(fromValue)
            }
        }
    }

    onChangeToValue = (value) => {
        if (value !== undefined && value !== null) {
            let toValue = value.format("YYYY-MM-DD")
            this.setState({
                toValue
            })
            if (this.props.onChangeToValue !== undefined && this.props.onChangeToValue !== null) {
                this.props.onChangeToValue(toValue)
            }
        }
    }

    render() {
        let {width, height, className, hideSelection} = this.props;
        let specificInfo = getOperatorSpecificInfo(this.state.selectedDateOption)
        return (
            <div className={"my-date-picker-container " + className} style={{width: width, height: height}}>
                {
                    hideSelection === true ?
                        null
                        :
                        <div className="my-date-picker-type-division">
                            <MyDropDown values={this.state.dateOption}
                                        width={"100%"}
                                        selectedItem={this.state.selectedDateOption}
                                        className="my-date-picker-type-selector"
                                        onChange={(activeItem) => this.handleChangeSelectedDateOption(activeItem)}/>
                        </div>
                }
                {
                    this.state.selectedDateOption === "Between" ?
                        <div className="my-date-picker-value-division">
                            <div className="my-date-picker-value-range-division">
                                <DatePicker
                                    value={this.state.fromValue}
                                    format="YYYY-MM-DD"
                                    type="custom"
                                    onChange={(value) => this.onChangeFromValue(value)}
                                    render={(stringDate, openCalendar, onChange) => {
                                        return (
                                            <div onClick={openCalendar}
                                                 className="my-date-picker-value-range-container">
                                                <input type={"text"}
                                                       value={stringDate}
                                                       onChange={onChange}
                                                       placeholder={"Start Date"}
                                                       className="my-date-picker"/>
                                                <Icon icon={"calendar"} size={14} title={"Choose Date"}
                                                      className="my-date-picker-icon"/>
                                            </div>
                                        )
                                    }}
                                />
                            </div>
                            -
                            <div className="my-date-picker-value-range-division">
                                <DatePicker
                                    value={this.state.toValue}
                                    format="YYYY-MM-DD"
                                    type="custom"
                                    onChange={(value) => this.onChangeToValue(value)}
                                    render={(stringDate, openCalendar, onChange) => {
                                        return (
                                            <div onClick={openCalendar}
                                                 className="my-date-picker-value-range-container">
                                                <input type={"text"}
                                                       value={stringDate}
                                                       onChange={onChange}
                                                       placeholder={"End Date"}
                                                       className="my-date-picker"/>
                                                <Icon icon={"calendar"} size={14} title={"Choose Date"}
                                                      className="my-date-picker-icon"/>
                                            </div>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                        :
                        this.state.selectedDateOption === "Last" ?
                            <div className="my-date-picker-value-division">
                                <input type={"number"}
                                       value={this.state.inputValue}
                                       name={"inputValue"}
                                       onChange={this.handleChangeInputValue}
                                       placeholder={"Choose Period"}
                                       className="my-date-picker-period-chooser"/>
                                <MyDropDown values={this.state.periodUnitOptions}
                                            selectedItem={this.state.activePeriodUnitOption}
                                            onChange={(activeItem) => this.handleChangeDateUnit(activeItem)}
                                            className="my-date-picker-period-unit-selector"
                                            height={"calc(100% - 10px)"}/>
                            </div>
                            :
                            this.state.selectedDateOption === "YTD" ?
                                <div className="my-date-picker-value-division">
                                    <div className="my-date-picker-value-range-container">
                                        <input type={"number"}
                                               min={1}
                                               max={365}
                                               value={this.state.inputValue}
                                               name={"inputValue"}
                                               onChange={this.handleChangeInputValue}
                                               placeholder={"Type the number of days"}
                                               className="my-date-picker-period-unit-selector"/>
                                    </div>
                                </div>
                                :
                                <div className="my-date-picker-value-division">
                                    <DatePicker
                                        disabled={specificInfo.ValidInputCount === 0}
                                        value={this.state.selectedDateValue}
                                        format="YYYY-MM-DD"
                                        type="custom"
                                        onChange={(value) => this.onChangeValue(value)}
                                        render={(stringDate, openCalendar, onChange) => {
                                            return (
                                                <div onClick={openCalendar}
                                                     className="my-date-picker-value-range-container">
                                                    <input type={"text"} placeholder={"Type or Choose Date"}
                                                           value={stringDate}
                                                           onChange={onChange}
                                                           className="my-date-picker"/>
                                                    <Icon icon={"calendar"}
                                                          size={14} title={"Choose Date"}
                                                          className="my-date-picker-icon"/>
                                                </div>
                                            )
                                        }}
                                    />
                                </div>
                }
            </div>
        )
    }
}

MyDatePicker.defaultProps = {
    width: "150px",
    height: "35px",
    className: "my-date-picker-container"
}