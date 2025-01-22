import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CustomYearView.css' // Import custom styles
import { MyTooltip } from '../../CommonComponents/BasicComponents/Tooltip/Tooltip'

const localizer = momentLocalizer(moment)

class CustomDateCellWrapper extends Component {
    render() {
        const { children, date, hasEvent, onClick } = this.props
        const button = (
            <button
                style={{
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: hasEvent ? '#E01F3D' : 'transparent',
                    color: hasEvent ? 'white' : 'black',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    cursor: hasEvent ? 'pointer' : 'default',
                    transition: 'background-color 0.3s, transform 0.3s',
                }}
                onClick={() => {
                    onClick(date)
                    console.log(children)
                }}
            >
                {children}
            </button>
        )

        return hasEvent ? (
            <MyTooltip
                title={
                    <div style={{ margin: '8px' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '12px 0',
                            }}
                        >
                            <span>Total deadlines:</span>
                            <span>3</span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '12px 0',
                            }}
                        >
                            <span>Accomplished:</span>
                            <span>1</span>
                        </div>
                        <div style={{ fontWeight: 'bold', margin: '12px 0' }}>
                            Types
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '12px 0',
                            }}
                        >
                            <span>Maintenance Fee Payment:</span>
                            <span>1</span>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '12px 0',
                            }}
                        >
                            <span>Office Action Response:</span>
                            <span>2</span>
                        </div>
                        <div
                            style={{
                                fontStyle: 'italic',
                                color: '#424242',
                                margin: '12px 0',
                            }}
                        >
                            Click on the date to view details
                        </div>
                    </div>
                }
            >
                {button}
            </MyTooltip>
        ) : (
            button
        )
    }
}

class CustomYearView extends Component {
    handleDateClick = (date) => {
        alert(`Date clicked: ${moment(date).format('MMMM Do YYYY')}`)
    }

    render() {
        const { events } = this.props
        const months = moment.months()

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {months.map((month, index) => (
                    <div
                        key={month}
                        style={{
                            width: '25%',
                            padding: '10px',
                            position: 'relative',
                        }}
                    >
                        <h3
                            style={{
                                textAlign: 'left',
                                fontSize: '24px',
                                margin: '0',
                            }}
                        >
                            {month}
                        </h3>
                        <Calendar
                            localizer={localizer}
                            events={[]}
                            startAccessor="start"
                            endAccessor="end"
                            defaultView="month"
                            views={['month']}
                            date={new Date(moment().year(), index, 1)}
                            style={{ height: 300 }}
                            components={{
                                dateCellWrapper: ({ children, value }) => {
                                    const hasEvent = events.some((event) =>
                                        moment(event.start).isSame(value, 'day')
                                    )
                                    return (
                                        <CustomDateCellWrapper
                                            date={value}
                                            hasEvent={hasEvent}
                                            onClick={this.handleDateClick}
                                        >
                                            {children}
                                        </CustomDateCellWrapper>
                                    )
                                },
                            }}
                            toolbar={false}
                        />
                    </div>
                ))}
            </div>
        )
    }
}

export default CustomYearView
