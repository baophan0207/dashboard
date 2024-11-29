import React, { Component } from 'react'

import { Box } from '@mui/material'

import './Help.css'

import VideoPlayer from '../VideoPlayer/VideoPlayer'
import Documentation from '../Documentation/Documentation'
import TabPopup from '../BasicComponents/Tab/TabPopup'

import Button from '../../CommonComponents/Layout/Button'

class Help extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documentation: {
                heading: 'Creating a Classification tree',
                steps: [
                    {
                        title: 'Start with the Root Node',
                        description:
                            'Drag and drop the root node onto the canvas.',
                    },
                    {
                        title: 'Add Child Nodes to the Root Node',
                        description:
                            'Drag and drop a node from the left side onto the root node to create a child node.',
                    },
                    {
                        title: 'Add Child Nodes to Existing Child Nodes',
                        description:
                            'Drag and drop a node from the left side onto an existing child node to create a child of that node.',
                    },
                    {
                        title: 'Change Parent Nodes',
                        description:
                            'If you want to change the parent node of a child node, click on the edge of the line connecting the child to its current parent, then drag it to the new parent node you want to connect it to.',
                    },
                    {
                        title: 'Repeat the Process',
                        description:
                            'Continue dragging and dropping nodes to build out your classification tree.',
                    },
                ],
            },
            videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        }
    }
    render() {
        const tabs = [
            {
                element: (
                    <Documentation
                        documentation={this.state.documentation}
                        title={'Documentation'}
                    />
                ),
                title: 'Documentation',
            },
            {
                element: (
                    <VideoPlayer
                        videoUrl={this.state.videoUrl}
                        title={'Video'}
                    />
                ),
                title: 'Video',
            },
        ]
        return (
            <Box className="help-container">
                <TabPopup actions={<CustomActions />} tabs={tabs} />
            </Box>
        )
    }
}

class CustomActions extends Component {
    render() {
        return (
            <Button
                type="primary"
                disabled={false}
                title="Guide me"
                className={'button'}
            >
                Guide me
            </Button>
        )
    }
}

export default Help
