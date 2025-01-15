import React from 'react'

import SysPopup from './assets/components/CommonComponents/BasicComponents/SysPopup/SysPopup'
import Button from './assets/components/CommonComponents/Layout/Button'
import Help from './assets/components/PopupComponents/Help/Help'
import DataForModel from './assets/components/PopupComponents/DataForModel/DataForModel'
import DocumentPreview from './assets/components/DocumentPreview/DocumentPreview'
import FileViewer from './assets/components/CommonComponents/FileViewer/FileViewer'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenPopup: false,
            isOpenPopupDataModel: false,
            documents: [],
            isViewerOpen: false,
        }
    }

    handleFileSelect = (input) => {
        // Clean up previous document if exists
        this.state.documents.forEach((doc) => {
            if (doc.uri && !doc.uri.startsWith('http')) {
                URL.revokeObjectURL(doc.uri)
            }
        })

        // Handle URL input
        if (input.url) {
            this.setState({
                documents: [
                    {
                        uri: input.url,
                        fileType: input.url.split('.').pop().toLowerCase(),
                        fileName: input.url.split('/').pop(),
                    },
                ],
                isViewerOpen: true,
            })
            console.log(this.state.documents)
            return
        }

        // Handle file upload
        const file = input
        const fileType = file.name.split('.').pop().toLowerCase()
        const objectUrl = window.URL.createObjectURL(file)

        this.setState({
            documents: [
                {
                    uri: objectUrl,
                    fileType,
                    fileName: file.name,
                },
            ],
            isViewerOpen: true,
        })
    }

    handleViewerClose = () => {
        this.state.documents.forEach((doc) => {
            if (doc.uri) {
                URL.revokeObjectURL(doc.uri)
            }
        })
        this.setState({
            documents: [],
            isViewerOpen: false,
        })
    }

    render() {
        const { isOpenPopup, isOpenPopupDataModel, documents, isViewerOpen } =
            this.state

        return (
            <div className="app-container" style={{ height: '90vh' }}>
                {/* <Button
                    type="primary"
                    disabled={false}
                    title="Help"
                    onClick={() => this.setState({ isOpenPopup: !isOpenPopup })}
                >
                    Help
                </Button>
                <Button
                    type="primary"
                    disabled={false}
                    title="Data for Model 3"
                    onClick={() =>
                        this.setState({
                            isOpenPopupDataModel: !isOpenPopupDataModel,
                        })
                    }
                >
                    Data for Model 3
                </Button>
                <SysPopup
                    Open={isOpenPopup}
                    Title={'Help'}
                    onClose={() => this.setState({ isOpenPopup: !isOpenPopup })}
                >
                    <Help />
                </SysPopup>
                <SysPopup
                    Open={isOpenPopupDataModel}
                    Title={'Data for Model 3'}
                    onClose={() =>
                        this.setState({
                            isOpenPopupDataModel: !isOpenPopupDataModel,
                        })
                    }
                >
                    <DataForModel />
                </SysPopup> */}
                {!isViewerOpen && (
                    <DocumentPreview onFileSelect={this.handleFileSelect} />
                )}
                {isViewerOpen && (
                    <FileViewer
                        documents={documents}
                        onClose={this.handleViewerClose}
                    />
                )}
            </div>
        )
    }
}

export default App
