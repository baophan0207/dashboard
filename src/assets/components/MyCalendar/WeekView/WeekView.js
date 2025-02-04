import React from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import WeekdaysView from './CustomWeekView'

import MyContextMenu from '../../CommonComponents/ContextMenu/MyContextMenu'

import './WeekView.css'

const localizer = momentLocalizer(moment)

const menuList = [
    { Name: 'View Detailed Info', Icon: 'info' },
    { Name: 'Update Deadline', Icon: 'edit' },
    { Name: 'Mark as Accomplished', Icon: 'info' },
]

const CustomHeader = ({ label, ...props }) => {
    return (
        <div style={{ textAlign: 'center', padding: '12px' }}>
            <div style={{ color: '#fff' }}>
                {props.date.toLocaleString('en-US', { weekday: 'long' })}
            </div>
            <div
                style={{
                    fontSize: '24px',
                    color: '#80B9FF',
                    fontWeight: 'bold',
                }}
            >
                {props.date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                })}
            </div>
        </div>
    )
}

const customDayCell = (events, date) => {
    const maxVisibleEvents = 2 // Adjust based on available space
    const visibleEvents = events.slice(0, maxVisibleEvents)
    const hiddenEvents = events.slice(maxVisibleEvents)

    console.log('Date:', date)
    console.log('Visible Events:', visibleEvents)
    console.log('Hidden Events:', hiddenEvents)

    return (
        <div
            style={{
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '4px',
            }}
        >
            {/* Render visible events using CustomEvent component */}
            {visibleEvents.map((event, index) => (
                <CustomEvent key={index} event={event} />
            ))}

            {/* Render "Show More" button if there are hidden events */}
            {hiddenEvents.length > 0 && (
                <button
                    onClick={() => {
                        // setSelectedEvents(hiddenEvents)
                        // setShowMoreModal(true)
                        console.log('show more')
                    }}
                    style={{
                        background: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '5px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '5px',
                    }}
                >
                    Show More ({hiddenEvents.length})
                </button>
            )}
        </div>
    )
}

class CustomEvent extends React.Component {
    render() {
        const { event } = this.props

        return (
            <div
                style={{
                    padding: '5px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'start',
                    backgroundColor:
                        event.data.DeadlineType === 'maintenance-fee'
                            ? '#dbf5f2'
                            : event.data.DeadlineType === 'office-action'
                              ? '#f9e9fc'
                              : '#d7e2fb',
                    color: '#424242',
                }}
            >
                <div
                    style={{
                        margin: '8px',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            color:
                                event.data.DeadlineType === 'maintenance-fee'
                                    ? '#4db699'
                                    : event.data.DeadlineType ===
                                        'office-action'
                                      ? '#be62d0'
                                      : '#4c669f',
                            fontWeight: 'bold',
                            margin: '6px 0',
                            fontSize: '14px',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        }}
                    >
                        {event.data?.Title}
                    </div>
                    {event.data &&
                        Object.entries(event.data).map(
                            ([key, value]) =>
                                key !== 'Title' &&
                                key !== 'Status' &&
                                key !== 'AssignedTo' && (
                                    <div
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            margin: '6px 0',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <span
                                            style={{
                                                margin: '4px 0',
                                            }}
                                        >
                                            {key}:
                                        </span>
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                margin: '4px 0',
                                                color:
                                                    key === 'PatentID'
                                                        ? '#338FFF'
                                                        : '#424242',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {value}
                                        </span>
                                    </div>
                                )
                        )}
                </div>
                <div style={{ marginTop: '8px' }}>
                    <MyContextMenu menuList={menuList} />
                </div>
            </div>
        )
    }
}

class WeekView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { events } = this.props

        return (
            <div style={{ height: '100%' }}>
                <Calendar
                    views={{ week: WeekdaysView }}
                    defaultView="week"
                    events={events}
                    localizer={localizer}
                    // step={15}
                    // timeslots={4}
                    defaultDate={new Date(2025, 0, 1)}
                    components={{
                        event: CustomEvent,
                        header: CustomHeader,
                        // week: {
                        //     dateCellWrapper: ({ children, value }) => {
                        //         const cellEvents = events.filter(
                        //             (event) =>
                        //                 new Date(event.start).toDateString() ===
                        //                 new Date(value).toDateString()
                        //         )
                        //         return (
                        //             <div>
                        //                 {customDayCell(cellEvents, value)}
                        //             </div>
                        //         )
                        //     },
                        // },
                    }}
                />
            </div>
        )
    }
}

export default WeekView
