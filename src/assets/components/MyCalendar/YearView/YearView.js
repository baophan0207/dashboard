import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Year from './CustomYearView'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './CustomYearView.css'

const localizer = momentLocalizer(moment)
localizer.formats.yearHeaderFormat = 'YYYY'

class CustomYear extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { events, handleCloseNewDeadLineWindow } = this.props

        return (
            <div className="app">
                <Calendar
                    localizer={localizer}
                    events={events}
                    toolbar={false}
                    defaultView="year"
                    views={{
                        year: Year,
                    }}
                    messages={{ year: 'Year' }}
                    onSelectSlot={handleCloseNewDeadLineWindow}
                />
            </div>
        )
    }
}

export default CustomYear
