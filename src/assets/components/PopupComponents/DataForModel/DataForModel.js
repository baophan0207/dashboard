import React from 'react'

// My Components
import TabPopup from '../BasicComponents/Tab/TabPopup'
import TrainingData from '../TrainingData/TrainingData'
import ClassificationTree from '../ClassificationTree/ClassificationTree'
import AdditionalData from '../AdditionalData/AdditionalData'

const DataForModel = () => {
    const tabs = [
        {
            Name: 'Patent Training Data',
            Element: <TrainingData />,
        },
        {
            Name: 'Classification Tree',
            Element: <ClassificationTree />,
        },
        {
            Name: 'Additional Data',
            title: 'Additional Data',
            Element: <AdditionalData />,
        },
    ]

    return (
        <div
            style={{
                padding: '16px',
                minHeight: '80vh',
                width: '80vw',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <TabPopup tabs={tabs} />
        </div>
    )
}

export default DataForModel
