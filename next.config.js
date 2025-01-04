module.exports = {
    async rewrites() {
      return [
        {
          source: '/bookings/:path*',
          destination: 'http://localhost:5000/bookings/:path*', // Proxy requests to the backend
        },
      ];
    },
  };
  