import React, { useState } from 'react';
import TimelineView from '../components/TimelineView'; 
import BookingForm from '../components/BookingForm';

const TimelinePage = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: 'url(/images/restaurant.jpg)' }}>
      <div className="bg-black bg-opacity-50 py-12 px-4 sm:px-8 md:px-12 rounded-lg shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-6">Restaurant Table Booking - Timeline</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center p-6 rounded-lg shadow-md">
            <TimelineView onTimeSlotSelect={handleTimeSlotSelect} />
          </div>

          {selectedTimeSlot && (
            <div className="p-6 rounded-lg shadow-md flex flex-col items-center justify-center space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">Selected Time Slot: {selectedTimeSlot}</h2>
              <BookingForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
