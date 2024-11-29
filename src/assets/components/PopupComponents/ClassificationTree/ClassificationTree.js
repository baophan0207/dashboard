import React, { Component } from 'react'
import TabPopup from '../BasicComponents/Tab/TabPopup'
import Nodes from '../Nodes/Nodes'
import './ClassificationTree.css'
import NodesActions from '../Nodes/NodesActions/NodesActions'

import { Headers } from '../Nodes/TableProps'
import { Data } from '../Nodes/DefaultProps'
import Pagination from '../../CommonComponents/BasicComponents/PaginationV1/Pagination'
import DataUploadSidebar from '../DataUploadSidebar/DataUploadSidebar'
import { DataFileUpload } from '../DataUploadSidebar/Data'

class ClassificationTree extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: Data,
            filteredData: Data,
            typingTimeOut: 0,
            totalPage: 0,
            perPage: 5,
            currentPage: 1,
            dataPerPage: [],
            dropDownList: [],
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
            const { DisplayName, Key, ...item } = {
                ...Headers[i],
            }
            dropDownList.push({ Name: DisplayName, MenuName: Key })
        }
        this.setState({
            totalPage: Math.ceil(Data.length / this.state.perPage),
            dataPerPage: Data.slice(0, this.state.perPage),
            dropDownList,
            sortBy: dropDownList[0],
            dataFileUpload: DataFileUpload,
            selectedDataFileUpload: DataFileUpload[0],
        })
    }

    handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase()

        if (this.state.typingTimeOut) {
            clearTimeout(this.state.typingTimeOut)
        }

        this.setState({
            typingTimeOut: setTimeout(() => {
                const filteredData = this.state.data.filter((item) => {
                    const idMatch = item.id.toLowerCase().includes(searchTerm)
                    const nameMatch = item.name
                        .toLowerCase()
                        .includes(searchTerm)
                    const descriptionMatch = item.description
                        .toLowerCase()
                        .includes(searchTerm)

                    return idMatch || nameMatch || descriptionMatch
                })

                this.setState({ filteredData })
                this.handlePageChange(1)
                // console.log(filteredData)
            }, 500),
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

        if (typeof this.state.filteredData[0][nextSortBy.MenuName] == 'boolean')
            return

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
        const tabs = [
            {
                Name: 'Nodes',
                Element: <Nodes filteredData={this.state.dataPerPage} />,
            },
            {
                Name: 'Tree',
                Element: <></>,
            },
        ]

        const {
            totalPage,
            currentPage,
            perPage,
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
                <div className="classification-tree-container">
                    <TabPopup
                        tabs={tabs}
                        actions={
                            <NodesActions
                                onSearch={this.handleSearch}
                                sortOrder={this.state.sortOrder}
                                onSortOrder={this.onSortOrder}
                                dropDownList={this.state.dropDownList}
                                sortBy={this.state.sortBy}
                                onSortBy={this.onSortBy}
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
                                onChangePage={this.handlePageChange}
                                currentPage={currentPage}
                                pageItemsLimit={perPage}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassificationTree
