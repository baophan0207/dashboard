import React from 'react'

import SysPopup from './assets/components/CommonComponents/BasicComponents/SysPopup/SysPopup'
import Button from './assets/components/CommonComponents/Layout/Button'
import Help from './assets/components/PopupComponents/Help/Help'
import DataForModel from './assets/components/PopupComponents/DataForModel/DataForModel'
import FileViewer from './assets/components/CommonComponents/FileViewer/FileViewer'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenPopup: false,
            isOpenPopupDataModel: false,
        }
    }

    render() {
        const { isOpenPopup, isOpenPopupDataModel } = this.state

        return (
            <div>
                <Button
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
                </SysPopup>
                <FileViewer />
            </div>
        )
    }
}

export default App
