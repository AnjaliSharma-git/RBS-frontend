import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimelineView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const fetchSlots = async () => {
        setLoading(true);
        setError(null);

        try {
          const formattedDate = selectedDate.toISOString().split('T')[0]; 
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings/available-slots`, {
            params: { date: formattedDate },
          });

          const { availableSlots, bookedSlots } = response.data;
          const allSlots = [
            ...bookedSlots.map((slot) => ({ time: slot, status: 'booked' })),
            ...availableSlots.map((slot) => ({ time: slot, status: 'available' })),
          ];

          allSlots.sort((a, b) => {
            const parseTime = (time) =>
              new Date(`1970-01-01T${time.replace(/(AM|PM)/, '')}:00${time.includes('PM') ? ' PM' : ' AM'}`);
            return parseTime(a.time) - parseTime(b.time);
          });

          setSlots(allSlots);
        } catch (err) {
          setError('Failed to load slots. Please try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchSlots();
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  if (loading) {
    return <p className="text-center text-white">Loading slots...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!slots.length) {
    return <p className="text-center text-white">No slots available for the selected date.</p>;
  }

  return (
    <div className="timeline-view">
      <div className="calendar-container mb-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-left text-white">
          Select a Date
        </h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()} 
          className="p-2 rounded-md shadow-md"
        />
        <p className="mt-4 text-sm  text-center sm:text-left text-white">
          Selected Date: <strong>{selectedDate.toDateString()}</strong>
        </p>
      </div>

      <h2 className="text-xl font-bold text-white text-center mb-4">
        Timeline View for {selectedDate.toDateString()}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow-md text-center ${slot.status === 'booked' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
          >
            <p className="text-lg font-semibold">{slot.time}</p>
            <p className="text-sm">
              {slot.status === 'booked' ? 'Fully Booked' : 'Available'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineView;
