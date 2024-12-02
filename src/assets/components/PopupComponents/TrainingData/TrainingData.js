import React, { useState, useEffect, useLayoutEffect } from 'react'

// Common Components
import Pagination from '../../CommonComponents/BasicComponents/PaginationV1/Pagination'

// My Components
import MyTable from '../BasicComponents/PopupTable/MyTable'
import TrainingDataActions from './TrainingDataActions/TrainingDataActions'

// Data Upload Components
import { DataFileUpload } from '../DataUploadSidebar/Data'
import DataUploadSidebar from '../DataUploadSidebar/DataUploadSidebar'

// Local imports
import { Headers } from './TableProps'
import { Data } from './DefaultProps'
import './TrainingData.css'

const TrainingData = () => {
    const [header, setHeader] = useState([])
    const [data, setData] = useState([])
    const [perPage] = useState(5)
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState([])
    const [dropDownList, setDropDownList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState(Data)
    const [typingTimeOut, setTypingTimeOut] = useState(0)
    const [selectAllItems, setSelectAllItems] = useState(true)
    const [sortBy, setSortBy] = useState({})
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortType, setSortType] = useState('asc')
    const [dataFileUpload, setDataFileUpload] = useState([])
    const [selectedDataFileUpload, setSelectedDataFileUpload] = useState({})

    const [renderData, setRenderData] = useState({ header: [], data: [] })

    useEffect(() => {
        const dropDownList = Headers.map(({ DisplayName, Key, Visible }) => ({
            Name: DisplayName,
            MenuName: Key,
            isSelected: true,
            Visible: Visible === 'always' ? Visible : 'none',
        }))

        setHeader(Headers)
        setData(
            Data.sort((firstItem, secondItem) =>
                firstItem.PatentId.localeCompare(secondItem.PatentId)
            )
        )
        setTotalPage(Math.ceil(Data.length / perPage))
        setDataPerPage(Data.slice(0, perPage))
        setDropDownList(dropDownList)
        setSortBy(dropDownList[0])
        setDataFileUpload(DataFileUpload)
        setSelectedDataFileUpload(DataFileUpload[0])
    }, [perPage])

    useLayoutEffect(() => {
        setRenderData({ header: header, data: dataPerPage })
    }, [header, dataPerPage])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        setDataPerPage(
            filteredData.slice(
                pageNumber * perPage - perPage,
                pageNumber * perPage
            )
        )
        setTotalPage(Math.ceil(filteredData.length / perPage))
    }

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase()

        if (typingTimeOut) {
            clearTimeout(typingTimeOut)
        }

        setSearchValue(event.target.value)
        setTypingTimeOut(
            setTimeout(() => {
                const filtered = data.filter((item) => {
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

                setFilteredData(filtered)
                setDataPerPage(filtered.slice(0, perPage))
                setCurrentPage(1)
                setTotalPage(Math.ceil(filtered.length / perPage))
            }, 500)
        )
    }

    const onChangeSelectAll = () => {
        if (selectAllItems) return

        const nextValues = dropDownList.map((item) => ({
            ...item,
            isSelected: true,
        }))
        setDropDownList(nextValues)
        setHeader(Headers)
        setSelectAllItems(true)
    }

    const onChangeSelectItem = (index, item) => {
        if (item.Visible === 'always') return

        const nextValues = [...dropDownList]
        nextValues[index].isSelected = !nextValues[index].isSelected

        const nextHeaders = Headers.filter(
            (_, idx) => nextValues[idx].isSelected
        )

        setDropDownList(nextValues)
        setSelectAllItems(
            nextValues.length ===
                nextValues.filter((item) => item.isSelected).length
        )
        setHeader(nextHeaders)
    }

    const onSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(newSortOrder)
        const newFilteredData = [...filteredData].reverse()
        setFilteredData(newFilteredData)
        setDataPerPage(newFilteredData.slice(0, perPage))
        setCurrentPage(1)
    }

    const onSortBy = (sortByValue) => {
        const nextSortBy = dropDownList.find((i) => i.MenuName === sortByValue)
        const nextValues = [...filteredData].sort((firstItem, secondItem) =>
            firstItem[nextSortBy.MenuName].localeCompare(
                secondItem[nextSortBy.MenuName]
            )
        )

        setSortBy(nextSortBy)
        setFilteredData(nextValues)
        setDataPerPage(nextValues.slice(0, perPage))
        setCurrentPage(1)
    }

    const handleRadioChange = (event) => {
        setSelectedDataFileUpload(
            dataFileUpload.find((item) => item.date === event.target.value)
        )
    }

    const handleSortChange = () => {
        setSortType(sortType === 'asc' ? 'desc' : 'asc')
        setDataFileUpload([...dataFileUpload].reverse())
    }

    return (
        <div style={{ display: 'flex', width: '100%', marginTop: '16px' }}>
            {dataFileUpload.length > 1 && (
                <DataUploadSidebar
                    sortType={sortType}
                    dataFileUpload={dataFileUpload}
                    selectedDataFileUpload={selectedDataFileUpload}
                    handleRadioChange={handleRadioChange}
                    handleSortChange={handleSortChange}
                />
            )}
            <div className="training-data-container">
                <TrainingDataActions
                    filteredData={filteredData}
                    searchValue={searchValue}
                    handleSearch={handleSearch}
                    dropDownList={dropDownList}
                    selectAllItems={selectAllItems}
                    onChangeSelectAll={onChangeSelectAll}
                    onChangeSelectItem={onChangeSelectItem}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSortBy={onSortBy}
                    onSortOrder={onSortOrder}
                />
                <MyTable Headers={renderData.header} Data={renderData.data} />
                <br />
                {totalPage > 1 && (
                    <Pagination
                        paginationType={'both'}
                        noOfPages={totalPage}
                        onChangePage={handlePageChange}
                        currentPage={currentPage}
                        pageItemsLimit={perPage}
                    />
                )}
            </div>
        </div>
    )
}

export default TrainingData
