import React, { Component } from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import '@cyntler/react-doc-viewer/dist/index.css'
import { PropTypes } from 'prop-types'
import './FileViewer.css'

export default class FileViewer extends Component {
    componentWillUnmount() {
        const { documents } = this.props
        if (documents) {
            documents.forEach((doc) => {
                if (doc.uri && !doc.uri.startsWith('http')) {
                    URL.revokeObjectURL(doc.uri)
                }
            })
        }
    }

    render() {
        const { documents, onClose } = this.props

        return (
            <div className="file-viewer-wrapper">
                <button
                    className="close-button"
                    onClick={onClose}
                    aria-label="Close viewer"
                >
                    ×
                </button>
                <DocViewer
                    documents={documents}
                    pluginRenderers={DocViewerRenderers}
                    config={{
                        header: {
                            disableHeader: false,
                            disableFileName: false,
                        },
                        pdfZoom: {
                            defaultZoom: 1.1,
                            zoomJump: 0.2,
                        },
                        pdfVerticalScrollByDefault: true,
                    }}
                />
            </div>
        )
    }
}

FileViewer.defaultProps = {
    documents: [
        {
            uri: 'https://apps.blinx.ai/sample_doc_file.docx',
            fileType: 'docx',
            fileName: 'sample_doc_file.docx',
        },
    ],
    onClose: () => {},
}

FileViewer.propTypes = {
    documents: PropTypes.array.isRequired,
    onClose: PropTypes.func,
}
