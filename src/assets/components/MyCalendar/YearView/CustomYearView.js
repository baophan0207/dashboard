// import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

import { startOf, add } from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'

import { MyTooltip } from '../../CommonComponents/BasicComponents/Tooltip/Tooltip'

function createCalendar(currentDate) {
    if (!currentDate) {
        currentDate = moment()
    } else {
        currentDate = moment(currentDate)
    }

    const first = currentDate.clone().startOf('month')
    const last = currentDate.clone().endOf('month')
    const weeksCount = Math.ceil((first.day() + last.date()) / 7)
    const calendar = Object.assign([], { currentDate, first, last })

    for (let weekNumber = 0; weekNumber < weeksCount; weekNumber++) {
        const week = []
        calendar.push(week)
        calendar.year = currentDate.year()
        calendar.month = currentDate.month()

        for (let day = 7 * weekNumber; day < 7 * (weekNumber + 1); day++) {
            const date = currentDate.clone().set('date', day + 1 - first.day())
            date.calendar = calendar
            week.push(date)
        }
    }

    return calendar
}

function CalendarDate(props) {
    const { dateToRender, dateOfMonth, events, onSelectSlot } = props
    const today =
        dateToRender.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
            ? 'today'
            : ''

    const hasEvent = events && events.length > 0
    const eventClass = hasEvent ? 'has-event' : ''

    const deadlineCounts = events.reduce((counts, item) => {
        const type = item.data.DeadlineType // Get the DeadlineType
        counts[type] = (counts[type] || 0) + 1 // Increment count for the type
        return counts
    }, {})

    if (dateToRender.month() < dateOfMonth.month()) {
        return (
            <button disabled={true} className={`date prev-month ${eventClass}`}>
                {dateToRender.date()}
            </button>
        )
    }

    if (dateToRender.month() > dateOfMonth.month()) {
        return (
            <button disabled={true} className={`date next-month ${eventClass}`}>
                {dateToRender.date()}
            </button>
        )
    }

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
                        <span>{events.length}</span>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            margin: '12px 0',
                        }}
                    >
                        <span>Accomplished:</span>
                        <span>
                            {events.reduce(
                                (count, item) =>
                                    item.data.Status === 'complete'
                                        ? count + 1
                                        : count,
                                0
                            )}
                        </span>
                    </div>
                    <div style={{ fontWeight: 'bold', margin: '12px 0' }}>
                        Types
                    </div>
                    {Object.entries(deadlineCounts).map(([key, value]) => (
                        <div
                            key={key}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '12px 0',
                            }}
                        >
                            <span>
                                {key === 'maintenance-fee'
                                    ? 'Maintenance Fee Payment:'
                                    : key === 'office-action'
                                      ? 'Office Action Response:'
                                      : 'National Entry Phase'}
                            </span>
                            <span>{value}</span>
                        </div>
                    ))}
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
            <button
                className={`date in-month ${today} ${eventClass}`}
                onClick={onSelectSlot}
            >
                <span>{dateToRender.date()}</span>
            </button>
        </MyTooltip>
    ) : (
        <button
            className={`date in-month ${today} ${eventClass}`}
            onClick={onSelectSlot}
        >
            <span>{dateToRender.date()}</span>
        </button>
    )
}

class Calendar extends React.Component {
    state = {
        calendar: undefined,
    }

    componentDidMount() {
        this.setState({ calendar: createCalendar(this.props.date) })
    }

    componentDidUpdate(prevProps) {
        if (this.props.date !== prevProps.date) {
            this.setState({ calendar: createCalendar(this.props.date) })
        }
    }

    render() {
        if (!this.state.calendar) {
            return null
        }

        return (
            <div className="month">
                <div className="month-name">
                    {this.state.calendar.currentDate
                        .format('MMMM')
                        .toUpperCase()}
                </div>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <span key={index} className="day">
                        {day}
                    </span>
                ))}
                {this.state.calendar.map((week, index) => (
                    <div key={index} className="week">
                        {week.map((date) => {
                            const eventsForDate = this.props.events.filter(
                                (event) =>
                                    moment(event.start).isSame(date, 'day')
                            )

                            return (
                                <CalendarDate
                                    key={date.date()}
                                    dateToRender={date}
                                    dateOfMonth={
                                        this.state.calendar.currentDate
                                    }
                                    events={eventsForDate}
                                    onSelectSlot={this.props.onSelectSlot}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
        )
    }
}

class YearView extends React.Component {
    render() {
        let { date, events, ...props } = this.props
        let range = YearView.range(date)
        const months = []
        const firstMonth = startOf(date, 'year')

        for (let i = 0; i < 12; i++) {
            months.push(
                <Calendar
                    key={i + 1}
                    date={add(firstMonth, i, 'month')}
                    events={events}
                    onSelectSlot={props.onSelectSlot}
                />
            )
        }

        return <div className="year">{months.map((month) => month)}</div>
    }
}

YearView.range = (date) => {
    return [startOf(date, 'year')]
}

YearView.navigate = (date, action) => {
    switch (action) {
        case navigate.PREVIOUS:
            return add(date, -1, 'year')

        case navigate.NEXT:
            return add(date, 1, 'year')

        default:
            return date
    }
}

YearView.title = (date, { localizer }) =>
    localizer.format(date, 'yearHeaderFormat')

export default YearView
