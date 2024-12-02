import React, { useState, useEffect, useRef } from 'react'
import './StyleSheet.css'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { FTOFeatureListHeader } from './TableProps'
import { FTOFeatureData } from './DefaultProps'
import PropTypes from 'prop-types'
import { SimpleToggle } from '../../../CommonComponents/SimpleToggle/SimpleToggle'
import {
    getMenuIconClass,
    getSerialRowNumber,
    isValidData,
} from '../CommonMethods'
import Icon from '../../../../IconLibrary/Icon'
import DuoIcon from '../../../../IconLibrary/DuoIcon'
import MyCheckbox from '../../../CommonComponents/BasicComponents/Checkbox/MyCheckbox'
import {
    AssigneeList,
    ComparisonInputs,
    CPCList,
    FamilyApplicantList,
    InfringedFeatureList,
    LegalStatus,
    PatentInfoWithCondition,
    PatentList,
    RelevantPatentInfo,
    SimilarityScore,
    SimpleList,
    PatentLink,
    ClassList,
    BooleanList,
} from './CustomTableCell'

const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
}

const MyTable = (props) => {
    const tableContainerRef = useRef()
    const [state, setState] = useState({
        columnDefs: [],
        rowData: [],
        defaultColDef: {
            flex: 1,
            wrapText: true,
            autoHeight: true,
            maxHeight: 40,
            pinned: 'right',
            enableRenameColumns: true,
        },
        tableHeight: 0,
        heightType: '',
    })

    const prepareData = (
        Headers,
        actionList = [],
        onAction,
        onChange,
        onViewDetails,
        selectAllInfo = {},
        pendingLoading,
        pendingHeaders
    ) => {
        let headerArr = []
        for (let i = 0; i < Headers.length; i++) {
            let dataLoading = false
            if (
                pendingLoading === true &&
                pendingHeaders.includes(Headers[i].Key)
            ) {
                dataLoading = true
            }
            let DesignProps = Headers[i].Design
            let newHeaderInfo = {
                headerName: Headers[i].DisplayName,
                field: Headers[i].Key,
                sortable: Headers[i].Type === 'text',
                filter: Headers[i].Type === 'text' ? 'agSetColumnFilter' : '',
                pinned: DesignProps.Pinned,
                lockPinned: DesignProps.LockPinned,
                flex: DesignProps.Flex,
                minWidth: DesignProps.MinWidth,
                maxWidth:
                    DesignProps.MaxWidth === 'auto'
                        ? 1200
                        : DesignProps.MaxWidth,
                wrapText: true,
                resizable: DesignProps.Resizable,
                cellEditor: 'agCheckboxCellEditor',
                checkboxSelection: DesignProps.Selectable,
                showDisabledCheckboxes: true,
                enableSorting: Headers[i].Type === 'text',
                cellRenderer:
                    // Headers[i].Type === "checkbox" ? "agCheckboxCellRenderer" :
                    dataLoading === true
                        ? AnyGenLoadingCell
                        : Headers[i].Type === 'checkbox'
                          ? CheckboxCell
                          : Headers[i].Type === 'action'
                            ? ActionCell
                            : Headers[i].Type === 'toggle'
                              ? ToggleButtonCell
                              : Headers[i].Type === 'text'
                                ? AnyGenTableCell
                                : Headers[i].Type === 'number'
                                  ? AnyGenTableNumberCell
                                  : Headers[i].Type === 'custom'
                                    ? (params) =>
                                          AnyGenTableCustomCell(
                                              params,
                                              onViewDetails
                                          )
                                    : StatusCell,
                cellRendererParams: {
                    maxCellHeight: props.maxCellHeight,
                    onAction:
                        Headers[i].Type === 'checkbox' ? onChange : onAction,
                    actionList: actionList,
                    customCell: DesignProps.CustomCellDesign,
                    checkbox: DesignProps.Selectable,
                    parentFunction: isValidData(DesignProps.ParentFunctionName)
                        ? props[DesignProps.ParentFunctionName]
                        : () => {},
                },
                // headerComponent: Headers[i].Key === "checkbox"?CheckboxCell:AnyGenHeaderCell,
            }
            if (Headers[i].Type === 'checkbox') {
                newHeaderInfo.headerComponent = HeaderCheckboxCell
                newHeaderInfo.headerComponentParams = selectAllInfo
            } else if (Headers[i].Key === 'no') {
                let pageNumber = 1
                let pageSize = props.Data.length
                newHeaderInfo.valueGetter = (params) => {
                    if (isValidData(pageNumber) && isValidData(pageSize)) {
                        return getSerialRowNumber(
                            pageNumber,
                            pageSize,
                            params.node.rowIndex
                        )
                    } else {
                        return params.node.rowIndex + 1
                    }
                }
            }
            headerArr.push(newHeaderInfo)
        }
        setState((prev) => ({
            ...prev,
            columnDefs: headerArr,
        }))
    }

    const prepareTableHeight = () => {
        let { cellHeight } = props
        let tableContainerHeight = tableContainerRef.current.clientHeight
        let heightType
        let tableRowHeight = cellHeight
        let tableHeaderHeight = 50
        let minHeight = 400
        let dataHeight = props.Data.length * tableRowHeight + tableHeaderHeight

        if (dataHeight < minHeight) {
            heightType = 'manualHeight'
            setState((prev) => ({
                ...prev,
                tableHeight: dataHeight,
                heightType,
            }))
        } else {
            heightType = 'fixedHeight'
            setState((prev) => ({
                ...prev,
                tableHeight:
                    tableContainerHeight > 0 ? tableContainerHeight : 400,
                heightType,
            }))
        }
    }

    useEffect(() => {
        const {
            Headers,
            actionList,
            onAction,
            onChange,
            onViewDetails,
            selectAllInfo = {},
            pendingLoading = false,
            pendingHeaders = [],
        } = props

        prepareData(
            Headers,
            actionList,
            onAction,
            onChange,
            onViewDetails,
            selectAllInfo,
            pendingLoading,
            pendingHeaders
        )
        prepareTableHeight()
    }, [props])

    const { autoHeight } = state
    const { noShadow } = props

    return (
        <div
            className={
                noShadow
                    ? 'default-table-container no-shadow'
                    : 'default-table-container'
            }
            ref={tableContainerRef}
        >
            <div
                className="ag-theme-quartz"
                style={{
                    width: '100%',
                    height: state.tableHeight,
                }}
            >
                <AgGridReact
                    suppressRowClickSelection={false}
                    suppressCellFocus={true}
                    domLayout={autoHeight ? 'autoHeight' : 'normal'}
                    defaultColDef={state.defaultColDef}
                    columnDefs={state.columnDefs}
                    rowClass={'my-table-row'}
                    autoSizeStrategy={autoSizeStrategy}
                    rowSelection={'multiple'}
                    rowData={props.Data}
                />
            </div>
        </div>
    )
}

const AnyGenTableCell = (params) => {
    let textValue = params.value
    if (!textValue) {
        if (params.colDef['field'] === 'Abstract') {
            textValue = params.data['Snippet']
        } else {
            textValue = '-'
        }
    }

    return (
        <div className="table-value-container">
            <div
                className="table-cell-value-col"
                style={{
                    maxHeight: params.maxCellHeight,
                    padding: params.checkbox ? '5px 15px 5px 10px' : '5px 15px',
                }}
            >
                {textValue}
            </div>
        </div>
    )
}
const AnyGenTableNumberCell = (params) => {
    return (
        <div className="table-value-container">
            <div
                className="table-cell-value-col number-col"
                style={{
                    maxHeight: params.maxCellHeight,
                    padding: params.checkbox ? '5px 15px 5px 10px' : '5px 15px',
                }}
            >
                {params.value}
            </div>
        </div>
    )
}

const AnyGenLoadingCell = () => {
    return (
        <div className="table-loading-cell">
            <div className="table-loading-container">
                <div className="table-loading" />
            </div>
        </div>
    )
}

const AnyGenTableCustomCell = (params) => {
    // console.log("At Fun ",params.customCell, ", ", typeof params.parentFunction, ", ", params.parentFunction)
    return (
        <div className="table-value-container">
            <div
                className="table-cell-value-col"
                style={{
                    maxHeight: params.maxCellHeight,
                    padding: params.checkbox ? '5px 15px 5px 10px' : '5px 15px',
                }}
            >
                {params.customCell === 'Simple List'
                    ? SimpleList(params.value)
                    : params.customCell === 'Family Applicants' ||
                        params.customCell === 'Family Inventors'
                      ? FamilyApplicantList(params.value)
                      : params.customCell === 'Comparison History'
                        ? ComparisonInputs(params.value)
                        : params.customCell === 'Patent List'
                          ? PatentList(params.value)
                          : params.customCell === 'CPC List'
                            ? CPCList(params.value)
                            : params.customCell === 'Assignee List'
                              ? AssigneeList(params.value)
                              : params.customCell === 'Legal Status'
                                ? LegalStatus(params.value)
                                : params.customCell === 'Similarity Score'
                                  ? SimilarityScore(params.value)
                                  : params.customCell ===
                                      'Infringed Feature List'
                                    ? InfringedFeatureList(params.value)
                                    : params.customCell ===
                                        'Relevant Patent Info'
                                      ? RelevantPatentInfo(params.value)
                                      : params.customCell ===
                                          'Patent Info With condition'
                                        ? PatentInfoWithCondition(params.value)
                                        : params.customCell === 'Patent Link'
                                          ? PatentLink(params.value)
                                          : params.customCell === 'Class List'
                                            ? ClassList(params.value)
                                            : params.customCell ===
                                                'Boolean List'
                                              ? BooleanList(params.value)
                                              : params.customCell ===
                                                  'parent function'
                                                ? params.parentFunction(params)
                                                : null}
            </div>
        </div>
    )
}

const HeaderCheckboxCell = (params) => {
    return (
        <div className="table-value-container">
            <div className="table-cell-value-col header-checkbox-col">
                <MyCheckbox
                    onChange={params.onAction}
                    disabled={params.disabled}
                    checked={params.checked}
                    className={'my-table-checkbox'}
                />
            </div>
        </div>
    )
}

const CheckboxCell = (params) => {
    let isSelected = params.data['isSelected'] === true
    return (
        <div className="table-value-container">
            <div className="table-cell-value-col checkbox-col">
                <MyCheckbox
                    onChange={() =>
                        params.onAction(params.rowIndex, params.data)
                    }
                    checked={isSelected}
                    className={'my-table-checkbox'}
                />
            </div>
        </div>
    )
}

const ToggleButtonCell = (params) => {
    return (
        <div className="table-value-container">
            <div
                className="table-cell-value-col center-col"
                style={{ maxHeight: params.maxCellHeight }}
            >
                <SimpleToggle />
            </div>
        </div>
    )
}

const ActionCell = (params) => {
    return (
        <div className="table-value-container">
            <div className="action-cell">
                <div className="action-cell-list">
                    {params.actionList.map((actionInfo, aid) => (
                        <button
                            key={aid}
                            className={getMenuIconClass(
                                actionInfo.Icon.Name,
                                false
                            )}
                            onClick={params.onAction}
                        >
                            {actionInfo.Icon.IconType === 'Single' ? (
                                <Icon
                                    icon={actionInfo.Icon.Name}
                                    size={14}
                                    title={actionInfo.Name}
                                    fillRule={'evenodd'}
                                />
                            ) : (
                                <DuoIcon
                                    name={actionInfo.Icon.Name}
                                    size={14}
                                    title={actionInfo.Name}
                                    fillRule={'evenodd'}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const StatusCell = () => {
    return <div className="model-status-type">In progress</div>
}

MyTable.defaultProps = {
    Headers: FTOFeatureListHeader,
    Data: FTOFeatureData,
    autoHeight: false,
    maxCellHeight: 200, // cell inner content's maximum scroll
    cellHeight: 50, // cell height for calculating table height >> Normally should be bigger than maxCellHeight + 21
    noShadow: false,
    viewPatentInfo: false,
    showIDTooltip: true,
    tableHeight: '100%',
}
MyTable.propTypes = {
    Headers: PropTypes.array.isRequired,
    Data: PropTypes.array.isRequired,
    autoHeight: PropTypes.bool,
    maxCellHeight: PropTypes.number,
    cellHeight: PropTypes.number,
    noShadow: PropTypes.bool,
    viewPatentInfo: PropTypes.bool,
    showIDTooltip: PropTypes.bool,
    tableHeight: PropTypes.string,
    actionList: PropTypes.array,
    onAction: PropTypes.func,
}

export default MyTable
