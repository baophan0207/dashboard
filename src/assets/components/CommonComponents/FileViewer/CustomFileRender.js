import React from 'react'

class CustomFileRender extends React.Component {
    render() {
        const { currentDocument } = this.props.mainState
        if (!currentDocument) return null

        const isWordFile = ['doc', 'docx'].includes(currentDocument.fileType)
        const viewerUrl = isWordFile
            ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + currentDocument.uri)}`
            : currentDocument.uri

        return (
            <div style={{ width: '100%' }} id="my-doc-renderer">
                <iframe
                    className={'doc'}
                    width="100%"
                    height="100%"
                    src={viewerUrl}
                    title="Document Viewer"
                    frameBorder="0"
                ></iframe>
            </div>
        )
    }
}

// Define the file types that this renderer will handle
CustomFileRender.fileTypes = [
    'pdf',
    'application/pdf',
    'doc',
    'application/msword',
    'docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
CustomFileRender.weight = 1

export default CustomFileRender
