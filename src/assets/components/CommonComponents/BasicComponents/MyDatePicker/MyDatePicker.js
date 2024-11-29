import React, {useState} from "react";
import {Calendar} from "react-multi-date-picker"

export default function MyDatePicker({type, inputValues, inputRangeValues, onUpdateRangeValues}) {
    const [values, setValues] = useState(
        inputValues
        // [new DateObject()]
    )
    const [rangeValues, setRangeValues] = useState(
        inputRangeValues
        // [
        //     [new DateObject().set({day: 1}), new DateObject().set({day: 3})],
        //     [new DateObject().set({day: 6}), new DateObject().set({day: 12})],
        //     [new DateObject().set({day: 23}), new DateObject().set({day: 27})],
        // ]
    )

    function updateForValues(newDateValues) {
        console.log("handle change date: ", newDateValues)
        //console.log(date.year) //2021
        //console.log(date.month.number) //3
        //console.log(date.day) //2
        //console.log(date.calendar) //gregorian
        //console.log(date.locale) //en
        //console.log(date.format()) //2021/03/02
        //console.log(date.format("dddd DD MMMM YYYY")) //Tuesday 02 March 2021
        setValues(newDateValues)
    }

    function handleUpdateForRangeValues(newRangeValues) {
        console.log("handle change date range: ", newRangeValues)
        // setRangeValues(newRangeValues)
        if (onUpdateRangeValues !== undefined && onUpdateRangeValues !== null) {
            onUpdateRangeValues(newRangeValues)
        }
    }

    console.log("input type: ", type)
    if (type === "Range") {
        return (
            <Calendar
                value={rangeValues}
                onChange={handleUpdateForRangeValues}
                multiple
                range
            />
        )
    } else {
        return (
            <Calendar
                value={values}
                onChange={updateForValues}
            />
        )
    }
}