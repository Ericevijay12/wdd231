document.addEventListener('DOMContentLoaded', async () => {
    // Fetch weather data from OpenWeatherMap API
    const weatherSection = document.getElementById('weather-data');
    const apiKey = '01d11555e6c0b084399b4e11267965a4'; // Your API key
    const city = 'Lagos'; // Replace with your city
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(weatherUrl);
      const data = await response.json();
  
      // Extract current weather data
      const currentWeather = data.list[0];
      const currentTemp = Math.round(currentWeather.main.temp); // Round to zero decimal points
      const currentDescription = currentWeather.weather
        .map(event => event.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')) // Capitalize each word
        .join(', '); // Join multiple weather events
  
      // Extract 3-day forecast
      const forecast = data.list.filter((item, index) => index % 8 === 0).slice(0, 3); // Get one forecast per day
  
      // Display current weather
      weatherSection.innerHTML = `
        <div class="weather-card">
          <h3>Current Weather</h3>
          <p><strong>Temperature:</strong> ${currentTemp}°C</p>
          <p><strong>Description:</strong> ${currentDescription}</p>
        </div>
      `;
  
      // Display 3-day forecast
      forecast.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temp = Math.round(day.main.temp); // Round to zero decimal points
        const description = day.weather
          .map(event => event.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')) // Capitalize each word
          .join(', '); // Join multiple weather events
  
        weatherSection.innerHTML += `
          <div class="weather-card">
            <h3>${date}</h3>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Description:</strong> ${description}</p>
          </div>
        `;
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      weatherSection.innerHTML = '<p class="error">Unable to load weather data. Please try again later.</p>';
    }
  
    // Fetch and display spotlight members
    const spotlightSection = document.getElementById('spotlight-cards');
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();
  
      // Filter gold and silver members
      const goldSilverMembers = members.filter(member => member.membershipLevel >= 2);
  
      // Randomly select 2–3 members
      const randomMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
  
      // Display spotlight members
      spotlightSection.innerHTML = randomMembers.map(member => `
        <div class="spotlight-card">
          <img src="${member.image}" alt="${member.name}" loading="lazy">
          <div class="spotlight-content">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone || 'N/A'}</p>
            <p><strong>Address:</strong> ${member.location}</p>
            <p><strong>Website:</strong> <a href="${member.details}" target="_blank">Visit</a></p>
            <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading member data:', error);
      spotlightSection.innerHTML = '<p class="error">Unable to load spotlight data.</p>';
    }
  
    // Fade-in animation for event cards
    const eventCards = document.querySelectorAll('.event-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  
    eventCards.forEach(card => {
      observer.observe(card);
    });
  
    // Display last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
  
    // Display copyright year
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  });