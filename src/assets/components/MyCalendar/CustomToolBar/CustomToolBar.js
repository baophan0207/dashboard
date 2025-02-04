import React from 'react'

import MyDropDown from '../../CommonComponents/BasicComponents/MyDropDown/MyDropDown'
import ToggleButton from '../../CommonComponents/BasicComponents/ToggleButton/ToggleButton'
import CalendarTimePicker from '../CalendarTimePicker'

class CustomToolBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
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

    render() {
        const {
            showOptionSelected,
            viewByActiveOption,
            onChangeShowOption,
            onClickViewByOption,
        } = this.props

        return (
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
                            onChange={(e) => onChangeShowOption(e)}
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
                            onClickOptionHandler={(e) => onClickViewByOption(e)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomToolBar
