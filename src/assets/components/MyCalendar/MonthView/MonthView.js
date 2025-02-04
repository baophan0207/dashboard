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
                    backgroundColor:
                        event.data.DeadlineType === 'maintenance-fee'
                            ? '#dbf5f2'
                            : event.data.DeadlineType === 'office-action'
                              ? '#f9e9fc'
                              : '#d7e2fb',
                    color:
                        event.data.DeadlineType === 'maintenance-fee'
                            ? '#4db699'
                            : event.data.DeadlineType === 'office-action'
                              ? '#be62d0'
                              : '#4c669f',
                }}
            >
                <MyTooltip
                    title={
                        <div style={{ margin: '8px' }}>
                            <div
                                style={{
                                    color:
                                        event.data.DeadlineType ===
                                        'maintenance-fee'
                                            ? '#4db699'
                                            : event.data.DeadlineType ===
                                                'office-action'
                                              ? '#be62d0'
                                              : '#4c669f',
                                    fontWeight: 'bold',
                                    margin: '6px 0',
                                    fontSize: '14px',
                                }}
                            >
                                {event.data?.Title}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {event.data &&
                                        Object.entries(event.data).map(
                                            ([key]) =>
                                                key !== 'Title' &&
                                                key !== 'Status' &&
                                                key !== 'DeadlineType' ? (
                                                    <span
                                                        key={key}
                                                        style={{
                                                            margin: '6px 0',
                                                        }}
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
                                    {event.data &&
                                        Object.entries(event.data).map(
                                            ([key, value]) =>
                                                key !== 'Title' &&
                                                key !== 'Status' &&
                                                key !== 'DeadlineType' ? (
                                                    <span
                                                        key={key}
                                                        style={{
                                                            fontWeight: 'bold',
                                                            margin: '6px 0',
                                                            color:
                                                                key ===
                                                                'PatentID'
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
                                textDecoration:
                                    event.data.Status === 'complete'
                                        ? 'line-through'
                                        : 'none',
                            }}
                        >
                            <span
                                style={{
                                    marginBottom: '2px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    fontWeight: 'bold',
                                }}
                            >
                                {event.data.Title}
                            </span>
                            <span>{event.data.PatentID}</span>
                        </div>
                    </div>
                </MyTooltip>
                <MyContextMenu menuList={menuList} />
            </div>
        )
    }
}

// class CustomShowMoreButton extends React.Component {
//     render() {
//         const { onClick, count } = this.props
//         return (
//             <button
//                 onClick={onClick}
//                 style={{
//                     backgroundColor: '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     padding: '5px 10px',
//                     cursor: 'pointer',
//                     marginTop: '5px',
//                 }}
//             >
//                 Show {count} more
//             </button>
//         )
//     }
// }

const CustomDateCellWrapper = ({ value, children, events }) => {
    const maxEventsToShow = 2 // Limit the number of events to display
    const eventsForDate = events?.filter((event) =>
        moment(event.start).isSame(value, 'day')
    )

    const handleShowMore = () => {
        console.log(`Show more for date: ${value}`)
        // Add your custom logic, e.g., open a modal to show all events for the date
        alert(
            `More events on ${moment(value).format('MMMM Do YYYY')}: \n${eventsForDate.map((e) => e.data?.Title).join('\n')}`
        )
    }

    return (
        <div
            style={{ position: 'relative', padding: '5px', cursor: 'pointer' }}
        >
            {children}
            {eventsForDate?.slice(0, maxEventsToShow).map((event, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: '#87ebdc',
                        borderRadius: '4px',
                        padding: '2px',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'green',
                        fontSize: '12px',
                    }}
                >
                    {event.data?.Title}
                </div>
            ))}
            {eventsForDate.length > maxEventsToShow && (
                <button
                    onClick={handleShowMore}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '2px 4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        marginTop: '5px',
                    }}
                >
                    Show {eventsForDate.length - maxEventsToShow} more
                </button>
            )}
        </div>
    )
}

class MonthView extends React.Component {
    render() {
        const { events, handleCloseNewDeadLineWindow } = this.props

        return (
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                views={['month']}
                date={new Date(moment().year(), 0, 1)}
                style={{ height: 1000 }}
                components={{
                    event: (eventProps) => (
                        <CustomEvent event={eventProps.event} />
                    ),
                    // dateCellWrapper: (props) => (
                    //     <CustomDateCellWrapper {...props} events={events} />
                    // ),
                }}
                toolbar={false}
                onSelectSlot={handleCloseNewDeadLineWindow}
            />
        )
    }
}

export default MonthView
