/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "@fullcalendar/daygrid",
  "@fullcalendar/timegrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

module.exports = withTM({
  // any other next.js settings here
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
});
