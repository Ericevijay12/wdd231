// js/main.js - Entry point for site-wide functionality

import { initEventsCalendar } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize events calendar if the 'calendar' element exists
  if (document.getElementById('calendar')) {
    initEventsCalendar();
  }
  
  // Additional module initialization can be added here (e.g., dark mode toggle)
});
