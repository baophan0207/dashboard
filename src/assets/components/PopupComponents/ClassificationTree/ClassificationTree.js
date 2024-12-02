import React, { useState, useEffect } from 'react'

// Common Components
import Pagination from '../../CommonComponents/BasicComponents/PaginationV1/Pagination'

// My Components
import TabPopup from '../BasicComponents/Tab/TabPopup'
import Nodes from '../Nodes/Nodes'
import NodesActions from '../Nodes/NodesActions/NodesActions'
import DataUploadSidebar from '../DataUploadSidebar/DataUploadSidebar'
import { DataFileUpload } from '../DataUploadSidebar/Data'

// Local imports
import { Headers } from '../Nodes/TableProps'
import { Data } from '../Nodes/DefaultProps'
import './ClassificationTree.css'

const ClassificationTree = () => {
    const [data] = useState(Data)
    const [filteredData, setFilteredData] = useState(Data)
    const [typingTimeOut, setTypingTimeOut] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [perPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataPerPage, setDataPerPage] = useState([])
    const [dropDownList, setDropDownList] = useState([])
    const [sortBy, setSortBy] = useState({})
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortType, setSortType] = useState('asc')
    const [dataFileUpload, setDataFileUpload] = useState([])
    const [selectedDataFileUpload, setSelectedDataFileUpload] = useState({})

    useEffect(() => {
        const newDropDownList = Headers.map(({ DisplayName, Key }) => ({
            Name: DisplayName,
            MenuName: Key,
        }))

        setDropDownList(newDropDownList)
        setSortBy(newDropDownList[0])
        setDataFileUpload(DataFileUpload)
        setSelectedDataFileUpload(DataFileUpload[0])
        setTotalPage(Math.ceil(Data.length / perPage))
        setDataPerPage(Data.slice(0, perPage))
    }, [perPage])

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase()

        if (typingTimeOut) {
            clearTimeout(typingTimeOut)
        }

        setTypingTimeOut(
            setTimeout(() => {
                const filtered = data.filter((item) => {
                    const idMatch = item.id.toLowerCase().includes(searchTerm)
                    const nameMatch = item.name
                        .toLowerCase()
                        .includes(searchTerm)
                    const descriptionMatch = item.description
                        .toLowerCase()
                        .includes(searchTerm)
                    return idMatch || nameMatch || descriptionMatch
                })

                setFilteredData(filtered)
                setDataPerPage(filtered.slice(0, perPage))
                setCurrentPage(1)
                setTotalPage(Math.ceil(filtered.length / perPage))
            }, 500)
        )
    }

    const onSortOrder = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
        setSortOrder(newSortOrder)
        const newFilteredData = [...filteredData].reverse()
        setFilteredData(newFilteredData)
        setDataPerPage(newFilteredData.slice(0, perPage))
        setCurrentPage(1)
    }

    const onSortBy = (nextSortByMenu) => {
        const nextSortBy = dropDownList.find(
            (i) => i.MenuName === nextSortByMenu
        )

        if (typeof filteredData[0][nextSortBy.MenuName] === 'boolean') return

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

    const handleRadioChange = (event) => {
        setSelectedDataFileUpload(
            dataFileUpload.find((item) => item.date === event.target.value)
        )
    }

    const handleSortChange = () => {
        setSortType(sortType === 'asc' ? 'desc' : 'asc')
        setDataFileUpload([...dataFileUpload].reverse())
    }

    const tabs = [
        {
            Name: 'Nodes',
            Element: <Nodes filteredData={dataPerPage} />,
        },
        {
            Name: 'Tree',
            Element: <></>,
        },
    ]

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
            <div className="classification-tree-container">
                <TabPopup
                    tabs={tabs}
                    actions={
                        <NodesActions
                            onSearch={handleSearch}
                            sortOrder={sortOrder}
                            onSortOrder={onSortOrder}
                            dropDownList={dropDownList}
                            sortBy={sortBy}
                            onSortBy={onSortBy}
                        />
                    }
                    tabFontSize={12}
                />
                <br />
                <br />
                <div>
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
        </div>
    )
}

export default ClassificationTree
