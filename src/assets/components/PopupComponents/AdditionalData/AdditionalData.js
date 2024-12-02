import React, { useState, useEffect, memo } from 'react'

// Common Components
import Icon from '../../../IconLibrary/Icon'

// My Components
import MyTable from '../BasicComponents/PopupTable/MyTable'
import DataUploadSidebar from '../DataUploadSidebar/DataUploadSidebar'

// Local imports
import './AdditionalData.css'
import { Headers } from './TableProps'
import { DataFileUpload } from '../DataUploadSidebar/Data'

const AdditionalData = () => {
    const [sortType, setSortType] = useState('asc')
    const [dataFileUpload, setDataFileUpload] = useState([])
    const [selectedDataFileUpload, setSelectedDataFileUpload] = useState({})

    useEffect(() => {
        setDataFileUpload(DataFileUpload)
        setSelectedDataFileUpload(DataFileUpload[0])
    }, [])

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
        <div className="additional-data">
            {dataFileUpload.length > 1 && (
                <DataUploadSidebar
                    sortType={sortType}
                    dataFileUpload={dataFileUpload}
                    selectedDataFileUpload={selectedDataFileUpload}
                    handleRadioChange={handleRadioChange}
                    handleSortChange={handleSortChange}
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
                <AdditionalDataHeaders
                    selectedDataFileUpload={selectedDataFileUpload}
                />
            </div>
        </div>
    )
}

const AdditionalDataHeaders = memo(({ selectedDataFileUpload }) => {
    return (
        <div className="additional-data-content">
            <p className="additional-title">Headers</p>
            <div className="additional-body">
                <MyTable
                    Headers={Headers}
                    Data={selectedDataFileUpload?.headers}
                />
            </div>
        </div>
    )
})

export default AdditionalData
