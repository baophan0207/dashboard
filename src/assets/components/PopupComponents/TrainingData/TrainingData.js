import React, { Component } from 'react'

import Pagination from '../../CommonComponents/BasicComponents/PaginationV1/Pagination'

import MyTable from '../BasicComponents/PopupTable/MyTable'
import SearchBox from '../BasicComponents/SearchBox/SearchBox'
import { Headers } from './TableProps'
import { Data } from './DefaultProps'
import './TrainingData.css'
import MyCheckDrop from '../BasicComponents/DropDown/MyCheckDrop'
import TypeBasedSort from '../BasicComponents/SearchComponent/TypeBasedSort'
import { DataFileUpload } from '../DataUploadSidebar/Data'
import DataUploadSidebar from '../DataUploadSidebar/DataUploadSidebar'

class TrainingData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            header: [],
            data: [],
            perPage: 5,
            totalPage: 0,
            currentPage: 1,
            dataPerPage: [],
            dropDownList: [],
            searchValue: '',
            filteredData: Data,
            typingTimeOut: 0,
            selectAllItems: true,
            sortBy: {},
            sortOrder: 'asc',
            sortType: 'asc',
            dataFileUpload: [],
            selectedDataFileUpload: {},
        }
    }

    componentDidMount() {
        let dropDownList = []
        for (let i = 0; i < Headers.length; i++) {
            const { DisplayName, Key, Visible, ...item } = { ...Headers[i] }
            dropDownList.push({
                Name: DisplayName,
                MenuName: Key,
                isSelected: true,
                Visible: Visible === 'always' ? Visible : 'none',
            })
        }
        this.setState({
            header: Headers,
            data: Data,
            totalPage: Math.ceil(Data.length / this.state.perPage),
            dataPerPage: Data.slice(0, this.state.perPage),
            dropDownViewValue: this.state.dropDownList[0],
            dropDownFilterList: dropDownList,
            dropDownFilterValue: dropDownList[0],
            dropDownList,
            sortOrder: 'asc',
            sortBy: dropDownList[0],
            dataFileUpload: DataFileUpload,
            selectedDataFileUpload: DataFileUpload[0],
        })
    }

    // handleDropDownViewChange = (value) => {
    //     this.setState({ dropDownViewValue: value })
    // }
    //
    // handleDropDownFilterChange = (value) => {
    //     const filteredData = this.state.filteredData?.sort((a, b) => {
    //         if (value.value === 'id')
    //             return a[value.value].PatentId.localeCompare(
    //                 b[value.value].PatentId
    //             )
    //         else if (value.value === 'class')
    //             return a[value.value].length - b[value.value].length
    //         else return a[value.value].localeCompare(b[value.value])
    //     })
    //     // console.log(value)
    //     if (this.state.sortOrder === 'desc') filteredData.reverse()
    //     this.setState({ dropDownFilterValue: value, filterData: filteredData })
    //     this.handlePageChange(1)
    // }

    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
            dataPerPage: this.state.filteredData.slice(
                pageNumber * this.state.perPage - this.state.perPage,
                pageNumber * this.state.perPage
            ),
            totalPage: Math.ceil(
                this.state.filteredData.length / this.state.perPage
            ),
        })
    }

    handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase()

        if (this.state.typingTimeOut) {
            clearTimeout(this.state.typingTimeOut)
        }

        this.setState({
            searchValue: event.target.value,
            typingTimeOut: setTimeout(() => {
                const filteredData = this.state.data.filter((item) => {
                    // Check for search term in id.PatentId, title, abstract, and class.Name
                    const patentIdMatch =
                        item.PatentId.toLowerCase().includes(searchTerm)
                    const titleMatch =
                        item.Title.toLowerCase().includes(searchTerm)
                    const abstractMatch =
                        item.Abstract.toLowerCase().includes(searchTerm)
                    const classMatch =
                        item.Class.toLowerCase().includes(searchTerm)

                    return (
                        patentIdMatch ||
                        titleMatch ||
                        abstractMatch ||
                        classMatch
                    )
                })

                this.setState({ filteredData })
                this.handlePageChange(1)
            }, 500),
        })
    }

    onChangeSelectAll = () => {
        if (this.state.selectAllItems) return

        const nextValues = [...this.state.dropDownList]
        nextValues.map((item) => (item.isSelected = true))

        this.setState({
            dropDownList: nextValues,
            header: Headers,
            selectAllItems: true,
        })
    }

    onChangeSelectItem = (index, item) => {
        if (item.Visible === 'always') return

        const nextValues = [...this.state.dropDownList]
        nextValues[index].isSelected = !nextValues[index].isSelected

        const nextHeaders = Headers.filter((item, index) => {
            return nextValues[index].isSelected
        })

        this.setState({
            dropDownList: nextValues,
            selectAllItems:
                nextValues.length ===
                nextValues.filter((item) => item.isSelected).length,
            header: nextHeaders,
        })
    }

    onSortOrder = () => {
        const filteredData = this.state.filteredData.reverse()
        this.setState({
            sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc',
            filteredData,
        })
        this.handlePageChange(1)
    }

    onSortBy = (sortBy) => {
        const nextSortBy = this.state.dropDownList.find(
            (i) => i.MenuName === sortBy
        )
        const nextValues = this.state.filteredData.sort((a, b) => {
            return a[nextSortBy.MenuName].localeCompare(b[nextSortBy.MenuName])
        })
        this.setState({
            sortBy: nextSortBy,
            filteredData:
                this.state.sortOrder === 'asc'
                    ? nextValues
                    : nextValues.reverse(),
        })
        this.handlePageChange(1)
    }

    handleRadioChange = (event) => {
        this.setState({
            selectedDataFileUpload: this.state.dataFileUpload.find(
                (item) => item.date === event.target.value
            ),
        })
    }

    handleSortChange = (event) => {
        this.setState({
            sortType: this.state.sortType === 'asc' ? 'desc' : 'asc',
            dataFileUpload: this.state.dataFileUpload.reverse(),
        })
    }

    render() {
        const {
            header,
            perPage,
            currentPage,
            totalPage,
            dataPerPage,
            dropDownList,
            searchValue,
            filteredData,
            sortOrder,
            selectAllItems,
            sortBy,
            sortType,
            dataFileUpload,
            selectedDataFileUpload,
        } = this.state

        return (
            <div style={{ display: 'flex', width: '100%', marginTop: '16px' }}>
                {dataFileUpload.length > 1 && (
                    <DataUploadSidebar
                        sortType={sortType}
                        dataFileUpload={dataFileUpload}
                        selectedDataFileUpload={selectedDataFileUpload}
                        handleRadioChange={this.handleRadioChange}
                        handleSortChange={this.handleSortChange}
                    />
                )}
                <div className="training-data-container">
                    <div className="header-container">
                        <span>
                            Assignee:{' '}
                            <span className="special-text">AnyGen</span>
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="mr8">
                                Total patents:{' '}
                                <span className="special-text">
                                    {filteredData.length}
                                </span>
                            </span>
                            <div className="mr8">
                                <SearchBox
                                    width="150px"
                                    value={searchValue}
                                    onSearch={this.handleSearch}
                                />
                            </div>
                            <div className="mr8">
                                <MyCheckDrop
                                    title={'Columns to view'}
                                    width={'fit-content'}
                                    values={dropDownList}
                                    selectAllItems={selectAllItems}
                                    onChangeSelectAll={this.onChangeSelectAll}
                                    onChangeSelectItem={this.onChangeSelectItem}
                                    onChange={() => {}}
                                    selectedCount={
                                        dropDownList.filter(
                                            (item) => item.isSelected
                                        ).length
                                    }
                                />
                            </div>
                            <div>
                                <TypeBasedSort
                                    sortByOptions={dropDownList}
                                    sortBy={sortBy.Name}
                                    sortOrder={sortOrder}
                                    onChange={(sortBy) => this.onSortBy(sortBy)}
                                    onSortOrderChange={this.onSortOrder}
                                />
                            </div>
                        </div>
                    </div>
                    <MyTable Headers={header} Data={dataPerPage} />
                    <br />
                    {totalPage > 1 && (
                        <Pagination
                            paginationType={'both'}
                            noOfPages={totalPage}
                            onChangePage={this.handlePageChange}
                            currentPage={currentPage}
                            pageItemsLimit={perPage}
                        />
                    )}
                </div>
            </div>
        )
    }
}

export default TrainingData
