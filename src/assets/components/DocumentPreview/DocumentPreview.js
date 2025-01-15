import React from 'react'
import Dropzone from 'react-dropzone'
import './DocumentPreview.css'

export default class FileUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            documents: [],
            documentUrl: '',
        }
    }

    onDrop = (acceptedFiles) => {
        if (acceptedFiles?.[0]) {
            this.props.onFileSelect(acceptedFiles[0])
        }
    }

    handleUrlInput = (e) => {
        this.setState({ documentUrl: e.target.value })
    }

    handleUrlSubmit = () => {
        const { documentUrl } = this.state
        if (documentUrl) {
            this.props.onFileSelect({ url: documentUrl })
            this.setState({ documentUrl: '' }) // Clear input after submission
        }
    }

    render() {
        return (
            <div className="document-upload-container">
                <div className="url-input-container">
                    <input
                        type="text"
                        value={this.state.documentUrl}
                        onChange={this.handleUrlInput}
                        placeholder="Enter document URL"
                        className="document-url-input"
                    />
                    <button
                        onClick={this.handleUrlSubmit}
                        className="add-document-btn"
                    >
                        Add Document
                    </button>
                </div>
                <Dropzone
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onDrop={this.onDrop}
                >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                        <div
                            {...getRootProps()}
                            className={`dropzone ${isDragActive ? 'active' : ''}`}
                        >
                            <input {...getInputProps()} />
                            <div className="upload-content">
                                <i className="upload-icon">📄</i>
                                <p>
                                    Drag & Drop your document here or click to
                                    select
                                </p>
                                <p className="file-types">
                                    Supported files: PDF, DOC, DOCX
                                </p>
                            </div>
                        </div>
                    )}
                </Dropzone>
            </div>
        )
    }
}
