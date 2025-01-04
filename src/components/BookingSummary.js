import React from 'react';

const BookingSummary = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-md shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-3xl">Booking Summary</h2>
      <div className="space-y-3">
        <p className="text-sm sm:text-base">
          <strong>Date:</strong> {booking.date}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Time:</strong> {booking.time}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Guests:</strong> {booking.guests}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Name:</strong> {booking.name}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Contact:</strong> {booking.contact}
        </p>
      </div>
    </div>
  );
};

export default BookingSummary;
