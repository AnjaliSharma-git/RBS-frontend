module.exports = {
    async rewrites() {
      return [
        {
          source: '/bookings/:path*',
          destination: 'https://rbs-backend-xhki.onrender.com/bookings/:path*', // Proxy requests to the backend
        },
      ];
    },
  };
  