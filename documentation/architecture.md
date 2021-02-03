# Architecture

The server-client architecture fits to the use cases because: 
- the app must be available at any time, anywhere from a smartphone, a desktop computer
- the data must be centralised to a single place, accessible to all devices which could request the data. A raspberry connected to the internet appears to be the place to store the data.

## Backend
- an http server
- data is stored in a single file. No need for a DB because the number of users who will use the service will be 0, 1 or 2. The probability to have 2 users accessing the data at the same time is considered null.

## Frontend
- dynamic html page
- responsive
- with bootstrap styles
- d3.js graph library
