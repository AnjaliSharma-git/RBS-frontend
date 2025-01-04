import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate); 
    }
  };

  return (
    <div className="max-w-full sm:max-w-md mx-auto my-4 bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left">Select a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        minDate={new Date()} 
        className="react-calendar sm:w-auto w-full"
      />
      <p className="mt-4 text-sm text-gray-600 text-center sm:text-left">
        Selected Date: <strong>{date.toDateString()}</strong>
      </p>
    </div>
  );
};

export default CalendarView;
