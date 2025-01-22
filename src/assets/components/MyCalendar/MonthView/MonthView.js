import React from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './MonthView.css'
import MyContextMenu from '../../CommonComponents/ContextMenu/MyContextMenu'
import { MyTooltip } from '../../CommonComponents/BasicComponents/Tooltip/Tooltip'

const localizer = momentLocalizer(moment)

const menuList = [
    { Name: 'View Detailed Info', Icon: 'info' },
    { Name: 'Update Deadline', Icon: 'edit' },
    { Name: 'Mark as Accomplished', Icon: 'info' },
]

const eventDetail = {
    Title: 'Maintenance Fee Payment',
    PatentID: 'US123456789',
    Fee: '$1600',
    Interval: '1st Maintenance Payment',
    GracePeriod: '6 months',
    AssignedTo: 'Alice (In-House Counsel)',
    Status: 'complete',
}

class Avatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isError: false,
        }
    }

    handleError = () => {
        this.setState({ isError: true })
    }

    render() {
        const { src, alt } = this.props
        const { isError } = this.state

        return (
            <div
                style={{
                    display: 'flex',
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // lineHeight: '50px',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0',
                }}
            >
                {isError || !src ? (
                    <span style={{ fontSize: '12px ', color: '#555' }}>
                        {alt?.charAt(0).toUpperCase() || '?'}
                    </span>
                ) : (
                    <img
                        src={src}
                        alt={alt}
                        onError={this.handleError}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </div>
        )
    }
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
                    alignItems: 'center',
                    backgroundColor: '#87ebdc',
                    color: 'green',
                }}
            >
                <MyTooltip
                    title={
                        <div style={{ margin: '8px' }}>
                            <div
                                style={{
                                    color: 'green',
                                    fontWeight: 'bold',
                                    margin: '6px 0',
                                    fontSize: '14px',
                                }}
                            >
                                {eventDetail.Title}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {Object.entries(eventDetail).map(([key]) =>
                                        key !== 'Title' && key !== 'Status' ? (
                                            <span
                                                key={key}
                                                style={{ margin: '6px 0' }}
                                            >
                                                {key}:
                                            </span>
                                        ) : (
                                            <></>
                                        )
                                    )}
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: '4px',
                                    }}
                                >
                                    {Object.entries(eventDetail).map(
                                        ([key, value]) =>
                                            key !== 'Title' &&
                                            key !== 'Status' ? (
                                                <span
                                                    key={key}
                                                    style={{
                                                        fontWeight: 'bold',
                                                        margin: '6px 0',
                                                        color:
                                                            key === 'PatentID'
                                                                ? '#338FFF'
                                                                : '#424242',
                                                    }}
                                                >
                                                    {value}
                                                </span>
                                            ) : (
                                                <></>
                                            )
                                    )}
                                </div>
                            </div>

                            <div
                                style={{
                                    fontStyle: 'italic',
                                    color: '#424242',
                                    margin: '12px 0',
                                    textAlign: 'center',
                                }}
                            >
                                Click on the date to view details
                            </div>
                        </div>
                    }
                >
                    <div
                        style={{
                            display: 'flex',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <Avatar src="" alt="Alice" />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '4px',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: '2px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                {eventDetail.Title}
                            </span>
                            <span>{eventDetail.PatentID}</span>
                        </div>
                    </div>
                </MyTooltip>
                <MyContextMenu menuList={menuList} />
            </div>
        )
    }
}

class CustomShowMoreButton extends React.Component {
    render() {
        const { onClick, count } = this.props
        return (
            <button
                onClick={onClick}
                style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    marginTop: '5px',
                }}
            >
                Show {count} more
            </button>
        )
    }
}

class MonthView extends React.Component {
    render() {
        const { events } = this.props

        return (
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                views={['month']}
                date={new Date(moment().year(), 0, 1)}
                style={{ height: 300 }}
                components={{
                    event: CustomEvent,
                }}
                toolbar={false}
                onShowMore={(events, date) =>
                    console.log('Show More triggered', events, date)
                }
            />
        )
    }
}

export default MonthView
