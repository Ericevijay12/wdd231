// js/games.js - Handles Games Library functionality

export async function fetchGames() {
    const url = 'js/games-data.json';
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      displayGames(data.games);
    } catch (error) {
      console.error('Failed to fetch games:', error);
    }
  }
  
  function displayGames(games) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';
    const gamesToShow = games.slice(0, 15); // Display first 15 games
    gamesToShow.forEach(game => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.innerHTML = `
        <h3>${game.title}</h3>
        <p>Difficulty: ${game.difficulty}</p>
        <p>Duration: ${game.duration} mins</p>
        <p>Players: ${game.playerCount}</p>
        <button class="more-info" data-game-id="${game.id}">More Info</button>
      `;
      gamesContainer.appendChild(card);
    });
    
    // Event delegation: Open modal on "More Info" click
    gamesContainer.addEventListener('click', event => {
      if (event.target.classList.contains('more-info')) {
        const gameId = event.target.getAttribute('data-game-id');
        openGameModal(gameId);
      }
    });
  }
  
  function openGameModal(gameId) {
    const modal = document.getElementById('game-modal');
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `<h2>Game Details</h2><p>Details for game ID: ${gameId}</p>`;
    modal.style.display = 'flex';
  }
  
  export function initSearch() {
    const searchInput = document.getElementById('search-games');
    searchInput.addEventListener('input', event => {
      const query = event.target.value.toLowerCase();
      const cards = document.querySelectorAll('.game-card');
      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
      });
    });
  }
  