This is a [Next.js](https://nextjs.org/) project for practice.

# Requirements
- Landing page
- Signup + Login pages
- New user flow:
  - Select dates using a date picker
  - Select sleep & wake-up times using a time picker (HH:MM)
  - Calculate total sleep duration
  - Options to reset, cancel, and submit sleep log
- Existing user flow:
  - Show a list of saved entries for the last 7 days or 1 month
  - Entries should include: date, time of sleep, wake up time, and sleep duration
    - (Average sleep duration for the week)
    - (Average sleep and wake-up time)
  - Use a graph to visualise sleep data
  - ‘New Entry’ button

# Technical Implementation
- Database:
    - Firestore
- Next.js
- Material UI for UI components
- Jest for unit testing
- `react-vis` or `chart.js` for graph
- Firebase Auth for Google sign-up/login

# Wireframes
![Wireframes](/public/readme/wireframes_v1.png)
