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
import "./StyleSheet.css";
import Icon from "../../../IconLibrary/Icon";
import MyDatePicker from "../BasicComponents/MyDatePicker/MyDatePicker";
import PianoLoading from "../Loading/PianoLoading";
import {
    getDisplayDateInfoFromDatePicker
} from "../CommonMethods";

export default class MyMultiDateRangePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateInfoList: [],
            calendarMode: "Range",
            calendarLoading: false,
            values: [],
            rangeValues: []
        }
    }

    componentDidMount() {
        this.prepareInitialData(this.props)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {getData} = nextProps;
        if (getData === true) {
            this.props.updateFilterInfo({
                dateInfoList: this.state.dateInfoList,
                rangeValues: this.state.rangeValues,
            })
        } else {
            this.prepareInitialData(nextProps)
        }
    }

    prepareInitialData = (propsData) => {
        console.log("prepare initial data: ", propsData)
        const {dateInfoList, values, rangeValues} = propsData;
        this.setState({
            dateInfoList,
            values,
            rangeValues
        })
    }

    handleChangeActiveOption = (calendarMode) => {
        console.log("#handleChangeActiveOption: ", calendarMode)
        this.setState({
            calendarLoading: true,
        })
        this.setState({
            calendarMode,
            calendarLoading: false
        })
    }

    handleClearAll = () => {
        this.setState({
            calendarLoading: true
        })
        let rangeValues = this.state.rangeValues
        rangeValues.splice(0, this.state.rangeValues.length)

        console.log("handle clear all: ", rangeValues)
        this.setState({
            calendarLoading: false,
            dateInfoList: [],
            rangeValues,
            values: [],
        })
    }

    handleClickForRemoveDate = (index) => {
        let dateInfoList = this.state.dateInfoList;
        dateInfoList.splice(index, 1)
        let rangeValues = this.state.rangeValues;
        rangeValues.splice(index, 1)
        this.setState({
            dateInfoList,
            rangeValues
        })
    }

    handleUpdateDateValues = (inputValues) => {
        let dateInfoList = []
        let values = this.state.rangeValues
        let rangeValues = this.state.rangeValues
        if (this.state.calendarMode === "Exact") {
            values = inputValues
        } else {
            rangeValues = inputValues
        }
        inputValues.map(eachRangeValueArr => {
            if (eachRangeValueArr.length === 2) {

            } else if (eachRangeValueArr.length === 1) {
                dateInfoList.push({
                    Type: ""
                })
            }
        })

        this.setState({
            values,
            rangeValues,
            dateInfoList
        })
    }

    handleUpdateDateRangeValues = (rangeValues) => {
        let dateInfoList = []
        rangeValues.map(eachRangeValueArr => {
            if (eachRangeValueArr.length === 2) {
                // get formatted date (yyyy-mm-dd)
                // from the list
                let fromDateInfo = getDisplayDateInfoFromDatePicker(eachRangeValueArr[0])
                let toDateInfo = getDisplayDateInfoFromDatePicker(eachRangeValueArr[1])
                if (fromDateInfo.dateValue === toDateInfo.dateValue) {
                    dateInfoList.push({
                        Type: "single",
                        Value: fromDateInfo.dateValue,
                        DisplayValue: fromDateInfo.displayValue
                    })
                } else {
                    dateInfoList.push({
                        Type: "range",
                        Value: [fromDateInfo.dateValue, toDateInfo.dateValue],
                        DisplayValue: "From " + fromDateInfo.displayValue + " ~ To " + toDateInfo.displayValue
                    })
                }
            } else if (eachRangeValueArr.length === 1) {
                let fromDateInfo = getDisplayDateInfoFromDatePicker(eachRangeValueArr[0])
                dateInfoList.push({
                    Type: "single",
                    Value: fromDateInfo.dateValue,
                    DisplayValue: fromDateInfo.displayValue
                })
            }
        })

        console.log("dateInfoList: ", dateInfoList)

        this.setState({
            rangeValues,
            dateInfoList
        }, () => {
            if (this.props.updateFilterInfo !== undefined && this.props.updateFilterInfo !== null) {
                let dataInfo = {
                    dateInfoList: dateInfoList,
                    rangeValues: rangeValues,
                }
                console.log("updateFilterInfo: ", dataInfo)
                this.props.updateFilterInfo(dataInfo)
            }
        })
    }

    render() {
        console.log("range values in render: ", this.state.rangeValues)
        return (
            <div className="multi-date-range-picker">
                <div className="multi-date-range-picker-division">
                    <div className="multi-date-range-picker-division-header">
                        {"Select Date"}
                        {/*<div className="multi-date-range-picker-mode">*/}
                        {/*    {"Calender Mode"}*/}
                        {/*    <div className="multi-date-range-picker-mode">*/}
                        {/*        <ToggleButton*/}
                        {/*            onClickOptionHandler={(calendarMode) => this.handleChangeActiveOption(calendarMode)}*/}
                        {/*            activeOption={this.state.calendarMode}*/}
                        {/*            options={[{name: "Exact"}, {name: "Range"}]}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <div className="multi-date-range-picker-division-body">
                        <div className="multi-date-range-picker-calendar-container">
                            {/*You can add calendar here*/}
                            {
                                this.state.calendarLoading === true ?
                                    <PianoLoading width={150} circleSize={10}/>
                                    :
                                    <MyDatePicker type={this.state.calendarMode}
                                                  inputValues={this.state.values}
                                                  inputRangeValues={this.state.rangeValues}
                                                  onUpdateValues={(inputValues) => this.handleUpdateDateValues(inputValues)}
                                                  onUpdateRangeValues={(inputValues) => this.handleUpdateDateRangeValues(inputValues)}
                                    />
                            }
                        </div>
                    </div>
                </div>

                <div className="multi-date-range-picker-division">
                    <div className="multi-date-range-picker-division-header">
                        {"Selected Dates"}
                        <button className="multi-date-range-picker-clear-btn"
                                onClick={() => this.handleClearAll()}
                                disabled={this.state.dateInfoList.length === 0}>
                            {"Clear All"}
                        </button>
                    </div>
                    <div className="multi-date-range-picker-division-body">
                        {
                            this.state.dateInfoList.length === 0 ?
                                <div className="multi-date-range-picker-empty-section">
                                    {/*For empty and Loading, Use Following Section*/}
                                    {"You haven't select any date yet."}<br/>{"Click on the calendar to select date."}
                                </div>
                                :
                                <div className="multi-date-range-picker-selection-division">
                                    {
                                        this.state.dateInfoList.map((eachDateInfo, index) =>
                                            <div className="multi-date-range-picker-item">
                                                {eachDateInfo.DisplayValue}
                                                <button
                                                    onClick={() => this.handleClickForRemoveDate(index, eachDateInfo)}
                                                    className="multi-date-range-picker-delete-btn">
                                                    <Icon icon="cross" size={8} title={"Click to remove"}/>
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}