import React, { Component } from 'react'

import SysPopup from './assets/components/CommonComponents/BasicComponents/SysPopup/SysPopup'
import Button from './assets/components/CommonComponents/Layout/Button'
import Help from './assets/components/PopupComponents/Help/Help'
import DataForModel from './assets/components/PopupComponents/DataForModel/DataForModel'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenPopup: false,
            isOpenPopupDataModel: true,
        }
    }
    render() {
        return (
            <div>
                <Button
                    type="primary"
                    disabled={false}
                    title="Help"
                    onClick={() => {
                        this.setState({ isOpenPopup: true })
                    }}
                >
                    Help
                </Button>
                <Button
                    type="primary"
                    disabled={false}
                    title="Data for Model 3"
                    onClick={() => {
                        this.setState({ isOpenPopupDataModel: true })
                    }}
                >
                    Data for Model 3
                </Button>
                <SysPopup
                    Open={this.state.isOpenPopup}
                    Title={'Help'}
                    onClose={() => {
                        this.setState({ isOpenPopup: false })
                    }}
                    // LayoutWidth={'100%'}
                >
                    <Help />
                </SysPopup>
                <SysPopup
                    Open={this.state.isOpenPopupDataModel}
                    Title={'Data for Model 3'}
                    onClose={() => {
                        this.setState({ isOpenPopupDataModel: false })
                    }}
                    // LayoutWidth={'100%'}
                >
                    <DataForModel />
                </SysPopup>
            </div>
        )
    }
}

export default App
