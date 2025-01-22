import React from 'react'

import PropTypes from 'prop-types'

import Icon from '../../IconLibrary/Icon'

class CalendarTimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedValue: this.getInitialValue(props.time),
        }
    }

    getInitialValue(time) {
        if (time === 'year') return this.year[0].Value
        if (time === 'month') return this.month[0].Value
        return this.week[0].Value
    }

    handleDecrease = () => {
        const { time } = this.props
        const options =
            time === 'year'
                ? this.year
                : time === 'month'
                  ? this.month
                  : this.week
        const currentIndex = options.findIndex(
            (option) => option.Value === this.state.selectedValue
        )
        if (currentIndex > 0) {
            this.setState({ selectedValue: options[currentIndex - 1].Value })
        }
    }

    handleIncrease = () => {
        const { time } = this.props
        const options =
            time === 'year'
                ? this.year
                : time === 'month'
                  ? this.month
                  : this.week
        const currentIndex = options.findIndex(
            (option) => option.Value === this.state.selectedValue
        )
        if (currentIndex < options.length - 1) {
            this.setState({ selectedValue: options[currentIndex + 1].Value })
        }
    }

    year = [
        { Name: '2025', Value: '2025' },
        { Name: '2024', Value: '2024' },
        { Name: '2023', Value: '2023' },
        { Name: '2022', Value: '2022' },
        { Name: '2021', Value: '2021' },
    ]

    month = [
        { Name: 'January', Value: 'January' },
        { Name: 'February', Value: 'February' },
        { Name: 'March', Value: 'March' },
        { Name: 'April', Value: 'April' },
        { Name: 'May', Value: 'May' },
        { Name: 'June', Value: 'June' },
        { Name: 'July', Value: 'July' },
        { Name: 'August', Value: 'August' },
        { Name: 'September', Value: 'September' },
        { Name: 'October', Value: 'October' },
        { Name: 'November', Value: 'November' },
        { Name: 'December', Value: 'December' },
    ]

    week = [
        { Name: 'Last Week', Value: 'last-week' },
        { Name: 'Current Week', Value: 'current-week' },
        { Name: 'Next Week', Value: 'next-week' },
    ]

    render() {
        const { time } = this.props
        const { selectedValue } = this.state

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '8px' }}>
                    {time === 'year'
                        ? 'Year'
                        : time === 'month'
                          ? 'Month'
                          : 'Week'}
                </span>
                <div
                    style={{
                        display: 'flex',
                        border: '1px solid #bfdbfd',
                        padding: '2px',
                        borderRadius: '4px',
                    }}
                >
                    <button
                        style={{
                            border: 'none',
                            backgroundColor: '#f5f7f9',
                            padding: '4px ',
                            margin: '0 2px',
                        }}
                        onClick={this.handleDecrease}
                    >
                        <Icon icon={'left_arrow2'} />
                    </button>
                    <select
                        id="time"
                        name="time"
                        style={{
                            border: 'none',
                        }}
                        value={selectedValue}
                        onChange={(e) =>
                            this.setState({ selectedValue: e.target.value })
                        }
                    >
                        {time === 'year'
                            ? this.year.map((item) => (
                                  <option key={item.Value} value={item.Value}>
                                      {item.Name}
                                  </option>
                              ))
                            : time === 'month'
                              ? this.month.map((item) => (
                                    <option key={item.Value} value={item.Value}>
                                        {item.Name}
                                    </option>
                                ))
                              : this.week.map((item) => (
                                    <option key={item.Value} value={item.Value}>
                                        {item.Name}
                                    </option>
                                ))}
                    </select>
                    <button
                        style={{
                            border: 'none',
                            backgroundColor: '#f5f7f9',
                            padding: '4px ',
                            margin: '0 2px',
                        }}
                        onClick={this.handleIncrease}
                    >
                        <Icon icon={'right_arrow2'} stroke="#022454" />
                    </button>
                </div>
            </div>
        )
    }
}

CalendarTimePicker.propTypes = {
    time: PropTypes.string.isRequired,
}

export default CalendarTimePicker
