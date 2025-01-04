import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker'; 

const CalendarView = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); 
  };

  return (
    <div className="calendar-container">
      <DayPicker selected={selectedDate} onDayClick={handleDateChange} />
      {selectedDate && (
        <div className="mt-4 text-center">
          <p className="text-xl">Selected Date: {selectedDate.toDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
