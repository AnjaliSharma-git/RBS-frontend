import Link from 'next/link';

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: 'url(/images/restaurant.jpg)' }}
    >
      <div className="bg-black bg-opacity-60 p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-xl text-center max-w-lg sm:max-w-xl w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-shadow">
          Welcome to Our Restaurant
        </h1>
        <p className="text-base sm:text-lg mb-4 sm:mb-6">
          Experience the finest dining with our exquisite menu and cozy ambiance, perfect for any occasion.
        </p>

        <div className="space-y-6">
          <Link
            href="/booking"
            className="bg-blue-500 bg-opacity-80 text-white py-3 px-6 rounded-lg shadow-xl transform transition-all hover:bg-blue-600 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 text-lg block w-full sm:w-auto mx-auto"
          >
            Book a Table (Calendar View)
          </Link>

          <Link
            href="/timeline"
            className="bg-green-500 bg-opacity-80 text-white py-3 px-6 rounded-lg shadow-xl transform transition-all hover:bg-green-600 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 text-lg block w-full sm:w-auto mx-auto"
          >
            View Timeline
          </Link>

          <Link
            href="/DeleteBookingPage"
            className="bg-red-500 bg-opacity-80 text-white py-3 px-6 rounded-lg shadow-xl transform transition-all hover:bg-red-600 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 text-lg block w-full sm:w-auto mx-auto"
          >
            Delete a Booking
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
