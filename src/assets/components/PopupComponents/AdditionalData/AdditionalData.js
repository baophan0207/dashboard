import React, { Component } from 'react'
import MyTable from '../BasicComponents/PopupTable/MyTable'
import Icon from '../../../IconLibrary/Icon'
import './AdditionalData.css'
import { Headers } from './TableProps'
import { DataFileUpload } from '../DataUploadSidebar/Data'
import DataUploadSidebar from '../DataUploadSidebar/DataUploadSidebar'

class AdditionalData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortType: 'asc',
            dataFileUpload: [],
            selectedDataFileUpload: {},
        }
    }

    componentDidMount() {
        this.setState({
            dataFileUpload: DataFileUpload,
            selectedDataFileUpload: DataFileUpload[0],
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
        const { sortType, dataFileUpload, selectedDataFileUpload } = this.state

        return (
            <div className="additional-data">
                {dataFileUpload.length > 1 && (
                    <DataUploadSidebar
                        sortType={sortType}
                        dataFileUpload={dataFileUpload}
                        selectedDataFileUpload={selectedDataFileUpload}
                        handleRadioChange={this.handleRadioChange}
                        handleSortChange={this.handleSortChange}
                    />
                )}
                <div className="additional-data-container">
                    <div className="additional-data-content">
                        <p className="additional-title">Upload Files</p>
                        <div className="additional-body">
                            <div className="file-tag-container">
                                <div className="file-tag-name">
                                    <Icon
                                        icon={'outline_importFile'}
                                        title="Uploaded Files"
                                    />
                                    <p className="file-name">
                                        {selectedDataFileUpload?.fileName}
                                    </p>
                                    <div className="file-size">
                                        {selectedDataFileUpload?.fileSize}
                                    </div>
                                </div>
                                <div className="file-tag-info">
                                    <Icon icon={'batch'} title="Row Count" />
                                    <span className="file-row-count">
                                        {selectedDataFileUpload?.fileRow}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="additional-data-content">
                        <p className="additional-title">Headers</p>
                        <div className="additional-body">
                            <MyTable
                                Headers={Headers}
                                Data={selectedDataFileUpload?.headers}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdditionalData
