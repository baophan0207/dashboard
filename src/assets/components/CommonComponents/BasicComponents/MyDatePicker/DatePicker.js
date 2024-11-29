import React, {useState} from "react"
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
// import {Calendar} from "react-modern-calendar-datepicker";

export default function MyDatePicker(data) {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [selectedDays, setSelectedDays] = useState([]);

    const onChangeSingleDate = (date) => {
        console.log("onChange single date: ", date)
        setSelectedDay(date)
    }

    return (
        data.pickerType === "single" ?
            <DatePicker
                value={selectedDay}
                onChange={onChangeSingleDate}
                inputPlaceholder="Select a day"
                shouldHighlightWeekends
            />
            :
            data.pickerType === "range" ?
                <>
                    {/*<Calendar*/}
                    {/*    value={selectedDayRange}*/}
                    {/*    onChange={setSelectedDayRange}*/}
                    {/*    shouldHighlightWeekends*/}
                    {/*/>*/}
                    <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                        inputPlaceholder="Select a day range"
                        shouldHighlightWeekends
                    />
                </>
                :
                data.pickerType === "multiple" ?
                    <>
                        {/*<Calendar*/}
                        {/*    value={selectedDays}*/}
                        {/*    onChange={setSelectedDays}*/}
                        {/*    shouldHighlightWeekends*/}
                        {/*/>*/}
                        <DatePicker
                            value={selectedDays}
                            onChange={setSelectedDays}
                            inputPlaceholder="Select the dates"
                            shouldHighlightWeekends
                        />
                    </>
                    :
                    null
    );
};