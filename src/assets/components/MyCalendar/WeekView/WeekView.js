import React from 'react'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

class CustomToolbar extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
                {/* Intentionally left blank to remove month title */}
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
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                views={['week']}
                date={new Date(moment().year(), 0, 1)}
                style={{ height: 800 }}
                components={{
                    toolbar: CustomToolbar,
                }}
            />
        )
    }
}

export default WeekView
