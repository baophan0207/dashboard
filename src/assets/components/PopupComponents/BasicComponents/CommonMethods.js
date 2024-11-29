import React, { Component } from 'react'
import DuoIconV2 from '../../../IconLibrary/DuoIcon'
import Icon from '../../../IconLibrary/Icon'
import Popup from 'reactjs-popup'
import './FeatureStore.css'

const uuidv4 = require('uuid').v4

let userInfo = {}
let isAdminUser = false
let isSuperAdmin = false
let checkboxWidth = 50
let patentIDWidth = 200
let titleWidth = 150
let descriptionWidth = 200
let multiLabelSeparator = ';'
let clientBasedFeatures = []

export const IN_PROGRESS = 'in progress'
export const SUCCESS = 'success'
export const MIX_STATUS = 'success_fail'
export const FAIL = 'fail'
export const TRAINING_KEYWORD = 'training'

export const getInstanceID = () => {
    return '00000000-0000-0000-0000-000000000000'
}

export const CreateUUID = () => {
    return uuidv4()
}

export const isValidData = (input) => {
    return input !== undefined && input !== null && input !== ''
}

export const checkEmpty = (inputArr) => {
    let empty = true
    if (inputArr !== undefined && inputArr !== null && inputArr.length > 0) {
        empty = false
    }
    return empty
}

export const hasDataList = (inputArr) => {
    let hasData = false
    if (inputArr !== undefined && inputArr !== null && inputArr.length > 0) {
        hasData = true
    }
    return hasData
}

export const getSortingDataByNameAndOrder = (currentData, name, order) => {
    currentData.sort(function (a, b) {
        let nameA = a[name].toLowerCase() // ignore upper and lowercase
        let nameB = b[name].toLowerCase() // ignore upper and lowercase
        if (order === 'desc') {
            if (nameA > nameB) {
                return -1
            }
            if (nameA < nameB) {
                return 1
            }
        } else {
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
        }

        return 0
    })
    return currentData
}

export const binarySearch = (data, target, startIndex, endIndex) => {
    const middle = Math.floor((startIndex + endIndex) / 2)
    if (target === data[middle]) return data[middle]
    if (endIndex - 1 === startIndex) {
        return Math.abs(data[startIndex] - target) >
            Math.abs(data[endIndex] - target)
            ? data[endIndex]
            : data[startIndex]
    } else if (target > data[middle]) {
        return binarySearch(data, target, middle, endIndex)
    } else if (target < data[middle]) {
        return binarySearch(data, target, startIndex, middle)
    }
}

export const getCurrentTimeStamp = () => {
    return Math.floor(new Date().getTime()) //by milliseconds, (if want for second, divide by 1000)
}

export const convertArrayToHashMap = (inputArr, columnKey) => {
    let hashMap = {}
    if (isValidData(columnKey)) {
        inputArr.map((eachInput) => {
            if (isValidData(eachInput[columnKey])) {
                hashMap[eachInput[columnKey]] = eachInput
            } else {
                console.log('key is not included in the pass data')
            }
        })
    } else {
        //for true/false case
        inputArr.map((eachInput) => {
            hashMap[eachInput] = true
        })
    }

    return hashMap
}

export const getCurrentUTCDateTime = () => {
    let currentDate = new Date()
    let utcTimeParse = new Date(currentDate.toUTCString())
    let year = utcTimeParse.getFullYear()
    let month = utcTimeParse.getMonth() + 1
    if (month.toString().length === 1) {
        month = '0' + month.toString()
    }
    let date = utcTimeParse.getDate()
    if (date.toString().length === 1) {
        date = '0' + date.toString()
    }

    let utcDate = year + '-' + month + '-' + date
    let hour = utcTimeParse.getUTCHours()
    if (hour < 10) {
        hour = '0' + hour
    }
    let minute = utcTimeParse.getUTCMinutes()
    if (minute < 10) {
        minute = '0' + minute
    }
    let second = utcTimeParse.getUTCSeconds()
    if (second < 10) {
        second = '0' + second
    }

    let utcTime = hour + ':' + minute + ':' + second

    // for direct hours //TODO to remove after tested
    // let utcDate2 = year + "-" + month + "-" + date
    // let hour2 = utcTimeParse.getHours()
    // if (hour2 < 10) {
    //     hour2 = "0" + hour2
    // }
    // let minute2 = utcTimeParse.getMinutes()
    // if (minute2 < 10) {
    //     minute2 = "0" + minute2
    // }
    // let second2 = utcTimeParse.getSeconds()
    // if (second2 < 10) {
    //     second2 = "0" + second2
    // }
    // let utcTime2 = hour2 + ":" + minute2 + ":" + second2
    // let dateValue2 = utcDate2 + "T" + utcTime2 + "Z"
    // let dateValue1 = utcDate + "T" + utcTime + "Z"
    //
    // console.log("#Converted UTC time1: ", dateValue1, "=> ", convertUtcToCurrentDateAndTime(dateValue1))
    // console.log("#Converted UTC time2: ", dateValue2, "=> ", convertUtcToCurrentDateAndTime(dateValue2))

    return utcDate + 'T' + utcTime + 'Z'
}

export const convertSimpleDateTotUTCDateTime = (inputDate) => {
    let currentDate = new Date(inputDate)
    let utcTimeParse = new Date(currentDate.toUTCString())
    let year = utcTimeParse.getFullYear()
    let month = utcTimeParse.getMonth() + 1
    if (month.toString().length === 1) {
        month = '0' + month.toString()
    }
    let date = utcTimeParse.getDate()
    if (date.toString().length === 1) {
        date = '0' + date.toString()
    }

    let utcDate = year + '-' + month + '-' + date
    let hour = utcTimeParse.getUTCHours()
    if (hour < 10) {
        hour = '0' + hour
    }
    let minute = utcTimeParse.getUTCMinutes()
    if (minute < 10) {
        minute = '0' + minute
    }
    let second = utcTimeParse.getUTCSeconds()
    if (second < 10) {
        second = '0' + second
    }

    let utcTime = hour + ':' + minute + ':' + second
    return utcDate + 'T' + utcTime + 'Z'
}

export const CommonLoadingPopup = (input) => {
    let open = input.open
    let content = input.content
    return (
        <Popup
            contentStyle={{
                background: 'transparent',
                width: 'auto',
                height: 'auto',
                textAlign: 'center',
                border: 'none',
            }}
            open={open}
            closeOnDocumentClick={false}
            position="top right"
            lockScroll={true}
        >
            <button className="loadingContainer">
                {content} &emsp;
                <span className="loading-icon" />
            </button>
        </Popup>
    )
}

