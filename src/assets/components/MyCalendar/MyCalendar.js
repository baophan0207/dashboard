import React from 'react'

import MyDropDown from '../CommonComponents/BasicComponents/MyDropDown/MyDropDown'
import ToggleButton from '../CommonComponents/BasicComponents/ToggleButton/ToggleButton'
import CalendarTimePicker from './CalendarTimePicker'
import CustomYearView from './YearView/CustomYearView'
import MonthView from './MonthView/MonthView'
import WeekView from './WeekView/WeekView'

class MyCalendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showOptionSelected: this.showOptionValues[0],
            viewByActiveOption: this.viewByOptionValues[1].name,
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

    events = [
        {
            title: 'Event 1',
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 2),
        },
        {
            title: 'Event 2',
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 2),
        },
        {
            title: 'Event 3',
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 2),
        },
        {
            title: 'Event 1',
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 2),
        },
        {
            title: 'Event 2',
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 2),
        },
        {
            title: 'Event 3',
            start: new Date(2025, 0, 1),
            end: new Date(2025, 0, 2),
        },
        {
            title: 'Event 4',
            start: new Date(2025, 0, 6),
            end: new Date(2025, 0, 7),
        },
        {
            title: 'Event 5',
            start: new Date(2025, 0, 14),
            end: new Date(2025, 0, 15),
        },
        {
            title: 'Event 6',
            start: new Date(2025, 0, 18),
            end: new Date(2025, 0, 19),
        },
        {
            title: 'Event 7',
            start: new Date(2025, 0, 20),
            end: new Date(2025, 0, 21),
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

    render() {
        const { showOptionSelected, viewByActiveOption } = this.state

        return (
            <div
                style={{
                    padding: '16px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <div style={{ marginRight: '12px' }}>
                            <CalendarTimePicker time={'year'} />
                        </div>
                        {(viewByActiveOption === 'Month' ||
                            viewByActiveOption !== 'Year') && (
                            <div style={{ marginRight: '12px' }}>
                                <CalendarTimePicker time={'month'} />
                            </div>
                        )}{' '}
                        {viewByActiveOption === 'Week' && (
                            <div>
                                <CalendarTimePicker time={'week'} />
                            </div>
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    marginRight: '8px',
                                }}
                            >
                                Show
                            </span>
                            <MyDropDown
                                width="1000px"
                                onChange={(e) => this.onChangeShowOption(e)}
                                values={this.showOptionValues}
                                selectedItem={showOptionSelected.Name}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    marginRight: '8px',
                                }}
                            >
                                View by
                            </span>
                            <ToggleButton
                                options={this.viewByOptionValues}
                                activeOption={viewByActiveOption}
                                onClickOptionHandler={(e) =>
                                    this.onClickViewByOption(e)
                                }
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.viewByActiveOption === 'Year' ? (
                        <>
                            <h1>Custom Year View</h1>
                            <CustomYearView events={this.events} />
                        </>
                    ) : this.state.viewByActiveOption === 'Month' ? (
                        <MonthView events={this.events} />
                    ) : (
                        <WeekView events={this.events} />
                    )}
                </div>
            </div>
        )
    }
}

export default MyCalendar
