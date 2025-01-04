import React, { useState, useEffect } from 'react';
import axios from '../utils/api';
import BookingSummary from './BookingSummary'; 
import { FaUser, FaPhone, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    contact: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.date) {
      const fetchAvailableSlots = async () => {
        try {
          const response = await axios.get(`/bookings/available-slots?date=${formData.date}`);
          setAvailableSlots(response.data.availableSlots);
        } catch {
          setMessage('Failed to fetch available time slots');
        }
      };
      fetchAvailableSlots();
    }
  }, [formData.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/bookings/create', formData);
      setMessage('Booking successful!');
      setBooking(response.data.booking);
    } catch (err) {
      console.error('Error creating booking:', err); // Log the error
      setMessage('Booking failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="bg-black bg-opacity-70 w-full max-w-xl p-8 sm:p-10 md:p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">Book a Table</h2>

        {booking ? (
          <BookingSummary booking={booking} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaCalendarAlt className="text-blue-400 text-xl" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <FaClock className="text-blue-400 text-xl" />
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a time</option>
                {availableSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <FaUsers className="text-blue-400 text-xl" />
              <input
                type="number"
                name="guests"
                min="1"
                max="25"
                value={formData.guests}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <FaUser className="text-blue-400 text-xl" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full p-4 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex items-center space-x-4">
              <FaPhone className="text-blue-400 text-xl" />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Your Contact"
                className="w-full p-4 bg-gray-100 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
            >
              Reserve Table
            </button>
          </form>
        )}

        {message && (
          <p
            className={`text-center text-lg mt-4 ${
              message.includes('successful') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
