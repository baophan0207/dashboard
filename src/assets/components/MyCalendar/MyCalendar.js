import React from 'react'

import MonthView from './MonthView/MonthView'
import WeekView from './WeekView/WeekView'

import events from './events'
import CustomToolBar from './CustomToolBar/CustomToolBar'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import CustomYear from './YearView/YearView'
import YearView from './YearView/CustomYearView'
import Week from './WeekView/CustomWeekView'

const localizer = momentLocalizer(moment)

class MyCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOptionSelected: this.showOptionValues[0],
            viewByActiveOption: this.viewByOptionValues[0].name,
            date: new Date(),
        }
    }

    showOptionValues = [
        { Name: 'All Deadlines' },
        { Name: 'Finished Deadlines' },
    ]

    viewByOptionValues = [
        {
            name: 'Year',
            activeColor: 'var(--primary-color)',
        },
        {
            name: 'Month',
            activeColor: 'var(--primary-color)',
        },
        {
            name: 'Week',
            activeColor: 'var(--primary-color)',
        },
        {
            name: 'Day',
            activeColor: 'var(--primary-color)',
        },
    ]

    onChangeShowOption = (e) => {
        const selectedValue = this.showOptionValues.find((s) => s.Name === e)
        this.setState({ showOptionSelected: selectedValue })
    }

    onClickViewByOption = (e) => {
        this.setState({
            viewByActiveOption: e,
        })
    }

    handleViewChange = (view) => {
        console.log('View changed to:', view)
        // Add your logic here, e.g., updating state or triggering API calls
    }

    render() {
        const { showOptionSelected, viewByActiveOption, date } = this.state

        const { handleCloseNewDeadLineWindow } = this.props

        return (
            <div
                style={{
                    padding: '16px',
                }}
            >
                {/* <CustomToolBar
                    showOptionSelected={showOptionSelected}
                    viewByActiveOption={viewByActiveOption}
                    onChangeShowOption={this.onChangeShowOption}
                    onClickViewByOption={this.onClickViewByOption}
                />
                <div style={{ paddingTop: '16px' }}>
                    {this.state.viewByActiveOption === 'Year' ? (
                        <>
                            <CustomYear
                                events={events}
                                handleCloseNewDeadLineWindow={
                                    handleCloseNewDeadLineWindow
                                }
                                localizer={localizer}
                            />
                        </>
                    ) : this.state.viewByActiveOption === 'Month' ? (
                        <MonthView
                            events={events}
                            handleCloseNewDeadLineWindow={
                                handleCloseNewDeadLineWindow
                            }
                        />
                    ) : (
                        <WeekView
                            events={events}
                            handleCloseNewDeadLineWindow={
                                handleCloseNewDeadLineWindow
                            }
                        />
                    )}
                </div> */}
                <div style={{ height: 600 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        date={date}
                        onNavigate={(newDate) => this.setDate(newDate)} // Update state on navigation
                        components={{
                            toolbar: (props) => (
                                <div style={{ marginBottom: '8px' }}>
                                    <CustomToolBar
                                        {...props}
                                        date={date}
                                        setDate={this.setDate}
                                        showOptionSelected={showOptionSelected}
                                        viewByActiveOption={viewByActiveOption}
                                        onChangeShowOption={
                                            this.onChangeShowOption
                                        }
                                        onClickViewByOption={
                                            this.onClickViewByOption
                                        }
                                        onView={this.onClickViewByOption}
                                    />
                                </div>
                            ),
                        }}
                        view={viewByActiveOption.toLowerCase()}
                        views={{
                            year: YearView,
                            month: true,
                            week: Week,
                            day: false,
                        }}
                        onView={this.handleViewChange}
                        onSelectSlot={handleCloseNewDeadLineWindow}
                    />
                </div>
            </div>
        )
    }
}

export default MyCalendar
