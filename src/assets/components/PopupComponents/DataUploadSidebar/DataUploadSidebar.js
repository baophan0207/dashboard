import React from 'react'
import Icon from '../../../IconLibrary/Icon'
import ExpandableLayout from '../../CommonComponents/Layout/ExpandableLayout'
import PropTypes from 'prop-types'
import { DataFileUpload } from './Data'
import './DataUploadSidebar.css'

const DataUploadSidebar = ({
    sortType = 'asc',
    dataFileUpload = DataFileUpload,
    selectedDataFileUpload = DataFileUpload[0],
    handleRadioChange = () => {},
    handleSortChange = () => {},
}) => {
    return (
        <ExpandableLayout backgroundColor={'white'} width={'200px'}>
            <div className="data-upload-history">
                <div className="data-upload-header">
                    <span className="data-upload-header-title">
                        Data Uploading Date
                    </span>
                    <div className="data-upload-header-action">
                        <button
                            className="data-upload-header-action"
                            onClick={handleSortChange}
                        >
                            <Icon
                                icon={
                                    sortType === 'asc'
                                        ? 'sort_down1'
                                        : 'sort_up1'
                                }
                            />
                        </button>
                    </div>
                </div>
                <div className="data-upload-history-list">
                    {dataFileUpload.map((item, index) => (
                        <label
                            key={index}
                            className={`radio-item ${selectedDataFileUpload?.date === item.date ? 'selected' : ''}`}
                        >
                            <input
                                type="radio"
                                value={item.date}
                                checked={
                                    selectedDataFileUpload?.date === item.date
                                }
                                onChange={handleRadioChange}
                            />
                            <span>{item.date}</span>
                            <span>{item.time}</span>
                        </label>
                    ))}
                </div>
            </div>
        </ExpandableLayout>
    )
}

DataUploadSidebar.propTypes = {
    sortType: PropTypes.string,
    dataFileUpload: PropTypes.array,
    selectedDataFileUpload: PropTypes.array,
    handleRadioChange: PropTypes.func,
    handleSortChange: PropTypes.func,
}

export default DataUploadSidebar
