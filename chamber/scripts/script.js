document.addEventListener('DOMContentLoaded', async () => {
    const directory = document.getElementById('directory');
    const gridView = document.getElementById('gridView');
    const listView = document.getElementById('listView');
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
  
    // Fetch member data from members.json
    let members = [];
    try {
      const response = await fetch('data/members.json');
      members = await response.json();
    } catch (error) {
      console.error('Error loading member data:', error);
    }
  
    // Display members
    function displayMembers(viewType, data = members) {
      directory.innerHTML = ''; // Clear current content
      data.forEach(member => {
        const card = document.createElement('div');
        card.className = 'card';
  
        card.innerHTML = `
          <img src="${member.image}" alt="${member.name}" loading="lazy">
          <div class="card-content">
            <h3>${member.name}</h3>
            <p>${member.location}</p>
            <p>Established: ${member.established}</p>
            <p>Membership Level: ${member.membershipLevel}</p>
            <a href="${member.details}" target="_blank">Details</a>
          </div>
        `;
  
        directory.appendChild(card);
      });
      directory.className = viewType;
    }
  
    // Initial view as grid
    displayMembers('grid');
  
    // Toggle views
    gridView.addEventListener('click', () => {
      displayMembers('grid');
      gridView.classList.add('active');
      listView.classList.remove('active');
    });
  
    listView.addEventListener('click', () => {
      displayMembers('list');
      listView.classList.add('active');
      gridView.classList.remove('active');
    });
  
    // Toggle mobile menu
    menuButton.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  
    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm)
      );
      displayMembers('grid', filteredMembers);
    });
  
    // Sort functionality
    sortSelect.addEventListener('change', (e) => {
      const sortBy = e.target.value;
      const sortedMembers = [...members].sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
      displayMembers('grid', sortedMembers);
    });
  
    // Display last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
  
    // Display copyright year
    document.getElementById('copyrightYear').textContent = new Date().getFullYear();
  });