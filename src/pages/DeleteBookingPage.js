import { useState } from 'react';
import axios from 'axios';

const DeleteBookingPage = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDeleteBooking = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }
    
    try {
      const fetchResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/bookings/bookings-by-user`, {
        params: { name: name.trim() }
      });
      
      if (!fetchResponse.data || fetchResponse.data.length === 0) {
        setError('No booking found for this name.');
        return;
      }

      const bookingToDelete = fetchResponse.data[0];
      console.log(`Attempting to delete booking: ${bookingToDelete._id} for ${name}`);
      
      const deleteResponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/delete-by-user/${bookingToDelete._id}`,
        {
          data: { name: name.trim() }
        }
      );

      setSuccess(deleteResponse.data.message || 'Booking deleted successfully.');
      setName(''); 
      
    } catch (err) {
      console.error('Error details:', err);
      
      if (err.response) {
        setError(err.response.data.message || 'Failed to delete the booking.');
      } else if (err.request) {
        setError('Unable to reach the server. Please check your connection.');
      } else {
        setError('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: 'url(/images/restaurant.jpg)' }}
    >
      <div className="bg-black bg-opacity-60 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-xl text-center max-w-lg sm:max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-shadow">
          Delete Your Booking
        </h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6">
          Enter your name to delete your booking.
        </p>

        {error && (
          <p className="text-red-500 mb-4 bg-black bg-opacity-50 p-2 rounded">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 mb-4 bg-black bg-opacity-50 p-2 rounded">
            {success}
          </p>
        )}

        <form onSubmit={handleDeleteBooking} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 bg-white text-black rounded-md shadow-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 bg-opacity-80 text-white py-3 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 text-lg"
          >
            Delete Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteBookingPage;