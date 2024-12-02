import React, { useState, useEffect } from 'react'

import { Box } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'

import TabBar from '../../../CommonComponents/BasicComponents/TabBar/TabBar'
import './TabPopup.css'
import PropTypes from 'prop-types'

const TabPopup = ({ tabs, actions }) => {
    const [activeTabName, setActiveTabName] = useState({})

    useEffect(() => {
        setActiveTabName(tabs[0])
    }, [tabs])

    const handleChangeTab = (activeTab) => {
        setActiveTabName(activeTab)
    }

    return (
        <TabContext value={activeTabName.Name}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <TabBar
                    tabList={tabs}
                    activeTab={activeTabName}
                    onChange={handleChangeTab}
                />
                <Box sx={{ position: 'absolute', right: 0, top: -8 }}>
                    {actions}
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'max-content',
                    flex: 1,
                }}
            >
                {tabs &&
                    tabs.map((item, index) =>
                        activeTabName.Name === item.Name ? (
                            <TabPanel
                                key={index}
                                value={item.Name}
                                sx={{
                                    padding: '0',
                                    height: '100%',
                                    display: 'flex',
                                }}
                                className="tab-content"
                            >
                                {item.Element}
                            </TabPanel>
                        ) : null
                    )}
            </Box>
        </TabContext>
    )
}

TabPopup.propTypes = {
    tabs: PropTypes.array.isRequired,
    actions: PropTypes.element,
    tabFontSize: PropTypes.number,
}

export default TabPopup
