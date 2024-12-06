/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/', // Match the root route
          destination: '/login', // Redirect to the login page
          permanent: false, // Set to true for permanent HTTP 301 redirects
        },
      ];
    },
  };
  
  export default nextConfig;