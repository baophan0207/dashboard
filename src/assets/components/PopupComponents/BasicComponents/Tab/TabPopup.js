import React, { Component } from 'react'

import { Box } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'

import TabBar from '../../../CommonComponents/BasicComponents/TabBar/TabBar'

import './TabPopup.css'
import PropTypes from 'prop-types'

class TabPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '0',
            activeTabName: {},
        }
    }

    componentDidMount() {
        this.setState({
            activeTabName: this.props.tabs[0],
        })
    }
    render() {
        const { tabs, actions } = this.props

        const handleChangeTab = (activeTab) => {
            this.setState({ activeTabName: activeTab })
        }

        return (
            <TabContext value={this.state.activeTabName.Name}>
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
                        activeTab={this.state.activeTabName}
                        onChange={(activeTab) => handleChangeTab(activeTab)}
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
                            this.state.activeTabName.Name === item.Name ? (
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
}

TabPanel.propTypes = {
    tabs: PropTypes.array.isRequired,
    actions: PropTypes.element,
    tabFontSize: PropTypes.number,
}

export default TabPopup
