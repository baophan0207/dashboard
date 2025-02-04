import React from 'react'

import MyDatePicker from '../../CommonComponents/BasicComponents/MyDatePicker/MyDatePicker'
import Button from '../../CommonComponents/Layout/Button'
import Icon from '../../../IconLibrary/Icon'

import './NewDeadlineWindow.css'

class NewDeadlineWindow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { handleCloseNewDeadLineWindow } = this.props

        return (
            <div style={{ padding: '24px', width: '300px', margin: 'auto' }}>
                <div style={{ margin: '16px 0' }}>New Deadline:</div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        margin: '24px 0',
                    }}
                >
                    {/* Input box */}
                    <input
                        type="text"
                        // value={
                        //     selectedDate ? selectedDate.toLocaleString() : ''
                        // }
                        // onChange={(e) =>
                        //     setSelectedDate(new Date(e.target.value))
                        // }
                        placeholder="Select date and time"
                        style={{
                            padding: '8px 12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: '250px',
                            marginRight: '8px',
                        }}
                    />

                    {/* Icon button to open date picker */}
                    <button
                        type="button"
                        // onClick={() => setIsPickerOpen((prev) => !prev)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            marginLeft: '-35px',
                            zIndex: 2,
                        }}
                    >
                        <Icon icon={'outline_material_calendar'} />
                    </button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        padding: '24px 12px',
                        justifyContent: 'space-around',
                        margin: '16px 0',
                    }}
                >
                    <Button
                        className="outline-btn"
                        onClick={handleCloseNewDeadLineWindow}
                    >
                        Cancel
                    </Button>
                    <Button disabled={true}>Update</Button>
                </div>
            </div>
        )
    }
}

export default NewDeadlineWindow
