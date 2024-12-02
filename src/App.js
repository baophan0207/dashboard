import React, { useState } from 'react'

import SysPopup from './assets/components/CommonComponents/BasicComponents/SysPopup/SysPopup'
import Button from './assets/components/CommonComponents/Layout/Button'
import Help from './assets/components/PopupComponents/Help/Help'
import DataForModel from './assets/components/PopupComponents/DataForModel/DataForModel'

const App = () => {
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const [isOpenPopupDataModel, setIsOpenPopupDataModel] = useState(true)

    return (
        <div>
            <Button
                type="primary"
                disabled={false}
                title="Help"
                onClick={() => setIsOpenPopup(true)}
            >
                Help
            </Button>
            <Button
                type="primary"
                disabled={false}
                title="Data for Model 3"
                onClick={() => setIsOpenPopupDataModel(true)}
            >
                Data for Model 3
            </Button>
            <SysPopup
                Open={isOpenPopup}
                Title={'Help'}
                onClose={() => setIsOpenPopup(false)}
                // LayoutWidth={'100%'}
            >
                <Help />
            </SysPopup>
            <SysPopup
                Open={isOpenPopupDataModel}
                Title={'Data for Model 3'}
                onClose={() => setIsOpenPopupDataModel(false)}
                // LayoutWidth={'100%'}
            >
                <DataForModel />
            </SysPopup>
        </div>
    )
}

export default App
