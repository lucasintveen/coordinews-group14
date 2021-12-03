import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calender.css";

const ReactCalendar = () => {
    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date)
    }

    return (
        <div>
            <Calendar onChange={onChange} value={date} />
        </div>
    )
}