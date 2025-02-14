// js/events.js - Handles the events calendar and dynamic upcoming events list

export function initEventsCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) {
      console.error('Calendar element not found');
      return;
    }
    
    // Array of detailed events with start/end times and descriptions
    const events = [
      {
        title: 'Weekly Game Night',
        start: '2025-03-01T19:00:00',
        end: '2025-03-01T22:00:00',
        description: 'Join us every Friday for an exciting night of board game challenges!'
      },
      {
        title: 'Strategy Tournament',
        start: '2025-03-05T18:00:00',
        end: '2025-03-05T21:00:00',
        description: 'Compete in our monthly tournaments and test your strategic prowess.'
      },
      {
        title: 'Board Game Workshop',
        start: '2025-03-10T14:00:00',
        end: '2025-03-10T17:00:00',
        description: 'Learn new strategies and game rules in our hands-on workshop.'
      },
      {
        title: 'Family Game Day',
        start: '2025-03-15T11:00:00',
        end: '2025-03-15T15:00:00',
        description: 'Fun games for the entire family in a relaxed setting.'
      },
      {
        title: 'Thematic Game Night',
        start: '2025-03-20T19:30:00',
        end: '2025-03-20T22:30:00',
        description: 'Join our themed game night for a unique and immersive experience.'
      },
      {
        title: 'Late Night Gaming',
        start: '2025-03-25T23:00:00',
        end: '2025-03-26T02:00:00',
        description: 'Enjoy our late-night session under the stars!'
      }
      // You can add more events here as needed.
    ];
    
    // Initialize FullCalendar with multiple views (month, week, day, list)
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      events: events,
      eventClick: function(info) {
        const startDate = new Date(info.event.start);
        const endDate = new Date(info.event.end);
        alert(`Event: ${info.event.title}\nDate: ${startDate.toLocaleDateString()}\nTime: ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n\nDescription: ${info.event.extendedProps.description}`);
      }
    });
    
    calendar.render();
    
    // Populate the dynamic list view of upcoming events
    const eventListEl = document.querySelector('.event-list');
    if (eventListEl) {
      events.forEach(event => {
        const li = document.createElement('li');
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        li.innerHTML = `
          <strong>${event.title}</strong><br>
          Date: ${startDate.toLocaleDateString()}<br>
          Time: ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br>
          <em>${event.description}</em>
        `;
        eventListEl.appendChild(li);
      });
    }
  }
  