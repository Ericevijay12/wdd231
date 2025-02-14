// js/reservations.js - Handles the reservation form
export function initReservationForm() {
    const form = document.getElementById('reservation-form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = form.elements['name'].value.trim();
      const date = form.elements['date'].value.trim();
      const time = form.elements['time'].value.trim();
      const partySize = form.elements['party-size'].value;
      if (!name || !date || !time) {
        alert('Please fill in all required fields.');
        return;
      }
      const reservation = { name, date, time, partySize };
      localStorage.setItem('reservation', JSON.stringify(reservation));
      alert('Reservation successful!');
      form.reset();
    });
  }
  