import React from 'react'
import './StyleSheet.css'
import Icon from '../../../../IconLibrary/Icon'
import hexToRgba from 'hex-to-rgba'
import { isValidData } from '../CommonMethods'

export const FamilyApplicantList = (list) => {
    return (
        <div className="patent-family-applicant-list">
            {list.map((res, index) => (
                <div className="patent-family-applicant-tag" key={index}>
                    {res.Name}
                </div>
            ))}
        </div>
    )
}

export const SimpleList = (list) => {
    let dataArr = []
    if (Array.isArray(list)) {
        dataArr = list
    } else if (isValidData(list)) {
        dataArr = list.split(';')
    } else {
        dataArr = []
    }
    return (
        <div className="patent-family-applicant-list">
            {dataArr.length > 0
                ? dataArr.map((eachInfo, index) => (
                      <div className="patent-family-applicant-tag" key={index}>
                          {eachInfo}
                      </div>
                  ))
                : '-'}
        </div>
    )
}

export const PatentList = (list) => {
    return (
        <div className="patent-id-list">
            {list.map((res, index) => (
                <div className="patent-id-tag link-text" key={index}>
                    {res.Name}
                </div>
            ))}
        </div>
    )
}

// Modified
export const CPCList = (value) => {
    const list = value.split(';')
    return (
        <div className="patent-id-list">
            {list.map((res, index) => (
                <div className="patent-id-tag" key={index}>
                    <span className="text">{res}</span>{' '}
                    <Icon icon={'info'} className="icon" title={'info'} />
                </div>
            ))}
        </div>
    )
}
export const AssigneeList = (list) => {
    return (
        <div className="patent-id-list">
            {list.map((res, index) => (
                <div className="patent-id-tag" key={index}>
                    {res.Name}
                </div>
            ))}
        </div>
    )
}
export const LegalStatus = (status) => {
    // let positiveStatusList = ["Active"]
    return (
        <div
            className="patent-legal-status-col"
            style={{
                color:
                    status === 'Active'
                        ? 'var(--success-color)'
                        : 'var(--fail-color)',
            }}
        >
            {status}
        </div>
    )
}
export const SimilarityScore = (score) => {
    let color = '#CF3026'
    if (score >= 80) {
        color = '#CF3026'
    } else if (score >= 60 && score < 80) {
        color = '#FF6A00'
    } else if (score >= 40 && score < 60) {
        color = '#EDBE00'
    } else if (score >= 20 && score < 40) {
        color = '#49d271'
    } else {
        color = '#2CC295'
    }
    return (
        <div
            className="patent-legal-status-col"
            style={{
                background: hexToRgba(color, 0.12),
                color: color,
            }}
        >
            {score} %
        </div>
    )
}
export const InfringedFeatureList = (list) => {
    return (
        <div className="patent-id-list">
            {list.map((res, index) => (
                <div className="patent-id-tag link-text" key={index}>
                    {res.Name}
                </div>
            ))}
        </div>
    )
}
export const RelevantPatentInfo = (Info) => {
    console.log('Info >>>> ', Info)
    return (
        <div className="relevant-patent-detailed-info">
            {Info.map((res, index) => (
                <div className="relevant-patent-detailed-section">
                    <div className="relevant-patent-detailed-section-tag">
                        {res.RelevantSection}
                    </div>
                    <div className="relevant-patent-detailed-section-description">
                        <span className="relevant-patent-point">
                            Hello Hello
                        </span>
                        {res.RelevantText}
                    </div>
                </div>
            ))}
        </div>
    )
}

// export const ComparisonInputs = (type, data) =>{
export const ComparisonInputs = () => {
    let type = 'Patents' //Classification, Patents
    let data = {
        ModelName: 'Model 1',
        OutputList: [
            {
                Name: 'Invention Idea 1',
                Type: 'Invention Idea',
            },
            {
                Name: 'Output 2',
                Value: 'Class Label 1',
            },
            {
                Name: 'Output 3',
                Value: 'Class Label 1',
            },
        ],
    }
    return type === 'Classification' ? (
        <div className="comparison-history-info classification-info-container">
            <div className="comparison-history-classification-info-row first-row">
                <div className="comparison-history-classification-info-label">
                    Model
                </div>
                <div className="comparison-history-classification-info-value">
                    {data.ModelName}
                </div>
            </div>
            {data.OutputList.map((res, index) => (
                <div className="comparison-history-classification-info-row">
                    <div className="comparison-history-classification-info-label">
                        {res.Name}
                    </div>
                    {res.Value === 'All Classes' ? (
                        <div className="comparison-history-classification-info-value  with-link">
                            All Classes
                        </div>
                    ) : (
                        <div className="comparison-history-classification-info-value-list">
                            {[1, 2, 3].map((value, vid) => (
                                <div className="comparison-history-classification-info-value-card">
                                    <div className="comparison-history-classification-info-value-card-id">
                                        47585873
                                    </div>
                                    <div className="comparison-history-classification-info-value-card-name">
                                        Class Label {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    ) : (
        <div className="comparison-history-info">
            {[1, 2, 3].map((res, index) => (
                <div className="comparison-history-cell-item" key={index}>
                    <div className="comparison-history-cell-item-name">
                        384749405955
                    </div>
                    <Icon
                        icon="info"
                        size={14}
                        className="comparison-history-cell-item-icon"
                    />
                </div>
            ))}
        </div>
    )
}

// Modified
export const PatentInfoWithCondition = (value) => {
    // console.log('#PatentInfoWithCondition: ', value)
    return (
        <div className="patent-info-width-condition viewed">
            <div className="patent-info-novelty-id">{value}</div>
            {/*<div className="patent-info-novelty-status">New</div>*/}
        </div>
    )
}

// no usage
export const PatentLink = (value) => {
    return (
        <div className="patent-link-container">
            <a className="patent-link-content" href={value.PatentLink}>
                {value.PatentId}
            </a>
        </div>
    )
}

export const ClassList = (value) => {
    return (
        <div className="class-list-container">
            {value.map((value, index) => (
                <div key={index} className="class-list-content">
                    <span className="text">{value.Name}</span>{' '}
                    <Icon icon={'info'} className="icon" title={'info'} />
                </div>
            ))}
        </div>
    )
}

export const BooleanList = (value) => {
    return (
        <div className="boolean-list-content">
            <span className="text">{value ? 'Yes' : 'No'}</span>
        </div>
    )
}