export class MultiColumnsSearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchColumnName: '',
            searchValue: '',
            itemHashMap: {},
            itemList: [
                {
                    DisplayName: 'item name',
                    Value: 'item',
                    DuoIconName: 'feature_store',
                },
                {
                    DisplayName: 'variable/operator name',
                    Value: 'variable',
                    DuoIconName: 'column',
                },
            ],
            disableSearchBtn: true,
        }
        this.searchBtnRef = React.createRef()
        this.searchValueRef = React.createRef()
    }

    componentDidMount() {
        const { searchColumnName, searchValue, disableSearchBtn, itemList } =
            this.props
        this.prepareInitialData(
            searchColumnName,
            searchValue,
            disableSearchBtn,
            itemList
        )
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { searchColumnName, searchValue, disableSearchBtn, itemList } =
            nextProps
        this.prepareInitialData(
            searchColumnName,
            searchValue,
            disableSearchBtn,
            itemList
        )
    }

    prepareInitialData = (
        searchColumnName,
        searchValue,
        disableSearchBtn,
        itemList
    ) => {
        let itemHashMap = {}
        itemList.map((eachItem) => {
            itemHashMap[eachItem.Value] = eachItem
        })
        this.setState({
            searchColumnName,
            searchValue,
            itemList,
            itemHashMap,
            disableSearchBtn,
        })
    }

    handleChangeSearchColumnName = (itemName) => {
        if (
            this.props.handleChangeSearchColumnName !== undefined &&
            this.props.handleChangeSearchColumnName !== null
        ) {
            this.props.handleChangeSearchColumnName(itemName)
        }
    }

    handleChangeSearchValue = (event) => {
        if (
            this.props.handleChangeSearchValue !== undefined &&
            this.props.handleChangeSearchValue !== null
        ) {
            this.props.handleChangeSearchValue(event)
        }
    }

    getActiveInfo = (searchColumnName) => {
        let activeColumnInfo = ''
        let { itemList } = this.state
        if (isValidData(this.state.itemHashMap[searchColumnName])) {
            activeColumnInfo = this.state.itemHashMap[searchColumnName]
        } else {
            for (let index = 0; index < itemList.length; index++) {
                if (itemList[index].Value === searchColumnName) {
                    activeColumnInfo = itemList[index]
                }
            }
        }
        return activeColumnInfo
    }

    keyPress = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
            this.searchBtnRef.current.focus()
            if (
                this.props.onKeyDown !== undefined &&
                this.props.onKeyDown !== null
            ) {
                this.props.onKeyDown()
            } else if (
                this.props.handleSearchOnClick !== undefined &&
                this.props.handleSearchOnClick !== null
            ) {
                this.props.handleSearchOnClick()
            }
        } else if (e.keyCode === 38) {
            e.preventDefault()
            this.searchValueRef.current.focus()
        }
    }

    render() {
        const { searchColumnName, searchValue, disableSearchBtn, itemList } =
            this.state
        const { onKeyDown, handleSearchOnClick, width } = this.props
        let activeInfo = this.getActiveInfo(searchColumnName)
        return (
            <div
                className="feature-store-feature-search-box"
                style={{ width: width }}
            >
                <div className="feature-search-box">
                    <div
                        className="feature-search-box-left"
                        style={{ width: '100%' }}
                    >
                        <div className="feature-search-icon">
                            {activeInfo.DuoIconName ? (
                                <DuoIconV2
                                    name={activeInfo.DuoIconName}
                                    size={16}
                                />
                            ) : activeInfo.IconName ? (
                                <Icon icon={activeInfo.IconName} size={14} />
                            ) : null}
                        </div>
                        {(onKeyDown !== undefined && onKeyDown !== null) ||
                        (handleSearchOnClick !== undefined &&
                            handleSearchOnClick !== null) ? (
                            <input
                                type={'text'}
                                ref={this.searchValueRef}
                                onKeyDown={(event) => this.keyPress(event)}
                                placeholder={activeInfo.DisplayName}
                                value={searchValue}
                                onChange={(event) =>
                                    this.handleChangeSearchValue(event)
                                }
                                style={{ paddingRight: '20px' }}
                                className="feature-search-input-box"
                            />
                        ) : (
                            <input
                                type={'text'}
                                ref={this.searchValueRef}
                                placeholder={activeInfo.DisplayName}
                                value={searchValue}
                                onChange={(event) =>
                                    this.handleChangeSearchValue(event)
                                }
                                style={{ paddingRight: '20px' }}
                                className="feature-search-input-box"
                            />
                        )}

                        <Icon
                            icon={'search'}
                            size="14"
                            className="filter-popup-search-icon"
                        />
                        <button className="feature-search-dropdown">
                            <Icon icon="drop_down" size="small" />

                            <div className="feature-search-box-drop-down-list">
                                {itemList.map((eachItemInfo, index) => (
                                    <div
                                        key={index}
                                        className="feature-search-box-drop-down-item"
                                        onClick={() =>
                                            this.handleChangeSearchColumnName(
                                                eachItemInfo.Value
                                            )
                                        }
                                    >
                                        {eachItemInfo.DuoIconName ? (
                                            <DuoIconV2
                                                name={eachItemInfo.DuoIconName}
                                                size={14}
                                                className="feature-search-box-drop-down-icon"
                                            />
                                        ) : eachItemInfo.IconName ? (
                                            <Icon
                                                icon={eachItemInfo.IconName}
                                                size={14}
                                                className="feature-search-box-drop-down-icon"
                                            />
                                        ) : null}

                                        {'Search by ' +
                                            eachItemInfo.DisplayName}
                                        {searchColumnName ===
                                            eachItemInfo.Value && (
                                            <div className="feature-search-box-drop-down-check">
                                                <Icon
                                                    icon="check_circle_outline"
                                                    size={14}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </button>
                    </div>
                    <button
                        onClick={this.props.handleSearchOnClick}
                        ref={this.searchBtnRef}
                        disabled={disableSearchBtn}
                        className="feature-search-box-btn"
                    >
                        Search
                    </button>
                </div>
            </div>
        )
    }
}

MultiColumnsSearchBox.defaultProps = {
    width: 'unset',
}

export const prepareInitialPredictionParameters = (inputTrainingParameters) => {
    let parameterInfoList = []
    let languageSelectedNeeded = false
    let newTrainingParameters = JSON.parse(
        JSON.stringify(inputTrainingParameters)
    )
    if (newTrainingParameters.length !== 0) {
        newTrainingParameters.map((eachTrainingParameter) => {
            let disabledChanges = false
            if (eachTrainingParameter.Name === 'source_language') {
                languageSelectedNeeded = true
                disabledChanges = true
            } else if (eachTrainingParameter.Name === 'target_language') {
                languageSelectedNeeded = true
            }
            let rangeCheck = false
            let possibleValues = []
            let multiInputCase = false
            let inputPossibleValues = []
            let inputValue = ''
            let minValue = ''
            let maxValue = ''
            let selectedValue = eachTrainingParameter.DefaultValue
            if (eachTrainingParameter.Name === 'Labels') {
                // may need to check with domain name
                multiInputCase = true
            } else {
                if (
                    isValidData(eachTrainingParameter.MinValue) &&
                    isValidData(eachTrainingParameter.MaxValue)
                ) {
                    rangeCheck = true
                    if (eachTrainingParameter.Type === 'int') {
                        minValue = parseInt(eachTrainingParameter.MinValue)
                        if (eachTrainingParameter.MaxValue !== 'inf') {
                            maxValue = parseInt(eachTrainingParameter.MaxValue)
                        } else {
                            maxValue = eachTrainingParameter.MaxValue
                        }
                    } else if (eachTrainingParameter.Type === 'float') {
                        minValue = parseFloat(eachTrainingParameter.MinValue)
                        if (eachTrainingParameter.MaxValue !== 'inf') {
                            maxValue = parseFloat(
                                eachTrainingParameter.MaxValue
                            )
                        } else {
                            maxValue = eachTrainingParameter.MaxValue
                        }
                    }
                }
            }

            if (isValidData(eachTrainingParameter.PossibleValue)) {
                possibleValues = eachTrainingParameter.PossibleValue.split(',')
                selectedValue = possibleValues[0]
                if (multiInputCase) {
                    inputPossibleValues = possibleValues
                    inputValue = ''
                }
            }

            //to add selected value
            parameterInfoList = parameterInfoList.concat({
                Name: eachTrainingParameter.Name,
                Description: eachTrainingParameter.Description,
                DefaultValue: eachTrainingParameter.DefaultValue,
                PossibleValue: possibleValues,
                Type: eachTrainingParameter.Type,
                MinValue: minValue,
                MaxValue: maxValue,
                SelectedValue: selectedValue, // for single selected case
                InputPossibleValues: inputPossibleValues, //for multiple input case
                InputValue: inputValue,
                checkValid: true,
                rangeCheck: rangeCheck,
                multiInputCase: multiInputCase,
                disabledChanges: disabledChanges,
            })

            return parameterInfoList
        })
    }

    // console.log("Prepared parameter info list : ", parameterInfoList)
    return {
        parameterInfoList,
        languageSelectedNeeded,
    }
}

export const getMlDataTypeSafety = (dataType) => {
    //check if it is scaled or not
    dataType = dataType.toLowerCase()
    let mlDataType = dataType
    switch (dataType) {
        case 'string':
            mlDataType = 'str'
            break
        case 'nlp':
            mlDataType = 'int'
            break
        case 'image':
            mlDataType = 'int'
            break
        case 'audio':
            mlDataType = 'int'
            break
        case 'video':
            mlDataType = 'int'
            break
        case 'tinyint':
            mlDataType = 'int'
            break
        case 'real':
            mlDataType = 'float'
            break
        case 'enum':
            mlDataType = 'int'
            break
        case 'integer':
            mlDataType = 'int'
            break
        case 'number':
            mlDataType = 'int'
            break
        case 'int32':
            mlDataType = 'int'
            break
        case 'int64':
            mlDataType = 'int'
            break
        case 'float32':
            mlDataType = 'float'
            break
        case 'float64':
            mlDataType = 'float'
            break
        case 'double':
            mlDataType = 'float'
            break
        case 'varchar':
            mlDataType = 'string'
            break
        case 'complex':
            mlDataType = 'float'
            break
        case 'varchar2':
            mlDataType = 'string'
            break
        case 'text':
            mlDataType = 'string'
            break
        case 'char varying':
            mlDataType = 'string'
            break
    }

    return mlDataType
}

export const checkAllItemsUnSelected = (items) => {
    let allUnSelected = true
    for (let index = 0; index < items.length; index++) {
        if (items[index].isSelected === true) {
            allUnSelected = false
            break
        }
    }
    return allUnSelected
}

export const checkAllItemsSelected = (items) => {
    let allSelected = true
    for (let index = 0; index < items.length; index++) {
        if (items[index].isSelected === false) {
            allSelected = false
            break
        }
    }
    return allSelected
}

export const checkAndUpdateSelectAllItems = (
    selectAllItems,
    itemInfoList,
    itemSelected
) => {
    if (selectAllItems === true) {
        if (itemSelected === false) {
            // check all cards are false or not if the current info is unselected
            let allUnSelected = checkAllItemsUnSelected(itemInfoList)
            if (allUnSelected === true) {
                selectAllItems = false
            }
        } // else => it is clear that all items are not unselected, because current card is selected
    } else {
        if (itemSelected === true) {
            let allSelected = checkAllItemsSelected(itemInfoList)
            if (allSelected === true) {
                selectAllItems = true
            }
        } // else => all items cannot be selected case, because current item is un selected
    }

    return selectAllItems
}

export const getDataTypeTag = (dataType) => {
    if (isValidData(dataType)) {
        return (
            <div className={'default-data-type-tag ' + dataType}>
                {dataType.charAt(0).toUpperCase() + dataType.slice(1)}
            </div>
        )
    } else {
        return (
            <div
                className="default-data-type-tag"
                style={{ background: 'transparent' }}
            >
                {'-'}
            </div>
        )
    }
}

const checkAndAppendUniqueIDs = (allIDs, inputID) => {
    if (isValidData(inputID)) {
        if (!allIDs.includes(inputID)) {
            allIDs.push(inputID)
        }
    }
    return allIDs
}

const checkAndAppendUniqueIDsForMultiLabels = (allIDs, inputIDs) => {
    if (hasDataList(inputIDs)) {
        inputIDs.map((eachID) => {
            if (!allIDs.includes(eachID)) {
                allIDs.push(eachID)
            }
        })
    }
    return allIDs
}

export const convertPredictionResults = (
    predictionResults,
    multiLabelModel,
    multiOutputModel,
    outputColumnList,
    multiClass,
    patentIDs,
    classificationIDs,
    historyTab,
    pageNumber,
    pageSize,
    patentInsight,
    showRelevanceValue
) => {
    if (multiOutputModel === true) {
        let checkedData = convertPredictionResultsForMultiOutputColumns(
            predictionResults,
            multiLabelModel,
            outputColumnList,
            multiClass,
            patentIDs,
            classificationIDs,
            historyTab,
            pageNumber,
            pageSize,
            patentInsight,
            showRelevanceValue
        )
        return {
            tableRowCount: checkedData.tableRowCount,
            patentIDs: checkedData.patentIDs,
            predictionIDs: checkedData.predictionIDs,
            specificPatentIDs: checkedData.specificPatentIDs,
            classificationIDs: checkedData.classificationIDs,
            predictionResults: checkedData.predictionResults,
            patentIDsHashmapByPredictionID:
                checkedData.patentIDsHashmapByPredictionID,
        }
    }
    let specificPatentIDs = []
    let patentIDsHashmapByPredictionID = {}
    let predictionIDs = []
    let rowCountForMultiLabelModel = 0
    if (hasDataList(predictionResults)) {
        predictionResults.map((eachPatent, patentIndex) => {
            eachPatent['no'] = getSerialRowNumber(
                pageNumber,
                pageSize,
                patentIndex
            )
            if (patentInsight === true) {
                // prepare for nested hashmap
                let patentID = eachPatent.PatentID
                let predictionID = eachPatent.PredictionID
                if (
                    patentIDsHashmapByPredictionID[predictionID] !== undefined
                ) {
                    let includedPatentIDs =
                        patentIDsHashmapByPredictionID[predictionID]
                    if (!includedPatentIDs.includes(patentID)) {
                        includedPatentIDs.push(patentID)
                        patentIDsHashmapByPredictionID[predictionID] =
                            includedPatentIDs
                    }
                } else {
                    patentIDsHashmapByPredictionID[predictionID] = [patentID]
                }
                if (!predictionIDs.includes(predictionID)) {
                    predictionIDs.push(predictionID)
                }
            }

            if (!patentIDs.includes(eachPatent.PatentID)) {
                patentIDs.push(eachPatent.PatentID)
            }
            if (!specificPatentIDs.includes(eachPatent.PatentID)) {
                specificPatentIDs.push(eachPatent.PatentID)
            }

            if (isValidData(eachPatent.Output)) {
                eachPatent.Output = eachPatent.Output.toString()
                let eachPatentOutput
                if (historyTab === true) {
                    eachPatentOutput = eachPatent.Output.slice(
                        0,
                        eachPatent.Output.length
                    )
                } else {
                    // check if output is included double quote or not
                    if (eachPatent.Output.includes('"')) {
                        eachPatentOutput = eachPatent.Output.slice(
                            1,
                            eachPatent.Output.length - 1
                        )
                    } else {
                        eachPatentOutput = eachPatent.Output.slice(
                            0,
                            eachPatent.Output.length
                        )
                    }
                }

                if (eachPatentOutput.includes(',')) {
                    let splitArr = eachPatentOutput.split(',')
                    let outputArr = []
                    splitArr.map((eachClass) => {
                        eachClass = eachClass.replaceAll('"', '')
                        if (historyTab !== true) {
                            if (isValidData(eachClass)) {
                                if (eachClass && eachClass.includes('"')) {
                                    eachClass = eachClass.replaceAll('"', '')
                                }
                                let jsonStr = '{"Output":"' + eachClass + '"}'
                                let jsonParsed = JSON.parse(jsonStr)
                                eachClass = jsonParsed.Output
                            }
                        }
                        if (eachClass.startsWith('[')) {
                            let innerSplitArr = eachClass.split('[')
                            eachClass = innerSplitArr[innerSplitArr.length - 1]
                        } else if (eachClass.endsWith(']')) {
                            let innerSplitArr = eachClass.split(']')
                            eachClass = innerSplitArr[0]
                        }
                        outputArr.push(eachClass)
                        classificationIDs = checkAndAppendUniqueIDs(
                            classificationIDs,
                            eachClass
                        )
                    })
                    eachPatent.Output = outputArr
                } else {
                    if (historyTab !== true) {
                        if (isValidData(eachPatentOutput)) {
                            if (
                                eachPatentOutput &&
                                eachPatentOutput.includes('"')
                            ) {
                                eachPatentOutput = eachPatentOutput.replaceAll(
                                    '"',
                                    ''
                                )
                            }
                            let jsonStr =
                                '{"Output":"' + eachPatentOutput + '"}'
                            let jsonParsed = JSON.parse(jsonStr)
                            eachPatentOutput = jsonParsed.Output
                        }
                    }

                    if (multiLabelModel === true) {
                        let newClassIDs =
                            eachPatentOutput.split(multiLabelSeparator)
                        eachPatent.Output = newClassIDs
                        classificationIDs =
                            checkAndAppendUniqueIDsForMultiLabels(
                                classificationIDs,
                                newClassIDs
                            )
                        let eachRowCount = 1
                        if (newClassIDs.length > 0) {
                            eachRowCount = newClassIDs.length
                        }
                        rowCountForMultiLabelModel += eachRowCount
                    } else {
                        if (multiClass === true) {
                            eachPatent.Output = [eachPatentOutput]
                        } else {
                            eachPatent.Output = eachPatentOutput
                        }
                        classificationIDs = checkAndAppendUniqueIDs(
                            classificationIDs,
                            eachPatentOutput
                        )
                    }
                }
            } else {
                if (multiClass === true) {
                    eachPatent.Output = []
                } else {
                    if (multiLabelModel === true) {
                        eachPatent.Output = []
                        rowCountForMultiLabelModel += 1
                    } else {
                        eachPatent.Output = ''
                    }
                }
            }

            // check for score value
            if (showRelevanceValue === true) {
                if (isValidData(eachPatent['Score'])) {
                    eachPatent.Score = eachPatent.Score.toString()
                    // console.log("#eachPatent.Score: ", historyTab, ", ", eachPatent.Score)
                    let eachPatentScoreValue
                    if (historyTab === true) {
                        eachPatentScoreValue = eachPatent.Score.slice(
                            0,
                            eachPatent.Score.length
                        )
                    } else {
                        // check if output is included double quote or not
                        if (eachPatent.Score.includes('"')) {
                            eachPatentScoreValue = eachPatent.Score.slice(
                                1,
                                eachPatent.Score.length - 1
                            )
                        } else {
                            eachPatentScoreValue = eachPatent.Score.slice(
                                0,
                                eachPatent.Score.length
                            )
                        }
                    }

                    // checking for multiple class case
                    if (eachPatentScoreValue.includes(',')) {
                        let splitArr = eachPatentScoreValue.split(',')
                        // console.log("#patent split arr: ", splitArr)
                        let scoreValueArr = []
                        let originalValueArr = []
                        splitArr.map((eachScoreValue) => {
                            eachScoreValue = eachScoreValue.replaceAll('"', '')
                            eachScoreValue = eachScoreValue.replaceAll('[', '')
                            if (historyTab !== true) {
                                if (isValidData(eachScoreValue)) {
                                    let jsonStr =
                                        '{"Score":"' + eachScoreValue + '"}'
                                    let jsonParsed = JSON.parse(jsonStr)
                                    eachScoreValue = jsonParsed.Score
                                }
                            }
                            originalValueArr.push(parseFloat(eachScoreValue))
                            let eachFixedScore = getFixedNumber(
                                eachScoreValue,
                                4,
                                4
                            )
                            scoreValueArr.push(eachFixedScore)
                        })
                        eachPatent.Confidence = ''
                        eachPatent.OriginalRelevanceValue = 0
                        eachPatent.RelevanceValueArr = scoreValueArr // multiple case
                        eachPatent.OriginalRelevanceValueArr = originalValueArr // for number value
                    } else {
                        if (historyTab !== true) {
                            if (isValidData(eachPatentScoreValue)) {
                                let jsonStr =
                                    '{"Score":"' + eachPatentScoreValue + '"}'
                                let jsonParsed = JSON.parse(jsonStr)
                                eachPatentScoreValue = jsonParsed.Score
                            }
                        }
                        if (multiLabelModel === true) {
                            let scoreValueArr =
                                eachPatentScoreValue.split(multiLabelSeparator)
                            let relevanceArr = []
                            scoreValueArr.map((eachScoreValue) => {
                                relevanceArr.push(
                                    getFixedNumber(eachScoreValue, 4, 4)
                                )
                            })
                            eachPatent.Confidence = ''
                            eachPatent.RelevanceValueArr = relevanceArr
                            eachPatent.OriginalRelevanceValue = scoreValueArr
                        } else {
                            eachPatentScoreValue = getFixedNumber(
                                eachPatentScoreValue,
                                4,
                                4
                            )
                            if (multiClass === true) {
                                eachPatent.Confidence = ''
                                eachPatent.RelevanceValueArr = [
                                    eachPatentScoreValue,
                                ]
                                eachPatent.OriginalRelevanceValue = [
                                    parseFloat(eachPatentScoreValue),
                                ]
                            } else {
                                eachPatent.Confidence = eachPatentScoreValue
                                eachPatent.OriginalRelevanceValue =
                                    parseFloat(eachPatentScoreValue)
                            }
                        }
                    }
                } else {
                    if (multiLabelModel === true) {
                        eachPatent.Confidence = ''
                        eachPatent.RelevanceValueArr = []
                        eachPatent.OriginalRelevanceValue = []
                    } else {
                        if (multiClass === true) {
                            eachPatent.RelevanceValueArr = []
                            eachPatent.OriginalRelevanceValueArr = []
                        } else {
                            eachPatent.Confidence = ''
                            eachPatent.OriginalRelevanceValue = 0
                        }
                    }
                }
            }
        })
    }

    // console.log("#patentIDsHashmapByPredictionID: ", patentIDsHashmapByPredictionID)
    // console.log("#predictionIDs: ", predictionIDs)
    // console.log("#converted predictionResults: ", predictionResults)
    let tableRowCount =
        multiLabelModel === true
            ? rowCountForMultiLabelModel
            : predictionResults.length
    return {
        tableRowCount,
        patentIDs,
        predictionIDs,
        specificPatentIDs,
        classificationIDs,
        predictionResults,
        patentIDsHashmapByPredictionID,
    }
}

export const convertPredictionResultsForMultiOutputColumns = (
    predictionResults,
    multiLabelModel,
    outputColumnList,
    multiClass,
    patentIDs,
    classificationIDs,
    historyTab,
    pageNumber,
    pageSize,
    patentInsight,
    showRelevanceValue
) => {
    let specificPatentIDs = []
    let patentIDsHashmapByPredictionID = {}
    let predictionIDs = []
    let rowCountForMultiLabelModel = 0
    if (hasDataList(predictionResults)) {
        predictionResults.map((eachPatent, patentIndex) => {
            eachPatent['no'] = getSerialRowNumber(
                pageNumber,
                pageSize,
                patentIndex
            )
            if (patentInsight === true) {
                // prepare for nested hashmap
                let patentID = eachPatent.PatentID
                let predictionID = eachPatent.PredictionID
                if (
                    patentIDsHashmapByPredictionID[predictionID] !== undefined
                ) {
                    let includedPatentIDs =
                        patentIDsHashmapByPredictionID[predictionID]
                    if (!includedPatentIDs.includes(patentID)) {
                        includedPatentIDs.push(patentID)
                        patentIDsHashmapByPredictionID[predictionID] =
                            includedPatentIDs
                    }
                } else {
                    patentIDsHashmapByPredictionID[predictionID] = [patentID]
                }
                if (!predictionIDs.includes(predictionID)) {
                    predictionIDs.push(predictionID)
                }
            }

            if (!patentIDs.includes(eachPatent.PatentID)) {
                patentIDs.push(eachPatent.PatentID)
            }
            if (!specificPatentIDs.includes(eachPatent.PatentID)) {
                specificPatentIDs.push(eachPatent.PatentID)
            }

            if (isValidData(eachPatent.Output)) {
                let outputValueHashmap // for all output columns (it will be with hashmap as string type)
                if (historyTab === true) {
                    outputValueHashmap = eachPatent.Output.slice(
                        0,
                        eachPatent.Output.length
                    )
                } else {
                    outputValueHashmap = JSON.parse(eachPatent.Output)
                }

                outputColumnList.map((eachOutputColumn) => {
                    let eachPatentOutput = isValidData(
                        outputValueHashmap[eachOutputColumn]
                    )
                        ? outputValueHashmap[eachOutputColumn]
                        : ''
                    if (Array.isArray(eachPatentOutput)) {
                        let splitArr = eachPatentOutput
                        let outputArr = []
                        splitArr.map((eachClass) => {
                            outputArr.push(eachClass)
                            classificationIDs = checkAndAppendUniqueIDs(
                                classificationIDs,
                                eachClass
                            )
                        })
                        outputValueHashmap[eachOutputColumn] = outputArr
                    } else {
                        if (historyTab !== true) {
                            if (isValidData(eachPatentOutput)) {
                                if (
                                    eachPatentOutput &&
                                    eachPatentOutput.includes('"')
                                ) {
                                    eachPatentOutput =
                                        eachPatentOutput.replaceAll('"', '')
                                }
                                let jsonStr =
                                    '{"Output":"' + eachPatentOutput + '"}'
                                let jsonParsed = JSON.parse(jsonStr)
                                eachPatentOutput = jsonParsed.Output
                            }
                        }

                        if (multiLabelModel === true) {
                            let newClassIDs =
                                eachPatentOutput.split(multiLabelSeparator)
                            outputValueHashmap[eachOutputColumn] = newClassIDs
                            classificationIDs =
                                checkAndAppendUniqueIDsForMultiLabels(
                                    classificationIDs,
                                    newClassIDs
                                )
                            let eachRowCount = 1
                            if (newClassIDs.length > 0) {
                                eachRowCount = newClassIDs.length
                            }
                            rowCountForMultiLabelModel += eachRowCount
                        } else {
                            if (multiClass === true) {
                                outputValueHashmap[eachOutputColumn] = [
                                    eachPatentOutput,
                                ]
                            } else {
                                outputValueHashmap[eachOutputColumn] =
                                    eachPatentOutput
                            }
                            classificationIDs = checkAndAppendUniqueIDs(
                                classificationIDs,
                                eachPatentOutput
                            )
                        }
                    }
                })

                eachPatent.Output = outputValueHashmap
            } else {
                if (multiClass === true) {
                    eachPatent.Output = {}
                } else {
                    if (multiLabelModel === true) {
                        eachPatent.Output = {}
                        rowCountForMultiLabelModel += 1
                    } else {
                        eachPatent.Output = {}
                    }
                }
            }

            // check for score value
            if (showRelevanceValue === true) {
                if (isValidData(eachPatent['Score'])) {
                    // eachPatent.Score = eachPatent.Score.toString()
                    // console.log("#eachPatent.Score: ", historyTab, ", ", eachPatent.Score)
                    let scoreValueHashmap
                    if (historyTab === true) {
                        scoreValueHashmap = eachPatent.Score.slice(
                            0,
                            eachPatent.Score.length
                        )
                    } else {
                        scoreValueHashmap = JSON.parse(eachPatent['Score'])
                    }

                    // console.log("#scoreValueHashmap: ", scoreValueHashmap)
                    // set initial value (defined initial value)
                    outputColumnList.map((eachColumn) => {
                        let eachPatentScoreValue = scoreValueHashmap[eachColumn]
                        if (hasDataList(eachPatentScoreValue)) {
                            let splitArr = eachPatentScoreValue
                            let scoreValueArr = []
                            let originalValueArr = []
                            splitArr.map((eachScoreValue) => {
                                originalValueArr.push(eachScoreValue)
                                let eachFixedScore = getFixedNumber(
                                    eachScoreValue.toString(),
                                    4,
                                    4
                                )
                                scoreValueArr.push(eachFixedScore)
                            })
                            eachPatent[eachColumn + '_Confidence'] = ''
                            eachPatent[eachColumn + '_OriginalRelevanceValue'] =
                                0
                            eachPatent[eachColumn + '_RelevanceValueArr'] =
                                scoreValueArr
                            eachPatent[
                                eachColumn + '_OriginalRelevanceValueArr'
                            ] = originalValueArr
                        } else {
                            if (historyTab !== true) {
                                if (isValidData(eachPatentScoreValue)) {
                                    let jsonStr =
                                        '{"Score":"' +
                                        eachPatentScoreValue +
                                        '"}'
                                    let jsonParsed = JSON.parse(jsonStr)
                                    eachPatentScoreValue = jsonParsed.Score
                                }
                            }
                            if (multiLabelModel === true) {
                                let scoreValueArr =
                                    eachPatentScoreValue.split(
                                        multiLabelSeparator
                                    )
                                let relevanceArr = []
                                scoreValueArr.map((eachScoreValue) => {
                                    relevanceArr.push(
                                        getFixedNumber(eachScoreValue, 4, 4)
                                    )
                                })

                                eachPatent[eachColumn + '_Confidence'] = ''
                                eachPatent[eachColumn + '_RelevanceValueArr'] =
                                    relevanceArr
                                eachPatent[
                                    eachColumn + '_OriginalRelevanceValueArr'
                                ] = scoreValueArr
                            } else {
                                eachPatentScoreValue =
                                    eachPatentScoreValue.toString()
                                eachPatentScoreValue = getFixedNumber(
                                    eachPatentScoreValue,
                                    4,
                                    4
                                )
                                if (multiClass === true) {
                                    eachPatent[eachColumn + '_Confidence'] = ''
                                    eachPatent[
                                        eachColumn + '_RelevanceValueArr'
                                    ] = [eachPatentScoreValue]
                                    eachPatent[
                                        eachColumn +
                                            '_OriginalRelevanceValueArr'
                                    ] = [parseFloat(eachPatentScoreValue)]
                                } else {
                                    eachPatent[eachColumn + '_Confidence'] =
                                        eachPatentScoreValue
                                    eachPatent[
                                        eachColumn + '_OriginalRelevanceValue'
                                    ] = parseFloat(eachPatentScoreValue)
                                }
                            }
                        }
                    })
                } else {
                    if (multiLabelModel === true) {
                        outputColumnList.map((eachColumn) => {
                            eachPatent[eachColumn + '_Confidence'] = ''
                            eachPatent[eachColumn + '_RelevanceValueArr'] = []
                            eachPatent[eachColumn + '_OriginalRelevanceValue'] =
                                []
                        })
                    } else {
                        outputColumnList.map((eachColumn) => {
                            if (multiClass === true) {
                                eachPatent[eachColumn + '_RelevanceValueArr'] =
                                    []
                                eachPatent[
                                    eachColumn + '_OriginalRelevanceValueArr'
                                ] = []
                            } else {
                                eachPatent[eachColumn + '_Confidence'] = ''
                                eachPatent[
                                    eachColumn + '_OriginalRelevanceValue'
                                ] = 0
                            }
                        })
                    }
                }
            }
        })
    }

    // console.log("#patentIDsHashmapByPredictionID: ", patentIDsHashmapByPredictionID)
    // console.log("#predictionIDs: ", predictionIDs)
    // console.log("#converted predictionResults: ", predictionResults)
    let tableRowCount =
        multiLabelModel === true
            ? rowCountForMultiLabelModel
            : predictionResults.length
    return {
        tableRowCount,
        patentIDs,
        predictionIDs,
        specificPatentIDs,
        classificationIDs,
        predictionResults,
        patentIDsHashmapByPredictionID,
    }
}

export const checkPasswordValidation = (inputPassword) => {
    let valid = /^(?=.*[!"'()+,-./:;<=>?\\_`~@#$%^&*{}|])/.test(inputPassword) // Should include special character
    if (valid) {
        let PasswordValidator = require('password-validator')
        let Schema = new PasswordValidator()
        Schema.is()
            .min(8) // Minimum length 8
            .is()
            .max(100) // Maximum length 100
            .has()
            .uppercase() // Must have uppercase letters
            .has()
            .lowercase() // Must have lowercase letters
            .has()
            .digits() // Must have digits
            .has()
            .not()
            .spaces() // Should not have spaces
            .is()
            .not()
            .oneOf(['Passw0rd', 'Password123'])

        valid = Schema.validate(inputPassword, { list: false })
    }
    console.log('Valid password - ', inputPassword, ' => ', valid)
    return valid
}

export const getPosition = (
    type,
    rowNumberWidth,
    includedCheckbox,
    includedTitle,
    includedAbstract,
    includedDescription
) => {
    let checkboxSpace = includedCheckbox ? checkboxWidth : rowNumberWidth
    let titleSpace = includedTitle ? titleWidth : rowNumberWidth
    // let abstractSpace = includedAbstract ? abstractWidth : rowNumberWidth;
    let descriptionSpace = includedDescription
        ? descriptionWidth
        : rowNumberWidth

    if (type === 'checkbox') {
        return 0
    } else if (type === 'Patent ID') {
        return checkboxSpace
    } else if (type === 'Title') {
        return patentIDWidth + checkboxSpace
    } else if (type === 'Abstract') {
        return patentIDWidth + checkboxSpace + titleSpace
    } else if (type === 'Description') {
        return patentIDWidth + checkboxSpace + titleSpace + descriptionSpace
    }
}

export const checkAndAssignedPatentValueForPredictionResults = (
    predictionResultList,
    patentValueHashmap
) => {
    predictionResultList.map((eachPatent) => {
        let title = ''
        let description = ''
        let abstract = ''
        if (isValidData(patentValueHashmap[eachPatent.PatentID])) {
            title = patentValueHashmap[eachPatent.PatentID].Title
            description = patentValueHashmap[eachPatent.PatentID].Description
            abstract = patentValueHashmap[eachPatent.PatentID].Abstract
        }
        eachPatent.Title = title
        eachPatent.Description = description
        eachPatent.Abstract = abstract
    })
    return predictionResultList
}

export const prepareClassificationInfoForPredictionResults = (
    multiLabelModel,
    multiOutputModel,
    outputColumnList,
    outputAndNoOfClasses,
    hideClassificationHyperlink,
    classificationColumnName = '',
    headerList,
    outputClassList,
    predictionResults,
    classificationNameHashmap,
    outputNodeNameHashmap,
    classifiedDateHashmap,
    showRelevanceValue,
    showCompanyName
) => {
    if (multiOutputModel === true) {
        let checkData = prepareClassificationInfoForResultsOfMultiOutputColumns(
            multiLabelModel,
            outputColumnList,
            outputAndNoOfClasses,
            hideClassificationHyperlink,
            headerList,
            outputClassList,
            predictionResults,
            classificationNameHashmap,
            outputNodeNameHashmap,
            classifiedDateHashmap,
            showRelevanceValue,
            showCompanyName
        )
        return {
            headerList: checkData.headerList,
            predictionResults: checkData.predictionResults,
        }
    }
    // for company name
    if (showCompanyName === true) {
        headerList.push({
            DisplayName: 'Competitor Name',
            Key: 'CompanyName',
            NodeName: 'CompanyName',
            OutputColumn: false,
            Pinned: true,
        })
    }

    if (hasDataList(outputClassList) && outputClassList.length > 1) {
        let outputHeaderList = []
        outputClassList.map((eachClassHeader, outputClassIndex) => {
            // header
            outputHeaderList.push({
                DisplayName: eachClassHeader,
                NodeName: eachClassHeader,
                Key: 'output' + (outputClassIndex + 1),
                ShowToolTip: true,
                HideHyperlink: hideClassificationHyperlink,
                OutputColumn: true,
            })
        })

        // to check and assign for reference data, for performance, checked condition outside
        if (showRelevanceValue === true) {
            if (isValidData(classificationNameHashmap)) {
                if (hasDataList(predictionResults)) {
                    predictionResults.map((eachDataRow) => {
                        if (Array.isArray(eachDataRow.Output)) {
                            let relevanceValueArr =
                                eachDataRow.RelevanceValueArr
                            let originalRelevanceValueArr =
                                eachDataRow.RelevanceValueArr
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (
                                    isValidData(eachDataRow.Output[headerIndex])
                                ) {
                                    value = eachDataRow.Output[headerIndex]
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value

                                // for relevance value (output key _ relevance)
                                let eachRelevanceValue = ''
                                let eachRelevanceKey =
                                    eachHeader.Key + '___relevance'
                                if (
                                    isValidData(relevanceValueArr[headerIndex])
                                ) {
                                    eachRelevanceValue =
                                        relevanceValueArr[headerIndex]
                                }
                                eachDataRow[eachRelevanceKey] =
                                    eachRelevanceValue // for relevance value

                                let eachOriginalRelevanceValue = 0
                                let eachOriginalRelevanceKey =
                                    'original___' + eachRelevanceKey
                                if (
                                    isValidData(
                                        originalRelevanceValueArr[headerIndex]
                                    )
                                ) {
                                    eachOriginalRelevanceValue =
                                        originalRelevanceValueArr[headerIndex]
                                }
                                eachDataRow[eachOriginalRelevanceKey] =
                                    eachOriginalRelevanceValue
                            })
                        } else {
                            // for class count = 1 case
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (headerIndex === 0) {
                                    value = eachDataRow.Output
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        }
                        if (isValidData(classifiedDateHashmap)) {
                            if (
                                classifiedDateHashmap[eachDataRow.PredictionID]
                            ) {
                                eachDataRow['ClassifiedDate'] =
                                    classifiedDateHashmap[
                                        eachDataRow.PredictionID
                                    ]
                            } else if (eachDataRow.CreatedAt) {
                                eachDataRow['ClassifiedDate'] =
                                    getClassifiedDate(eachDataRow.CreatedAt)
                            } else {
                                eachDataRow['ClassifiedDate'] = '-'
                            }
                        }
                    })
                }
            } else {
                predictionResults.map((eachDataRow) => {
                    if (Array.isArray(eachDataRow.Output)) {
                        outputHeaderList.map((eachHeader, headerIndex) => {
                            let value = ''
                            if (isValidData(eachDataRow.Output[headerIndex])) {
                                value = eachDataRow.Output[headerIndex]
                            }
                            eachDataRow[eachHeader.Key] = value // for classification value
                        })
                    } else {
                        outputHeaderList.map((eachHeader, headerIndex) => {
                            let value = ''
                            if (headerIndex === 0) {
                                value = eachDataRow.Output
                            }
                            eachDataRow[eachHeader.Key] = value // for classification value
                        })
                    }
                })
            }
        } else {
            if (isValidData(classificationNameHashmap)) {
                if (hasDataList(predictionResults)) {
                    predictionResults.map((eachDataRow) => {
                        if (Array.isArray(eachDataRow.Output)) {
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (
                                    isValidData(eachDataRow.Output[headerIndex])
                                ) {
                                    value = eachDataRow.Output[headerIndex]
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        } else {
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (headerIndex === 0) {
                                    value = eachDataRow.Output
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        }

                        if (isValidData(classifiedDateHashmap)) {
                            if (
                                classifiedDateHashmap[eachDataRow.PredictionID]
                            ) {
                                eachDataRow['ClassifiedDate'] =
                                    classifiedDateHashmap[
                                        eachDataRow.PredictionID
                                    ]
                            } else if (eachDataRow.CreatedAt) {
                                eachDataRow['ClassifiedDate'] =
                                    getClassifiedDate(eachDataRow.CreatedAt)
                            } else {
                                eachDataRow['ClassifiedDate'] = '-'
                            }
                        }
                    })
                }
            } else {
                predictionResults.map((eachDataRow) => {
                    if (Array.isArray(eachDataRow.Output)) {
                        outputHeaderList.map((eachHeader, headerIndex) => {
                            let value = ''
                            if (isValidData(eachDataRow.Output[headerIndex])) {
                                value = eachDataRow.Output[headerIndex]
                            }
                            eachDataRow[eachHeader.Key] = value // for classification value
                        })
                    } else {
                        outputHeaderList.map((eachHeader, headerIndex) => {
                            let value = ''
                            if (headerIndex === 0) {
                                value = eachDataRow.Output
                            }
                            eachDataRow[eachHeader.Key] = value // for classification value
                        })
                    }
                })
            }
        }
        headerList = headerList.concat(outputHeaderList)
    } else {
        if (hideClassificationHyperlink === true) {
            let className =
                classificationColumnName !== ''
                    ? classificationColumnName
                    : 'Classification Name'
            headerList.push({
                DisplayName:
                    isValidData(outputNodeNameHashmap[className]) &&
                    isValidData(outputNodeNameHashmap[className].ColumnName)
                        ? outputNodeNameHashmap[className].ColumnName
                        : className,
                Key: 'classificationID',
                NodeName:
                    classificationColumnName !== ''
                        ? classificationColumnName
                        : 'Classification Name',
                OutputColumn: true,
                MultiValueLabel: multiLabelModel,
            })
        } else {
            let classID = 'Classification ID'
            headerList.push({
                DisplayName:
                    isValidData(outputNodeNameHashmap[classID]) &&
                    isValidData(outputNodeNameHashmap[classID].ColumnName)
                        ? outputNodeNameHashmap[classID].ColumnName
                        : classID,
                Key: 'classificationID',
                NodeName: 'Classification ID',
                OutputColumn: true,
                MultiValueLabel: multiLabelModel,
            })
            let className = 'Classification Name'
            headerList.push({
                DisplayName:
                    isValidData(outputNodeNameHashmap[className]) &&
                    isValidData(outputNodeNameHashmap[className].ColumnName)
                        ? outputNodeNameHashmap[className].ColumnName
                        : className,
                Key: 'classificationName',
                NodeName: 'Classification Name',
                OutputColumn: true,
                MultiValueLabel: multiLabelModel,
            })
        }

        if (hideClassificationHyperlink === true) {
            if (isValidData(classifiedDateHashmap)) {
                predictionResults.map((eachDataRow) => {
                    if (multiLabelModel === true) {
                        let classificationIDs = []
                        if (hasDataList(eachDataRow.Output)) {
                            classificationIDs = eachDataRow.Output
                        }
                        eachDataRow['classificationID'] = classificationIDs
                    } else {
                        eachDataRow['classificationID'] = getClassificationID(
                            eachDataRow.Output
                        )
                    }

                    if (classifiedDateHashmap[eachDataRow.PredictionID]) {
                        eachDataRow['ClassifiedDate'] =
                            classifiedDateHashmap[eachDataRow.PredictionID]
                    } else if (eachDataRow.CreatedAt) {
                        eachDataRow['ClassifiedDate'] = getClassifiedDate(
                            eachDataRow.CreatedAt
                        )
                    } else {
                        eachDataRow['ClassifiedDate'] = '-'
                    }
                })
            } else {
                predictionResults.map((eachDataRow) => {
                    if (multiLabelModel === true) {
                        let classificationIDs = []
                        if (hasDataList(eachDataRow.Output)) {
                            classificationIDs = eachDataRow.Output
                        }
                        eachDataRow['classificationID'] = classificationIDs
                    } else {
                        eachDataRow['classificationID'] = getClassificationID(
                            eachDataRow.Output
                        )
                    }
                })
            }
        } else {
            if (isValidData(classifiedDateHashmap)) {
                predictionResults.map((eachDataRow) => {
                    if (multiLabelModel === true) {
                        let classificationIDs = []
                        let classificationNames = []
                        if (hasDataList(eachDataRow.Output)) {
                            classificationIDs = eachDataRow.Output
                            classificationIDs.map((eachClassID) => {
                                let eachClassName =
                                    classificationNameHashmap[eachClassID]
                                classificationNames.push(eachClassName)
                            })
                        }
                        eachDataRow['classificationID'] = classificationIDs
                        eachDataRow['classificationName'] = classificationNames
                    } else {
                        let classificationID = getClassificationID(
                            eachDataRow.Output
                        )
                        let classificationName =
                            classificationNameHashmap[classificationID]
                        eachDataRow['classificationID'] = classificationID
                        eachDataRow['classificationName'] = classificationName
                    }

                    if (classifiedDateHashmap[eachDataRow.PredictionID]) {
                        eachDataRow['ClassifiedDate'] =
                            classifiedDateHashmap[eachDataRow.PredictionID]
                    } else if (eachDataRow.CreatedAt) {
                        eachDataRow['ClassifiedDate'] = getClassifiedDate(
                            eachDataRow.CreatedAt
                        )
                    } else {
                        eachDataRow['ClassifiedDate'] = '-'
                    }
                })
            } else {
                predictionResults.map((eachDataRow) => {
                    if (multiLabelModel === true) {
                        let classificationIDs = []
                        let classificationNames = []
                        if (hasDataList(eachDataRow.Output)) {
                            classificationIDs = eachDataRow.Output
                            classificationIDs.map((eachClassID) => {
                                let eachClassName =
                                    classificationNameHashmap[eachClassID]
                                classificationNames.push(eachClassName)
                            })
                        }
                        eachDataRow['classificationID'] = classificationIDs
                        eachDataRow['classificationName'] = classificationNames
                    } else {
                        let classificationID = getClassificationID(
                            eachDataRow.Output
                        )
                        let classificationName =
                            classificationNameHashmap[classificationID]
                        eachDataRow['classificationID'] = classificationID
                        eachDataRow['classificationName'] = classificationName
                    }
                })
            }
        }

        // for single class count case
        if (showRelevanceValue === true) {
            let displayName = 'Confidence'
            if (
                isValidData(outputNodeNameHashmap) &&
                isValidData(outputNodeNameHashmap['Confidence']) &&
                outputNodeNameHashmap['Confidence'].ColumnName !== undefined
            ) {
                displayName = outputNodeNameHashmap['Confidence'].ColumnName
            }
            let key = 'Confidence'
            if (multiLabelModel === true) {
                key = 'RelevanceValueArr'
            }
            headerList.push({
                DisplayName: displayName,
                Key: key,
                NodeName: 'Confidence',
                OutputColumn: false,
                Pinned: true,
                MultiValueLabel: multiLabelModel,
            })
        }
    }

    // console.log("#header list after prepared: ", headerList)
    // console.log("#outputNodeNameHashmap: ", outputNodeNameHashmap)

    return {
        headerList,
        predictionResults,
    }
}

export const prepareClassificationInfoForResultsOfMultiOutputColumns = (
    multiLabelModel,
    outputColumnList,
    outputAndNoOfClasses = {},
    hideClassificationHyperlink,
    headerList,
    outputClassList,
    predictionResults,
    classificationNameHashmap,
    outputNodeNameHashmap,
    classifiedDateHashmap,
    showRelevanceValue,
    showCompanyName
) => {
    // for company name
    // console.log("#outputAndNoOfClasses: ", outputAndNoOfClasses)
    if (showCompanyName === true) {
        headerList.push({
            DisplayName: 'Competitor Name',
            Key: 'CompanyName',
            NodeName: 'CompanyName',
            OutputColumn: false,
            Pinned: true,
        })
    }

    if (hasDataList(outputClassList) && outputClassList.length > 1) {
        let outputHeaderList = []
        outputClassList.map((eachClassHeader, outputClassIndex) => {
            outputColumnList.map((eachOutput) => {
                let outputCount = outputClassList.length
                if (isValidData(outputAndNoOfClasses[eachOutput])) {
                    outputCount = outputAndNoOfClasses[eachOutput]
                }
                if (outputClassIndex < outputCount) {
                    outputHeaderList.push({
                        DisplayName: eachOutput + ' ' + eachClassHeader,
                        NodeName: eachClassHeader,
                        Key: eachOutput + '_output' + (outputClassIndex + 1),
                        ShowToolTip: true,
                        HideHyperlink: hideClassificationHyperlink,
                        OutputColumn: true,
                    })
                }
            })
        })

        // to check and assign for reference data, for performance, checked condition outside
        if (showRelevanceValue === true) {
            if (isValidData(classificationNameHashmap)) {
                if (hasDataList(predictionResults)) {
                    predictionResults.map((eachDataRow) => {
                        let outputValueHashmap = eachDataRow.Output
                        outputColumnList.map((eachOutput, outputIndex) => {
                            let valueArr = outputValueHashmap[eachOutput]

                            let relatedHeaderList = []
                            outputHeaderList.map((eachHeader) => {
                                if (eachHeader.Key.includes(eachOutput)) {
                                    relatedHeaderList.push(eachHeader)
                                }
                            })

                            if (Array.isArray(valueArr)) {
                                let relevanceValueArr =
                                    eachDataRow[
                                        eachOutput + '_RelevanceValueArr'
                                    ]
                                let originalRelevanceValueArr =
                                    eachDataRow[
                                        eachOutput + '_RelevanceValueArr'
                                    ]
                                relatedHeaderList.map(
                                    (eachHeader, headerIndex) => {
                                        let value = ''
                                        if (
                                            isValidData(valueArr[headerIndex])
                                        ) {
                                            value = valueArr[headerIndex]
                                        }
                                        eachDataRow[eachHeader.Key] = value // for classification value

                                        // for relevance value (output key _ relevance)
                                        let eachRelevanceValue = ''
                                        let eachRelevanceKey =
                                            eachHeader.Key + '___relevance'
                                        if (
                                            isValidData(
                                                relevanceValueArr[headerIndex]
                                            )
                                        ) {
                                            eachRelevanceValue =
                                                relevanceValueArr[headerIndex]
                                        }
                                        eachDataRow[eachRelevanceKey] =
                                            eachRelevanceValue // for relevance value

                                        let eachOriginalRelevanceValue = 0
                                        let eachOriginalRelevanceKey =
                                            'original___' + eachRelevanceKey
                                        if (
                                            isValidData(
                                                originalRelevanceValueArr[
                                                    headerIndex
                                                ]
                                            )
                                        ) {
                                            eachOriginalRelevanceValue =
                                                originalRelevanceValueArr[
                                                    headerIndex
                                                ]
                                        }
                                        eachDataRow[eachOriginalRelevanceKey] =
                                            eachOriginalRelevanceValue
                                    }
                                )
                            } else {
                                // for class count = 1 case
                                relatedHeaderList.map(
                                    (eachHeader, headerIndex) => {
                                        let value = ''
                                        if (headerIndex === 0) {
                                            value = valueArr
                                        }
                                        eachDataRow[eachHeader.Key] = value // for classification value
                                    }
                                )
                            }
                        })

                        if (isValidData(classifiedDateHashmap)) {
                            if (
                                classifiedDateHashmap[eachDataRow.PredictionID]
                            ) {
                                eachDataRow['ClassifiedDate'] =
                                    classifiedDateHashmap[
                                        eachDataRow.PredictionID
                                    ]
                            } else if (eachDataRow.CreatedAt) {
                                eachDataRow['ClassifiedDate'] =
                                    getClassifiedDate(eachDataRow.CreatedAt)
                            } else {
                                eachDataRow['ClassifiedDate'] = '-'
                            }
                        }
                    })
                }
            } else {
                predictionResults.map((eachDataRow) => {
                    let outputValueHashmap = eachDataRow.Output
                    outputColumnList.map((eachOutput) => {
                        let outputValue = outputValueHashmap[eachOutput]
                        if (Array.isArray(outputValue)) {
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (isValidData(outputValue[headerIndex])) {
                                    value = outputValue[headerIndex]
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        } else {
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (headerIndex === 0) {
                                    value = outputValue
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        }
                    })
                })
            }
        } else {
            if (isValidData(classificationNameHashmap)) {
                if (hasDataList(predictionResults)) {
                    predictionResults.map((eachDataRow) => {
                        let outputValueHashmap = eachDataRow.Output
                        outputColumnList.map((eachOutput) => {
                            let outputValue = outputValueHashmap[eachOutput]
                            if (Array.isArray(outputValue)) {
                                outputHeaderList.map(
                                    (eachHeader, headerIndex) => {
                                        let value = ''
                                        if (
                                            isValidData(
                                                outputValue[headerIndex]
                                            )
                                        ) {
                                            value = outputValue[headerIndex]
                                        }
                                        eachDataRow[eachHeader.Key] = value // for classification value
                                    }
                                )
                            } else {
                                outputHeaderList.map(
                                    (eachHeader, headerIndex) => {
                                        let value = ''
                                        if (headerIndex === 0) {
                                            value = outputValue
                                        }
                                        eachDataRow[eachHeader.Key] = value // for classification value
                                    }
                                )
                            }
                        })

                        if (isValidData(classifiedDateHashmap)) {
                            if (
                                classifiedDateHashmap[eachDataRow.PredictionID]
                            ) {
                                eachDataRow['ClassifiedDate'] =
                                    classifiedDateHashmap[
                                        eachDataRow.PredictionID
                                    ]
                            } else if (eachDataRow.CreatedAt) {
                                eachDataRow['ClassifiedDate'] =
                                    getClassifiedDate(eachDataRow.CreatedAt)
                            } else {
                                eachDataRow['ClassifiedDate'] = '-'
                            }
                        }
                    })
                }
            } else {
                predictionResults.map((eachDataRow) => {
                    let outputValueHashmap = eachDataRow.Output
                    outputColumnList.map((eachOutput) => {
                        let outputValue = outputValueHashmap[eachOutput]
                        if (Array.isArray(outputValue)) {
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (isValidData(outputValue[headerIndex])) {
                                    value = outputValue[headerIndex]
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        } else {
                            outputHeaderList.map((eachHeader, headerIndex) => {
                                let value = ''
                                if (headerIndex === 0) {
                                    value = outputValue
                                }
                                eachDataRow[eachHeader.Key] = value // for classification value
                            })
                        }
                    })
                })
            }
        }
        headerList = headerList.concat(outputHeaderList)
    } else {
        if (hideClassificationHyperlink === true) {
            outputColumnList.map((eachOutput) => {
                let className = eachOutput + '_Classification Name' // keyword
                headerList.push({
                    DisplayName:
                        isValidData(outputNodeNameHashmap[className]) &&
                        isValidData(outputNodeNameHashmap[className].ColumnName)
                            ? outputNodeNameHashmap[className].ColumnName
                            : eachOutput,
                    Key: eachOutput + '_classificationID',
                    NodeName: className,
                    OutputColumn: true,
                    MultiValueLabel: multiLabelModel,
                })
            })
        } else {
            outputColumnList.map((eachOutput) => {
                let classID = eachOutput + '_Classification ID'
                headerList.push({
                    DisplayName:
                        isValidData(outputNodeNameHashmap[classID]) &&
                        isValidData(outputNodeNameHashmap[classID].ColumnName)
                            ? outputNodeNameHashmap[classID].ColumnName
                            : eachOutput + '_CLASS_ID',
                    Key: eachOutput + '_classificationID',
                    NodeName: classID,
                    OutputColumn: true,
                    MultiValueLabel: multiLabelModel,
                })
                let className = eachOutput + '_Classification Name'
                headerList.push({
                    DisplayName:
                        isValidData(outputNodeNameHashmap[className]) &&
                        isValidData(outputNodeNameHashmap[className].ColumnName)
                            ? outputNodeNameHashmap[className].ColumnName
                            : eachOutput + '_ClASS_NAME',
                    Key: eachOutput + '_classificationName',
                    NodeName: className,
                    OutputColumn: true,
                    MultiValueLabel: multiLabelModel,
                })
            })
        }

        if (hideClassificationHyperlink === true) {
            if (isValidData(classifiedDateHashmap)) {
                predictionResults.map((eachDataRow) => {
                    let outputHashmap = eachDataRow.Output
                    outputColumnList.map((eachOutput) => {
                        if (multiLabelModel === true) {
                            let classificationIDs = []
                            if (hasDataList(outputHashmap[eachOutput])) {
                                classificationIDs = outputHashmap[eachOutput]
                            }
                            eachDataRow[eachOutput + '_classificationID'] =
                                classificationIDs
                        } else {
                            eachDataRow[eachOutput + '_classificationID'] =
                                getClassificationID(outputHashmap[eachOutput])
                        }
                    })

                    if (classifiedDateHashmap[eachDataRow.PredictionID]) {
                        eachDataRow['ClassifiedDate'] =
                            classifiedDateHashmap[eachDataRow.PredictionID]
                    } else if (eachDataRow.CreatedAt) {
                        eachDataRow['ClassifiedDate'] = getClassifiedDate(
                            eachDataRow.CreatedAt
                        )
                    } else {
                        eachDataRow['ClassifiedDate'] = '-'
                    }
                })
            } else {
                predictionResults.map((eachDataRow) => {
                    let outputHashmap = eachDataRow.Output
                    outputColumnList.map((eachOutput) => {
                        if (multiLabelModel === true) {
                            eachDataRow[eachOutput + '_classificationID'] =
                                outputHashmap &&
                                hasDataList(outputHashmap[eachOutput])
                                    ? outputHashmap[eachOutput]
                                    : []
                        } else {
                            eachDataRow[eachOutput + '_classificationID'] =
                                getClassificationID(outputHashmap[eachOutput])
                        }
                    })
                })
            }
        } else {
            if (isValidData(classifiedDateHashmap)) {
                predictionResults.map((eachDataRow) => {
                    let outputHashmap = isValidData(eachDataRow.Output)
                        ? eachDataRow.Output
                        : {}
                    outputColumnList.map((eachOutput) => {
                        if (multiLabelModel === true) {
                            let classificationIDs = []
                            let classificationNames = []
                            if (hasDataList(outputHashmap[eachOutput])) {
                                classificationIDs = outputHashmap[eachOutput]
                                classificationIDs.map((eachClassID) => {
                                    let eachClassName =
                                        classificationNameHashmap[eachClassID]
                                    classificationNames.push(eachClassName)
                                })
                            }
                            eachDataRow[eachOutput + '_classificationID'] =
                                classificationIDs
                            eachDataRow[eachOutput + '_classificationName'] =
                                classificationNames
                        } else {
                            let classificationID = getClassificationID(
                                outputHashmap[eachOutput]
                            )
                            let classificationName =
                                classificationNameHashmap[classificationID]
                            eachDataRow[eachOutput + '_classificationID'] =
                                classificationID
                            eachDataRow[eachOutput + '_classificationName'] =
                                classificationName
                        }
                    })

                    if (classifiedDateHashmap[eachDataRow.PredictionID]) {
                        eachDataRow['ClassifiedDate'] =
                            classifiedDateHashmap[eachDataRow.PredictionID]
                    } else if (eachDataRow.CreatedAt) {
                        eachDataRow['ClassifiedDate'] = getClassifiedDate(
                            eachDataRow.CreatedAt
                        )
                    } else {
                        eachDataRow['ClassifiedDate'] = '-'
                    }
                })
            } else {
                predictionResults.map((eachDataRow) => {
                    let outputHashmap = isValidData(eachDataRow.Output)
                        ? eachDataRow.Output
                        : {}
                    outputColumnList.map((eachOutput) => {
                        if (multiLabelModel === true) {
                            let classificationIDs = []
                            let classificationNames = []
                            if (hasDataList(outputHashmap[eachOutput])) {
                                classificationIDs = outputHashmap[eachOutput]
                                classificationIDs.map((eachClassID) => {
                                    let eachClassName =
                                        classificationNameHashmap[eachClassID]
                                    classificationNames.push(eachClassName)
                                })
                            }
                            eachDataRow[eachOutput + '_classificationID'] =
                                classificationIDs
                            eachDataRow[eachOutput + '_classificationName'] =
                                classificationNames
                        } else {
                            let classificationID = getClassificationID(
                                outputHashmap[eachOutput]
                            )
                            let classificationName =
                                classificationNameHashmap[classificationID]
                            eachDataRow[eachOutput + '_classificationID'] =
                                classificationID
                            eachDataRow[eachOutput + '_classificationName'] =
                                classificationName
                        }
                    })
                })
            }
        }

        // for single class count case
        if (showRelevanceValue === true) {
            outputColumnList.map((eachOutput) => {
                let columnKey = eachOutput + '_Confidence'
                let displayName = eachOutput + ' Confidence'
                if (
                    isValidData(outputNodeNameHashmap) &&
                    isValidData(outputNodeNameHashmap[columnKey]) &&
                    outputNodeNameHashmap[columnKey].ColumnName !== undefined
                ) {
                    displayName = outputNodeNameHashmap[columnKey].ColumnName
                }

                let key = eachOutput + '_Confidence'
                if (multiLabelModel === true) {
                    key = eachOutput + '_RelevanceValueArr'
                }
                headerList.push({
                    DisplayName: displayName,
                    Key: key,
                    NodeName: eachOutput,
                    OutputColumn: false,
                    Pinned: true,
                    MultiValueLabel: multiLabelModel,
                })
            })
        }
    }

    // console.log("#header list after prepared: ", headerList)
    // console.log("#outputNodeNameHashmap: ", outputNodeNameHashmap)

    return {
        headerList,
        predictionResults,
    }
}

export const getClassificationID = (output) => {
    let classificationID
    if (Array.isArray(output)) {
        classificationID = output[0]
    } else {
        classificationID = output
    }
    return classificationID
}

export const checkAndAssignDefaultValue = (value) => {
    if (value !== undefined && value !== null && value !== '') {
    } else {
        value = '-'
    }
    return value
}

export const prepareOverviewStatusFromAllDetailedInfos = (
    detailStatusInfos
) => {
    let foundInProgress = false
    let foundSuccess = false
    let foundFailed = false
    detailStatusInfos.map((eachInfo) => {
        if (eachInfo.Status === FAIL) {
            foundFailed = true
        } else if (eachInfo.Status === SUCCESS) {
            foundSuccess = true
        } else if (eachInfo.Status === IN_PROGRESS) {
            foundInProgress = true
        }
    })
    let status = ''
    if (foundInProgress) {
        status = IN_PROGRESS
    } else if (foundFailed && foundSuccess) {
        status = MIX_STATUS
    } else if (foundSuccess) {
        status = SUCCESS
    }
    return status
}

export const calculateDisplayFileSize = (inputFileSize) => {
    let displayFileSize = inputFileSize
    let kiloSize = 1024
    if (displayFileSize > kiloSize) {
        displayFileSize = inputFileSize / kiloSize
        if (displayFileSize > kiloSize) {
            displayFileSize = displayFileSize / kiloSize
            if (displayFileSize > kiloSize) {
                displayFileSize = (displayFileSize / kiloSize).toFixed(1) + 'GB'
            } else {
                displayFileSize = displayFileSize.toFixed(1) + 'MB'
            }
        } else {
            displayFileSize = displayFileSize.toFixed(1) + 'KB'
        }
    } else {
        displayFileSize = inputFileSize + 'B'
    }
    return displayFileSize
}

export const convertUtcToCurrentDateAndTime = (inputUtcTime) => {
    let timeStamp = new Date(inputUtcTime)
    // console.log("original time stamp : ", timeStamp)
    // Parse our locale string to [date, time]]
    let localDateTimeArr = timeStamp
        .toLocaleString('en-US', { hour12: true })
        .split(' ')
    // console.log("new date with given format : ", localDateTimeArr)
    let date = localDateTimeArr[0].split(',')[0]
    let time = localDateTimeArr[1]
    let ampm = localDateTimeArr[2]
    let splitTime = time.split(':')
    let hours = splitTime[0]
    let minutes = splitTime[1]
    let updateTime = hours + ':' + minutes + ' ' + ampm
    if (splitTime.length > 2) {
        let seconds = splitTime[2]
        updateTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm
    }
    // to get for this format => 26 Jul 2023
    // let dateArr = date.split("/");
    // let convertedDate = new Date(dateArr[2], (dateArr[0] - 1), dateArr[1]);
    // let shortMonth = convertedDate.toLocaleString('default', {month: 'short'}); /* Jun */
    // let updateDate = dateArr[1] + " " + shortMonth + " " + dateArr[2];
    return {
        Date: date,
        Time: updateTime,
    }
}

export const getFormattedPatentIDs = (patentIDs) => {
    let outputPatentIDs = []
    patentIDs.map((eachPatentID) => {
        outputPatentIDs.push(patentFormatter(eachPatentID))
    })
    return outputPatentIDs
}

export const patentFormatter = (inputPatentID) => {
    //space, hyphen, n-dash, m-dash, forward slash, backward slash, open/close parens
    let replacedText = ''
    if (inputPatentID !== undefined) {
        replacedText = inputPatentID
            .replaceAll(' ', '')
            .replaceAll('_', '')
            .replaceAll('-', '')
            .replaceAll('/', '')
            .replaceAll('\\', '')
            .replaceAll('(', '')
            .replaceAll(')', '')
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('[', '')
            .replaceAll(']', '')
            .replaceAll('.', '')
            .replaceAll('?', '')
    }
    console.log(inputPatentID, ' => ', replacedText)
    return replacedText
}

export const getColumnWordSize = (pageNumber, pageSize) => {
    let wordSize = 6
    let padding = 20
    if (!isValidData(pageNumber)) {
        pageNumber = 1
    }

    return (pageNumber * pageSize).toString().length * wordSize + 2 * padding
}

export const getSerialRowNumber = (pageNumber, pageSize, index) => {
    if (!isValidData(pageNumber)) {
        pageNumber = 1
    }
    return (pageNumber - 1) * pageSize + (index + 1)
}

export const getFiledName = (fieldName) => {
    if (isValidData(fieldName) && fieldName.includes('.')) {
        fieldName = fieldName.replaceAll('.', '_')
    }
    return fieldName
}

export const prepareColumnDefs = (columnInfoList) => {
    let columnDefs = []
    const patentIDWidth = 250
    const titleWidth = 250
    const abstractWidth = 300
    const descriptionWidth = 300
    const otherColumnWidth = 250
    let modifiedColumnNames = []
    columnInfoList.map((eachColumn, columnIndex) => {
        let filedName = getFiledName(eachColumn.ColumnName)
        if (filedName !== eachColumn.ColumnName) {
            modifiedColumnNames.push({
                OldName: eachColumn.ColumnName,
                NewName: filedName,
            })
        }
        let colDef = {
            headerName: eachColumn.ColumnName,
            field: filedName,
            flex: 1,
            minWidth: otherColumnWidth,
            wrapText: true,
            sortable: true,
        }
        if (columnIndex === 0) {
            colDef.pinned = 'top'
            colDef.lockPinned = true
        }
        if (isValidData(eachColumn.ColumnName)) {
            let columnNameLower = eachColumn.ColumnName.toLowerCase()
            if (
                columnNameLower === 'patentid' ||
                columnNameLower === 'document no.'
            ) {
                colDef.minWidth = patentIDWidth
            } else if (columnNameLower === 'title') {
                colDef.minWidth = titleWidth
            } else if (columnNameLower === 'abstract') {
                colDef.minWidth = abstractWidth
            } else if (columnNameLower === 'description') {
                colDef.minWidth = descriptionWidth
            }
        }

        columnDefs.push(colDef)
    })
    console.log('#columnDefs: ', columnDefs)
    console.log('#modifiedColumnNames: ', modifiedColumnNames)
    return {
        columnDefs,
        modifiedColumnNames,
    }
}

export const convertTableData = (modifiedInfoList, previewData) => {
    if (hasDataList(previewData)) {
        let prevDataStr = JSON.stringify(previewData)
        modifiedInfoList.map((eachInfo) => {
            prevDataStr = prevDataStr.replaceAll(
                eachInfo.OldName,
                eachInfo.NewName
            )
        })
        previewData = JSON.parse(prevDataStr)
    }
    return previewData
}

export const getOppositeColor = (color) => {
    // Variables for red, green, blue values
    if (!isValidData(color)) {
        return 'black'
    }
    let r, g, b, hsp

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        )

        r = color[1]
        g = color[2]
        b = color[3]
    } else {
        color = +(
            '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
        )

        r = color >> 16
        g = (color >> 8) & 255
        b = color & 255
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        //actually color type is light, so should return black color for text
        return 'black'
    } else {
        //actually color type is dark, so should return white color for text
        return 'white'
    }
}

export const calculateDisplayPatentSize = (inputSize) => {
    let displayFileSize = inputSize
    let kiloSize = 1000
    if (displayFileSize > kiloSize) {
        displayFileSize = inputSize / kiloSize
        if (displayFileSize > kiloSize) {
            displayFileSize = displayFileSize / kiloSize
            if (displayFileSize > kiloSize) {
                displayFileSize = (displayFileSize / kiloSize).toFixed(1) + 'GB'
            } else {
                displayFileSize = displayFileSize.toFixed(1) + 'MB'
            }
        } else {
            displayFileSize = displayFileSize.toFixed(1) + 'KB'
        }
    } else {
        displayFileSize = inputSize
    }
    return displayFileSize
}

export const getResponseMessage = (
    responseCode,
    pageType = '',
    requestID = ''
) => {
    // let message = "The process has failed with this response code \"" + responseCode + "\". Please contact AnyGen support team at \"support@anygen.ai\" to know the exact problem."
    let message =
        'The process has failed with this response code "' +
        responseCode +
        '". Please contact AnyGen support team at "support@anygen.ai", providing the response code for detailed information.'
    if (isValidData(requestID)) {
        message =
            'The process with the JobID "' +
            requestID +
            '" has failed with this response code "' +
            responseCode +
            '". Please contact AnyGen support team at "support@anygen.ai", providing the JobID and response code for detailed information..'
    }
    if (responseCode === 2403) {
        message = 'Invalid Api Key From Header to continue the process.'
    } else if (responseCode === 2404) {
        message =
            'You exceeded your current quota, please check your plan and billing details.'
    } else if (responseCode === 2405) {
        message = 'File data format is not valid, please check your file.'
    } else if (responseCode === 5128) {
        if (pageType === 'smart_innovation') {
            message =
                'Currently, GPUs are temporarily unavailable to run the novelty process. Please try again later.'
        } else {
            message =
                'Currently, GPU server is not available for classification process. Please try again later.'
        }
    } else {
        if (pageType === 'inference') {
            message =
                'Classification process has failed with this response code "' +
                responseCode +
                '". Please contact AnyGen support team at "support@anygen.ai", providing the response code to know the exact problem.'
        } else if (pageType === 'train') {
            message =
                'Model training has failed with this response code "' +
                responseCode +
                '". Please contact AnyGen support team at "support@anygen.ai", providing the response code to know the exact problem.'
        } else if (pageType === 'test') {
            message =
                'Training testing batches has failed with this response code "' +
                responseCode +
                '". Please contact AnyGen support team at "support@anygen.ai", providing the response code to know the exact problem.'
        } else if (pageType === 'generate') {
            message =
                'Generating model has failed with this response code "' +
                responseCode +
                '". Please contact AnyGen support team at "support@anygen.ai", providing the response code to know the exact problem.'
        } else if (pageType === 'model_config') {
            message =
                'Model configuration has failed with this response code "' +
                responseCode +
                '". Please contact AnyGen support team at "support@anygen.ai", providing the response code to know the exact problem.'
        } else if (pageType === 'aqx') {
            message =
                'Searching process has failed with this response code "' +
                responseCode +
                '". Please contact AnyGen support team at "support@anygen.ai", providing the response code to know the exact problem.'
        }
    }

    return message
}

export const getCurrentLocalTimeForFolderName = () => {
    let utcTime = getCurrentUTCDateTime()
    let timeStamp = new Date(utcTime)
    // Parse our locale string to [date, time]
    let localDateTimeArr = timeStamp
        .toLocaleString('en-US', { hour12: true })
        .split(' ')
    let date = localDateTimeArr[0].split(',')[0]
    // let time = localDateTimeArr[1];
    // let ampm = localDateTimeArr[2]
    // let splitTime = time.split(":");
    // let hours = splitTime[0];
    // let minutes = splitTime[1];
    // let updateTime = hours + '-' + minutes + ampm;
    // if (splitTime.length > 2) {
    //     let seconds = splitTime[2]
    //     updateTime = hours + '-' + minutes + "-" + seconds + ampm;
    // }

    let dateSplitArr = date.split('/')
    if (dateSplitArr.length > 2) {
        let month = dateSplitArr[0]
        let day = dateSplitArr[1]
        let year = dateSplitArr[2]
        date = year + '-' + month + '-' + day
    }

    // return date + "_" + updateTime
    return date
}

export const getCurrentLocalTime = () => {
    let utcTime = getCurrentUTCDateTime()
    let timeStamp = new Date(utcTime)
    // Parse our locale string to [date, time]
    let localDateTimeArr = timeStamp
        .toLocaleString('en-US', { hour12: true })
        .split(' ')
    let time = localDateTimeArr[1]
    let ampm = localDateTimeArr[2]
    let splitTime = time.split(':')
    let hours = splitTime[0]
    let minutes = splitTime[1]
    let updateTime = hours + '-' + minutes + ampm
    if (splitTime.length > 2) {
        let seconds = splitTime[2]
        updateTime = hours + '-' + minutes + '-' + seconds + ampm
    }

    return updateTime
}

export const prepareDownloadFolderName = (
    modelName,
    predictionName,
    patentSearchCase
) => {
    //AI_Classifier_2024-01-02_1.csv
    let folderName = 'AI_Classifier'
    if (patentSearchCase === true) {
        folderName = 'Patent_Group'
    }
    if (isValidData(modelName)) {
        let splitModelNames = modelName.split(' ')
        let shortModelName = ''
        splitModelNames.map((eachName) => {
            eachName = eachName.replaceAll(' ', '')
            if (isValidData(eachName)) {
                let firstChar = eachName[0]
                let regex = /^[a-zA-Z]+$/
                let isChar = regex.test(firstChar)
                if (isChar) {
                    let firstCharUpper = firstChar.toUpperCase()
                    if (shortModelName === '') {
                        shortModelName = firstCharUpper
                    } else {
                        shortModelName += firstCharUpper
                    }
                }
            }
        })
        if (shortModelName !== '') {
            folderName += '_' + shortModelName
        }
    }
    if (isValidData(predictionName)) {
        predictionName = predictionName.replaceAll(' ', '') // prediction based
        if (predictionName !== '') {
            folderName += '_' + predictionName
        }
    }
    let localTime = getCurrentLocalTimeForFolderName()
    folderName += '_' + localTime
    return folderName
}

export const calculatePercentage = (value, total) => {
    let percentage = (value / total) * 100
    if (parseInt(percentage.toString()) === percentage) {
    } else {
        percentage = percentage.toFixed(2)
        if (parseFloat(percentage) <= 0) {
            for (let digitCount = 3; digitCount < 10; digitCount++) {
                percentage = ((value / total) * 100).toFixed(digitCount)
                if (parseFloat(percentage) > 0) {
                    break
                }
            }
        }
    }
    return percentage
}

export const getFixedNumber = (inputValue, minDigit, maxDigit) => {
    // console.log("#getFixedNumber: ", inputValue, ", type: ", typeof inputValue)
    let value = parseFloat(inputValue)
    let fixedValue = value.toFixed(minDigit)
    if (parseFloat(fixedValue) <= 0) {
        for (let digitCount = 3; digitCount < maxDigit; digitCount++) {
            fixedValue = value.toFixed(digitCount)
            if (parseFloat(fixedValue) > 0) {
                break
            }
        }
    }
    return fixedValue
}

export const getClassifiedDate = (createdAt) => {
    let convData = convertUtcToCurrentDateAndTime(createdAt)
    let date = convData.Date
    let formattedDate = date
    let dateSplitArr = date.split('/')
    if (dateSplitArr.length > 2) {
        let month = dateSplitArr[0]
        let day = dateSplitArr[1]
        let year = dateSplitArr[2]
        if (parseInt(month) < 10) {
            month = '0' + month
        }
        if (parseInt(day) < 10) {
            day = '0' + day
        }
        formattedDate = year + '-' + month + '-' + day
    }
    return formattedDate
}

export const getMaxNumberOfArray = (numbers) => {
    // Math.max(...numbers)
    // Math.max.apply(null, numbers)
    // numbers.sort(numbers.length-1)
    // with for loop
    // reduce logic is the best when handled for multiple items in an array
    return numbers.reduce((accumulator, currentValue) => {
        return Math.max(accumulator, currentValue)
    }, numbers[0])
}

export const getAboveThresholdCount = (rowData, threshold) => {
    //let new_arr_1 = data.reduce((a, b) => a.concat(([1,3,5].includes(b.id) ? b.value: [])), []);
    let newRowDataArr = rowData.reduce(
        (newArr, eachData) =>
            newArr.concat(
                eachData['OriginalRelevanceValue'] < threshold ? eachData : []
            ),
        []
    )
    return newRowDataArr.length
}

export const getRoleBasedInfo = () => {
    let role = 'user'
    let superAdminID = ''
    let adminID = ''
    if (isSuperAdmin === true) {
        role = 'super_admin'
    } else if (isAdminUser === true) {
        role = 'admin'
        superAdminID = userInfo.CreatedBy
    } else {
        adminID = isValidData(userInfo.AssignedBy)
            ? userInfo.AssignedBy
            : userInfo.CreatedBy
    }
    return {
        role,
        superAdminID,
        adminID,
    }
}

export const getCheckValidateHeaderColumnForReinforce = (
    inputColumnList,
    requiredColumns
) => {
    console.log(
        'getCheckValidateHeaderColumn - inputColumnList: ',
        inputColumnList
    )
    let successHeader = false
    let ColumnInfo = []
    let sameInitialCount = false
    let ColumnInfoForOutputColumn = []
    if (inputColumnList.length === 1) {
    } else {
        inputColumnList.map((eachColumn) => {
            if (eachColumn['PossibleDataType'].includes('string')) {
                eachColumn.Name = eachColumn.ColumnName
                ColumnInfo.push(eachColumn)
                ColumnInfoForOutputColumn.push(eachColumn)
            } else if (eachColumn['PossibleDataType'].includes('int')) {
                eachColumn.Name = eachColumn.ColumnName
                ColumnInfoForOutputColumn.push(eachColumn)
            }
        })

        if (inputColumnList.length >= requiredColumns.length) {
            sameInitialCount = true
        }
    }

    let checkCountSuccess = false
    if (isValidData(ColumnInfo)) {
        if (sameInitialCount === true) {
            checkCountSuccess = true
        } else {
            console.log(
                'count is not same : ',
                ColumnInfo.length,
                ', ',
                requiredColumns.length
            )
        }
    }
    if (checkCountSuccess) {
        successHeader = checkCountSuccess
    }
    console.log('checking file validation : ', checkCountSuccess)
    return {
        ColumnInfo,
        successHeader,
        checkCountSuccess,
        columnList: ColumnInfo,
        ColumnInfoForOutputColumn: ColumnInfoForOutputColumn,
    }
}

export const checkReinforceColumnMappingsInfo = (
    requiredColumnMappings,
    ColumnInfo,
    validColumnInfoListForOutputColumn,
    usedColumnHashmap
) => {
    console.log(
        '#checkReinforceColumnMappingsInfo: ',
        requiredColumnMappings,
        ', ',
        ColumnInfo,
        ', ',
        usedColumnHashmap
    )
    let mappableColumnsCount = 0
    let availableColumnList = []
    ColumnInfo.map((eachColumn) => {
        availableColumnList.push(eachColumn.ColumnName)
    })

    let availableOutputColumns = []
    validColumnInfoListForOutputColumn.map((eachColumn) => {
        availableOutputColumns.push(eachColumn.ColumnName)
    })
    requiredColumnMappings.map((eachColumn) => {
        if (!isValidData(eachColumn.MappedColumnName)) {
            let mappedColumnName = ''
            if (eachColumn.OutputColumn === true) {
                // mappedColumnName = checkAndGetForAvailableColumnName(eachColumn.Name, availableOutputColumns, usedColumnHashmap)
            } else {
                // mappedColumnName = checkAndGetForAvailableColumnName(eachColumn.Name, availableColumnList, usedColumnHashmap)
            }
            if (usedColumnHashmap[mappedColumnName] !== undefined) {
                usedColumnHashmap[mappedColumnName]++
            } else {
                usedColumnHashmap[mappedColumnName] = 1
            }
            eachColumn.MappedColumnName = mappedColumnName
            let nameLower = eachColumn.Name.toLowerCase()
            let mappedNameLower = eachColumn.MappedColumnName.toLowerCase()
            if (nameLower === mappedNameLower) {
                mappableColumnsCount++
            } else if (
                (nameLower === 'patentID' || nameLower === 'document no.') &&
                (mappedNameLower === 'patentID' ||
                    mappedNameLower === 'document no.')
            ) {
                mappableColumnsCount++
            }
        }
    })
    let skipHeaderCheck = false
    if (mappableColumnsCount > 0) {
        skipHeaderCheck = true
    }
    let skipColumnMapping = false
    if (mappableColumnsCount === requiredColumnMappings.length) {
        skipColumnMapping = true
    }
    return {
        skipHeaderCheck,
        skipColumnMapping,
        requiredColumnMappings,
        usedColumnHashmap,
    }
}

export const getDefaultClassBasedMetrics = () => {
    return [
        {
            Name: 'TruePositive',
            DisplayName: 'True Positive (TP)',
            DataType: 'int',
            Description:
                'The number of instances that are actually positive and are correctly predicted as positive by the model.',
        },
        {
            Name: 'FalsePositive',
            DisplayName: 'False Positive (FP)',
            DataType: 'int',
            Description:
                'The number of instances that are actually negative but are incorrectly predicted as positive by the model.',
        },
        {
            Name: 'TrueNegative',
            DisplayName: 'True Negative (TN)',
            DataType: 'int',
            Description:
                'The number of instances that are actually negative and are correctly predicted as negative by the model.',
        },
        {
            Name: 'FalseNegative',
            DisplayName: 'False Negative (FN)',
            DataType: 'int',
            Description:
                'The number of instances that are actually positive but are incorrectly predicted as negative by the model.',
        },
        {
            Name: 'TrueNegativeRate',
            DisplayName: 'True Negative Rate (TNR)',
            DataType: 'float',
            Description:
                'The true negative rate (also called specificity), which is the probability that an actual negative will test negative. It is calculated as TN/TN+FP.',
        },
        {
            Name: 'FalsePositiveRate',
            DisplayName: 'False Positive Rate (FPR)',
            DataType: 'float',
            Description:
                'The false positive rate is calculated as the ratio between the number of negative events wrongly categorized as positive (false positives) and the total number of actual negative events (regardless of classification).',
        },
        {
            Name: 'Precision',
            DisplayName: 'Precision',
            DataType: 'float',
            Description:
                "Precision is the ratio of true positives to the total number of predicted positives (true positives plus false positives). Precision gives an indication of how many of the predicted positive instances are actually positive. It is a measure of the model's accuracy when it predicts positive outcomes.",
        },
        {
            Name: 'Recall',
            DisplayName: 'Recall',
            DataType: 'float',
            Description:
                "Recall is the ratio of true positives to the total number of actual positives (true positives plus false negatives). Recall measures the ability of the model to capture all the positive instances. It's a measure of the model's sensitivity to positive instances.",
        },
        {
            Name: 'F1score',
            DisplayName: 'F1Score',
            DataType: 'float',
            Description:
                'The F1 score is the harmonic mean of precision and recall. It provides a balance between precision and recall.',
        },
        {
            Name: 'Accuracy',
            DisplayName: 'Accuracy',
            DataType: 'float',
            Description:
                'Accuracy is the ratio of correct predictions out of all predictions made by an algorithm. It can be calculated by dividing precision by recall or as 1 minus false negative rate (FNR) divided by false positive rate (FPR).',
        },
    ]
}

export const formatDate = (date) => {
    let dd = date.getDate()
    let mm = date.getMonth() + 1
    let yyyy = date.getFullYear()
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    date = yyyy + '-' + mm + '-' + dd
    return date
}

export const getPreviousNthDate = (nthDay) => {
    let d = new Date()
    d.setDate(d.getDate() - nthDay)
    let date = formatDate(d)
    console.log('formatted date: ', date)
    return date
}

export const getDisplayDateInfoFromDatePicker = (inputDate) => {
    console.log('getDisplayDateInfoFromDatePicker: ', inputDate)
    let dateValue = ''
    let displayValue = ''
    if (inputDate) {
        dateValue = inputDate.format('YYYY-MM-DD')
        displayValue = inputDate.format('MMM DD, YYYY')
    }
    return {
        dateValue,
        displayValue,
    }
}

export const getActualModelName = (inputModelName) => {
    let outputModelName = ''
    if (inputModelName) {
        outputModelName = inputModelName
        let splitArr = inputModelName.split('_')
        if (splitArr.length > 2) {
            let lastValue = splitArr[splitArr.length - 1]
            let secondLast = splitArr[splitArr.length - 2]
            if (
                lastValue.includes('V') &&
                secondLast.includes('-') &&
                secondLast.split('-').length === 3
            ) {
                // version and date is included
                outputModelName = splitArr[0]
                for (let index = 1; index < splitArr.length - 2; index++) {
                    outputModelName += '_' + splitArr[index]
                }
            }
        }
    }
    console.log(
        '#output model name: ',
        outputModelName,
        ' ==> from : ',
        inputModelName
    )
    return outputModelName
}

export const openUrl = (urlLink) => {
    window.open(urlLink, '_blank')
}

export const foundSearchValue = (inputName, searchValue) => {
    let inputNameLower = inputName.toLowerCase()
    let searchValueLower = searchValue.toLowerCase()
    let found = false
    if (inputNameLower.includes(searchValueLower)) {
        found = true
    }
    return found
}

export const checkLightOrDark = (color) => {
    // Variables for red, green, blue values
    let r, g, b, hsp

    // Check the format of the color, HEX or RGB?
    if (isValidData(color)) {
        if (color.match(/^rgb/)) {
            // If RGB --> store the red, green, blue values in separate variables
            color = color.match(
                /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
            )
            r = color[1]
            g = color[2]
            b = color[3]
        } else {
            color = +(
                '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
            )
            r = color >> 16
            g = (color >> 8) & 255
            b = color & 255
        }

        hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 127.5) {
            return 'light'
        } else {
            return 'dark'
        }
    } else {
        return 'dark'
    }
}

export const getTextColor = (color) => {
    let colorType = checkLightOrDark(color)
    if (colorType === 'light') {
        // return "var(--primary-color)"
        return '#000000'
    } else {
        return '#FFFFFF'
    }
}

export const prepareBooleanAndSqlQueryInfo = (inputQuery) => {
    console.log('prepare query info: ', inputQuery)
    // SELECT , FROM , WHERE, JOIN, AND , OR
    // ON
    let startKeywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'AND', 'OR']
    let innerKeywords = ['ON']

    let sqlQueryInfo = []
    let booleanQueryInfo = []
    let startCondition = false
    if (inputQuery) {
        let spaceSplitArr = inputQuery.split(' ')
        let clauseName = ''
        let clauseList = []
        let eachClauseValue = ''
        spaceSplitArr.map((eachWord, index) => {
            if (startKeywords.includes(eachWord)) {
                if (
                    clauseName !== '' &&
                    (clauseList.length > 0 || eachClauseValue !== '')
                ) {
                    if (eachClauseValue !== '') {
                        clauseList.push({
                            Type: 'Text',
                            Value: eachClauseValue,
                        })
                    }
                    sqlQueryInfo.push({
                        ClauseName: clauseName,
                        Clause: clauseList,
                    })

                    if (startCondition === true) {
                        let boolClause = ''
                        clauseList.map((eachInfo, infoIndex) => {
                            if (infoIndex === 0) {
                                boolClause = eachInfo.Value
                            } else {
                                boolClause += ' ' + eachInfo.Value
                            }
                        })
                        booleanQueryInfo.push({
                            ClauseName:
                                booleanQueryInfo.length === 0 ? '' : clauseName,
                            ClauseValue: boolClause,
                        })
                    }

                    clauseName = ''
                    clauseList = []
                    eachClauseValue = ''
                }
                // start row case
                clauseName = eachWord

                if (eachWord === 'WHERE' || eachWord === 'JOIN') {
                    startCondition = true
                }
            } else {
                // skip the word
                // check if the keyword is inner keyword or not
                if (clauseName !== '') {
                    if (innerKeywords.includes(eachWord)) {
                        if (eachClauseValue !== '') {
                            clauseList.push({
                                Type: 'Text',
                                Value: eachClauseValue,
                            })
                            eachClauseValue = ''
                        }
                        clauseList.push({
                            Type: 'ClauseName',
                            Value: eachWord,
                        })
                    } else {
                        if (eachClauseValue === '') {
                            eachClauseValue = eachWord
                        } else {
                            eachClauseValue += ' ' + eachWord
                        }
                    }
                } else {
                    // clause empty case
                    console.log('empty clause case, so skip word: ', eachWord)
                }
            }
            if (index === spaceSplitArr.length - 1) {
                // last index case
                if (
                    clauseName !== '' &&
                    (clauseList.length > 0 || eachClauseValue !== '')
                ) {
                    if (eachClauseValue !== '') {
                        clauseList.push({
                            Type: 'Text',
                            Value: eachClauseValue,
                        })
                    }
                    sqlQueryInfo.push({
                        ClauseName: clauseName,
                        Clause: clauseList,
                    })

                    // for boolean query
                    if (startCondition === true) {
                        let boolClause = ''
                        clauseList.map((eachInfo, infoIndex) => {
                            if (infoIndex === 0) {
                                boolClause = eachInfo.Value
                            } else {
                                boolClause += ' ' + eachInfo.Value
                            }
                        })
                        booleanQueryInfo.push({
                            ClauseName:
                                booleanQueryInfo.length === 0 ? '' : clauseName,
                            ClauseValue: boolClause,
                        })
                    }

                    // empty data
                    clauseName = ''
                    clauseList = []
                }
            }
        })
    }

    return {
        sqlQueryInfo,
        booleanQueryInfo,
    }
}

export const getDescriptionForModuleName = (inputModuleName) => {
    const descriptionHashmap = {
        Agreement:
            'Legal contracts or agreements related to intellectual property, such as licensing agreements, assignment agreements, or nondisclosure agreements.',
        Billing:
            'Financial transactions related to intellectual property services, such as billing clients for legal services related to IP matters or paying fees for filing patents or trademarks.',
        Brand: 'The identity or image of a product, service, or organization, including trademarks, logos, slogans, and other elements used to differentiate it from competitors',
        Contact:
            'Individuals or entities with whom an organization interacts regarding intellectual property matters, such as clients, inventors, attorneys, or representatives from government agencies.',
        Conflict:
            'Individuals or entities with whom an organization interacts regarding intellectual property matters, such as clients, inventors, attorneys, or representatives from government agencies.Disputes or conflicts that may arise regarding intellectual property rights, such as infringement claims, opposition proceedings, or disputes over ownership of IP assets.',
        Design: 'The visual appearance or ornamental aspects of a product, including shape, configuration, pattern, or ornamentation, eligible for design protection',
        'Design Application':
            'A formal request submitted to a patent office to seek protection for a design, typically in the form of a design patent or registration.',
        Invention:
            'A new and useful process, machine, composition of matter, or improvement thereof, eligible for patent protection.',
    }
    let descriptionValue = ''
    if (descriptionHashmap[inputModuleName] !== undefined) {
        descriptionValue = descriptionHashmap[inputModuleName]
    }
    return descriptionValue
}

export const getModulesForNestedFilterConditions = (
    moduleNames,
    filterConditions
) => {
    filterConditions.map((eachCondition) => {
        if (eachCondition.Type === 'field') {
            if (eachCondition.FilterValueInfo.ModuleName) {
                if (
                    !moduleNames.includes(
                        eachCondition.FilterValueInfo.ModuleName
                    )
                ) {
                    moduleNames.push(eachCondition.FilterValueInfo.ModuleName)
                }
            }
        } else {
            if (eachCondition.NestedFilterConditions) {
                moduleNames = getModulesForNestedFilterConditions(
                    moduleNames,
                    eachCondition.NestedFilterConditions
                )
            }
        }
    })
    return moduleNames
}

export const getSameValuePatents = () => {
    let allRows = [
        {
            DocumentNo: 'US10409988B2',
            Actual: 'a065Y00001vvjfk',
            Predict: 'a065Y00001vvjfk',
        },
    ]
    let newRows = []
    let documentMap = {}
    allRows.map((eachRow) => {
        if (eachRow.Actual === eachRow.Predict) {
            newRows.push({
                DocumentNo: eachRow.DocumentNo,
                Actual: eachRow.Actual,
                Predict: eachRow.Predict,
            })
            documentMap[eachRow.DocumentNo] = true
        }
    })
    // console.log("all patents rows ", allRows.length)
    // console.log("same patents rows: ", newRows.length, " => ", newRows)
    return newRows
}

export const getNotIncludePatents = (inputSamePatents) => {
    let allPredictRows = [
        {
            DocumentNo: 'DE102022108867A1',
            Actual: 'a065Y000023bc9c',
            Predict: 'a065Y000023bc9c',
        },
    ]
    let foundHashmap = {}
    allPredictRows.map((eachRow) => {
        foundHashmap[eachRow.DocumentNo] = true
    })
    // console.log("all fixed Rows: ", allPredictRows.length)
    // console.log("fix hashmap: ", foundHashmap)

    let notIncludeRows = []
    inputSamePatents.map((eachRow) => {
        if (foundHashmap[eachRow.DocumentNo] === undefined) {
            notIncludeRows.push(eachRow)
        }
    })
    return notIncludeRows
}

export const getDefaultDraftOutlineList = () => {
    return [
        {
            Name: 'Title',
            Key: 'Title',
        },
        {
            Name: 'Abstract',
            Key: 'Abstract',
        },
        {
            Name: 'Description',
            Key: 'Description',
            isExpand: true,
            Children: [
                {
                    Name: 'Technical Field',
                    Key: 'TechnicalField',
                },
                {
                    Name: 'Background',
                    Key: 'Background',
                },
                {
                    Name: 'Disclosure of the Invention',
                    Key: 'InventionDisclosure',
                },
                {
                    Name: 'Novelty Statement',
                    Key: 'NoveltyStatement',
                },
                {
                    Name: 'Summary',
                    Key: 'Summary',
                },
            ],
        },
        {
            Name: 'Claims',
            Key: 'Claims',
        },
        {
            Name: 'Citations',
            Key: 'Citations',
        },
    ]
}

export const prepareDraftSectionOutlines = (draftSections) => {
    let outlineList = getDefaultDraftOutlineList()
    let newOutlineList = []
    outlineList.map((eachOutline) => {
        let outlineKey = eachOutline.Key
        if (eachOutline.Children) {
            let foundChildList = []
            eachOutline.Children.map((eachChild) => {
                if (draftSections.includes(eachChild.Key)) {
                    foundChildList.push(eachChild)
                }
            })
            if (foundChildList.length > 0) {
                newOutlineList.push({
                    Name: eachOutline.Name,
                    Key: eachOutline.Key,
                    Children: foundChildList,
                    isExpand: eachOutline.isExpand,
                })
            } else {
                if (draftSections.includes(outlineKey)) {
                    newOutlineList.push({
                        Name: eachOutline.Name,
                        Key: eachOutline.Key,
                        Children: [],
                        isExpand: eachOutline.isExpand,
                    })
                }
            }
        } else {
            if (draftSections.includes(outlineKey)) {
                newOutlineList.push(eachOutline)
            }
        }
    })
    console.log('#drafted outline list: ', newOutlineList)
    return newOutlineList
}

export const prepareRemainingDraftSections = (draftSections) => {
    let outlineList = getDefaultDraftOutlineList()
    let newOutlineList = []
    outlineList.map((eachOutline) => {
        let outlineKey = eachOutline.Key
        if (eachOutline.Children) {
            let foundChildList = []
            eachOutline.Children.map((eachChild) => {
                if (!draftSections.includes(eachChild.Key)) {
                    foundChildList.push(eachChild)
                }
            })
            if (foundChildList.length > 0) {
                newOutlineList.push({
                    Name: eachOutline.Name,
                    Key: eachOutline.Key,
                    Children: foundChildList,
                })
            } else {
                if (!draftSections.includes(outlineKey)) {
                    newOutlineList.push({
                        Name: eachOutline.Name,
                        Key: eachOutline.Key,
                        Children: [],
                    })
                }
            }
        } else {
            if (!draftSections.includes(outlineKey)) {
                newOutlineList.push(eachOutline)
            }
        }
    })
    console.log('#remaining outline list: ', newOutlineList)
    return newOutlineList
}

export const getDisplayStatus = (inputStatus) => {
    const statusMap = {
        to_be_filed: 'To Be Filed',
        filed: 'Filed',
        not_filed: 'Not Filed',
        granted: 'Granted',
    }
    let displayStatus = ''
    if (isValidData(statusMap[inputStatus])) {
        displayStatus = statusMap[inputStatus]
    }
    return displayStatus
}

export const changeAndUpdateSectionSelection = (
    sectionList,
    keyword,
    value
) => {
    let selectedCount = 0
    sectionList.map((eachSection) => {
        eachSection[keyword] = value
        if (hasDataList(eachSection.Children)) {
            eachSection.Children.map((eachInfo) => {
                eachInfo[keyword] = value
                if (value === true) {
                    selectedCount++
                }
            })
            if (value === true) {
                selectedCount++
            }
        } else {
            if (value === true) {
                selectedCount++
            }
        }
    })
    return {
        sectionList,
        selectedCount,
    }
}

export const getSelectedDraftedSections = (inventionSectionList) => {
    let sections = []
    inventionSectionList.map((eachInfo) => {
        if (hasDataList(eachInfo.Children)) {
            eachInfo.Children.map((eachChild) => {
                if (eachChild.isSelected === true) {
                    if (eachChild.Value) {
                        sections.push(eachChild.Value)
                    } else {
                        sections.push(eachChild.Key)
                    }
                }
            })
            if (eachInfo.isSelected === true) {
                if (eachInfo.Value) {
                    sections.push(eachInfo.Value)
                } else {
                    sections.push(eachInfo.Key)
                }
            }
        } else {
            if (eachInfo.isSelected === true) {
                if (eachInfo.Value) {
                    sections.push(eachInfo.Value)
                } else {
                    sections.push(eachInfo.Key)
                }
            }
        }
    })
    console.log('#returned sections: ', sections)
    return sections
}

export const concatInventionData = (invention) => {
    let textData = ''
    if (invention.InventionDescription) {
        textData = invention.InventionDescription
    }
    if (invention.ProblemSolved) {
        textData += '\n' + invention.ProblemSolved
    }
    if (invention.NoveltyAndNonObviousness) {
        textData += '\n' + invention.NoveltyAndNonObviousness
    }
    if (invention.PriorArts) {
        textData += '\n' + invention.PriorArts
    }
    if (invention.CommercializationPotential) {
        textData += '\n' + invention.CommercializationPotential
    }
    return textData
}

export const getLastIndexByGivenName = (
    itemList,
    filedName,
    defaultVariableName
) => {
    let lastIndex = 0
    itemList.map((eachItem) => {
        let splitArr = []
        if (isValidData(filedName)) {
            if (isValidData(eachItem[filedName])) {
                splitArr = eachItem[filedName].split(defaultVariableName)
            }
        } else {
            if (isValidData(eachItem)) {
                splitArr = eachItem.split(defaultVariableName)
            }
        }

        if (splitArr.length === 2 && splitArr[0] === '') {
            let variableIndexStr = splitArr[1]
            if (!variableIndexStr.includes('.')) {
                if (
                    Number.parseInt(variableIndexStr).toString() ===
                    variableIndexStr
                ) {
                    let currentIndex = parseInt(variableIndexStr)
                    if (currentIndex > lastIndex) {
                        lastIndex = currentIndex
                    }
                }
            }
        }
    })
    return lastIndex
}

export const checkClaimTitle = (value) => {
    let isTitle = false
    if (isValidData(value)) {
        let valueLower = value.toLowerCase()
        if (
            valueLower.includes('independent claim') ||
            valueLower.includes('dependent claim')
        ) {
            isTitle = true
        }
    }
    return isTitle
}

const splitDataArrBySubStr = (textArr, subStr) => {
    // console.log("input text arr => ", textArr)
    // console.log("input sub str => ", subStr)
    let splitDataArr = []
    textArr.map((eachText) => {
        if (eachText.includes(subStr)) {
            let splitArr = eachText.split(subStr)
            if (splitArr.length === 2) {
                if (splitArr[0] === '') {
                    splitDataArr = splitDataArr.concat(subStr)
                    splitDataArr = splitDataArr.concat(splitArr[1])
                } else if (splitArr[1] === '') {
                    splitDataArr = splitDataArr.concat(splitArr[0])
                    splitDataArr = splitDataArr.concat(subStr)
                } else {
                    splitDataArr = splitDataArr.concat(splitArr[0])
                    splitDataArr = splitDataArr.concat(subStr)
                    splitDataArr = splitDataArr.concat(splitArr[1])
                }
            } else {
                splitArr.map((eachSplitStr, index) => {
                    if (splitArr[0] === '') {
                        //first one is empty
                        if (eachSplitStr !== '') {
                            if (index !== 0) {
                                splitDataArr = splitDataArr.concat(subStr)
                            }
                            splitDataArr = splitDataArr.concat(eachSplitStr)
                        }
                    } else if (splitArr[splitArr.length - 1] === '') {
                        if (eachSplitStr !== '') {
                            splitDataArr = splitDataArr.concat(eachSplitStr)
                            if (index !== splitArr.length - 1) {
                                splitDataArr = splitDataArr.concat(subStr)
                            }
                        }
                    } else {
                        if (eachSplitStr !== '') {
                            splitDataArr = splitDataArr.concat(eachSplitStr)
                            if (index !== splitArr.length - 1) {
                                splitDataArr = splitDataArr.concat(subStr)
                            }
                        }
                    }
                })
            }
        } else {
            splitDataArr = splitDataArr.concat(eachText)
            // console.log("not include case")
        }
    })
    return splitDataArr
}

export const convertSentimentDataToStrArr = (textInput, sentimentTextArr) => {
    let convertedStrArr = [textInput]
    sentimentTextArr.map((eachText) => {
        convertedStrArr = splitDataArrBySubStr(
            JSON.parse(JSON.stringify(convertedStrArr)),
            eachText
        )
    })
    return convertedStrArr
}

export const getDefaultColor = () => {
    let colorList = [
        'rgba(183,236,6,0.8)',
        '#F8A690',
        '#7C6FEE',
        '#76A1D5',
        '#4BCEBC',
        '#eb4039',
        '#eb8f39',
        '#d6eb39',
        '#34eba9',
        '#5a356b',
        '#349fe9',
        '#9342f9',
        '#66664D',
        '#a8328b',
        '#4632a8',
        '#FF99E6',
    ]
}

export const getDefaultUserTypes = () => {
    return [
        {
            Name: 'inventor',
            DisplayName: 'Inventor',
        },
        {
            Name: 'r&d_manager',
            DisplayName: 'R&D Manager',
        },
        {
            Name: 'attorney',
            DisplayName: 'Attorney',
        },
        {
            Name: 'decision_maker',
            DisplayName: 'Other Decision Makers',
        },
        // {
        //     Name: "",
        //     DisplayName: "",
        // },
    ]
}

export const getParseData = (inputData) => {
    return JSON.parse(JSON.stringify(inputData))
}

export const getMenuIconClass = (icon, disabled) => {
    let negativeIconList = ['delete', 'remove', 'close']
    return disabled
        ? 'menu-button disabled'
        : negativeIconList.includes(icon.toLowerCase())
          ? 'menu-button delete-btn'
          : 'menu-button'
}

export const getSeparatedModelNameAndVersion = (inputModelName) => {
    //modelName
    let modelName
    let version
    //Semiconductor_2023-11-29_V1
    let splitArr = inputModelName.split('_')
    if (splitArr[splitArr.length - 1].includes('-')) {
        version = splitArr[splitArr.length - 1]
        modelName = inputModelName.split('_' + version)[0]
    } else {
        version = splitArr[splitArr.length - 2]
        modelName = inputModelName.split('_' + version)[0]
    }

    return {
        modelName,
        version,
    }
}

export const getOperatorSpecificInfo = (operatorDisplayName) => {
    const operatorInfoHashmap = {
        Equals: {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Does Not Equal': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Greater than': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Less than': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Greater than or Equals': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Less than or Equals': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        Between: {
            ValidInputCount: 2,
            InputType: '', // for required case
        },
        'Begins With': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        Contains: {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Does Not Contain': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        Today: {
            ValidInputCount: 0,
            InputType: '', // for required case
        },
        Yesterday: {
            ValidInputCount: 0,
            InputType: '', // for required case
        },
        'Is Blank': {
            ValidInputCount: 0,
            InputType: '', // for required case
        },
        'Is Not Blank': {
            //TODO to confirm with backend, how to pass to backend (as operator or as value))
            ValidInputCount: 0,
            InputType: '', // for required case
        },
        Yes: {
            ValidInputCount: 0,
            InputType: '', // for required case
        },
        No: {
            ValidInputCount: 0,
            InputType: '', // for required case
        },
        'In List': {
            ValidInputCount: -1,
            InputType: '', // for required case
        },
        'On or Before': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'On or After': {
            ValidInputCount: 1,
            InputType: '', // for required case
        },
        'Last (N) Days': {
            ValidInputCount: 1,
            InputType: 'number', // for required case
        },
        YTD: {
            ValidInputCount: 1,
            InputType: 'number', // for required case
        },
        'Any of These': {
            ValidInputCount: -1,
            InputType: '', // for required case
        },
        'All of These': {
            ValidInputCount: -1,
            InputType: '', // for required case
        },
        'None of Any of These': {
            ValidInputCount: -1,
            InputType: '', // for required case
        },
        'None of All of These': {
            ValidInputCount: -1,
            InputType: '', // for required case
        },
    }
    let info = {
        ValidInputCount: 1,
        InputType: '', // for required case
    }
    if (operatorInfoHashmap[operatorDisplayName]) {
        info = operatorInfoHashmap[operatorDisplayName]
    }
    return info
}
