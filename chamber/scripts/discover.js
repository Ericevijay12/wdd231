document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------
    // Visitor Information Display in the Sidebar Element
    // ----------------------------------------------
    const visitMessageEl = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = new Date().getTime();
    localStorage.setItem('lastVisit', currentTime);
  
    if (!lastVisit) {
      visitMessageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const timeDiff = currentTime - parseInt(lastVisit, 10);
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      if (daysDiff < 1) {
        visitMessageEl.textContent = "Back so soon! Awesome!";
      } else {
        visitMessageEl.textContent = `You last visited ${daysDiff} day${daysDiff === 1 ? '' : 's'} ago.`;
      }
    }
  
    // ----------------------------------------------
    // Church Cards Data & Dynamic Creation
    // ----------------------------------------------
    const churches = [
      {
        name: "Redeemed Christian Church of God",
        location: "Lagos, Nigeria",
        image: "https://www.rccg.org/wp-content/uploads/2020/11/rccg-for-web.png",
        description: "One of the largest Pentecostal churches in Nigeria.",
        website: "https://www.rccg.org"
      },
      {
        name: "Living Faith Church Worldwide",
        location: "Ota, Ogun State, Nigeria",
        image: "https://i.postimg.cc/KjJHq5D4/Winnerschapellogo.gif",
        description: "Famous for its faith-based teachings.",
        website: "https://faithtabernacle.org.ng/"
      },
      {
        name: "Mountain of Fire and Miracles Ministries",
        location: "Yaba, Lagos, Nigeria",
        image: "https://i.postimg.cc/KzbpmW9R/download.jpg",
        description: "Known for its deliverance ministries.",
        website: "https://www.mountainoffire.org/"
      },
      {
        name: "Christ Embassy",
        location: "Lagos, Nigeria",
        image: "https://i.postimg.cc/VsGgh5cS/download.jpg",
        description: "A global ministry with the LoveWorld network.",
        website: "https://christembassy.org/"
      },
      {
        name: "Deeper Christian Life Ministry",
        location: "Gbagada, Lagos, Nigeria",
        image: "https://i.postimg.cc/7Z7NbVJ7/download.jpg",
        description: "Known for deep Bible teachings.",
        website: "https://dclm.org/"
      },
      {
        name: "Dunamis International Gospel Centre",
        location: "Abuja, Nigeria",
        image: "https://i.postimg.cc/h458rw9T/download.jpg",
        description: "Led by Dr. Paul Enenche.",
        website: "https://dunamisgospel.org/"
      },
      {
        name: "Synagogue Church of All Nations",
        location: "Ikotun, Lagos, Nigeria",
        image: "https://i.postimg.cc/Gm8cZXgW/download.jpg",
        description: "Founded by T.B. Joshua.",
        website: "https://www.scoan.org/"
      },
      {
        name: "House on the Rock",
        location: "Lagos, Nigeria",
        image: "https://i.postimg.cc/hjrg96hd/download.png",
        description: "Hosts The Experience concert.",
        website: "https://houseontherock.org.ng/"
      }
    ];
  
    const gridContainer = document.querySelector('.grid-container');
    churches.forEach((church, index) => {
      const card = document.createElement('article');
      card.className = 'card';
      // Set a named grid area for each card (card1, card2, etc.)
      card.style.gridArea = 'card' + (index + 1);
  
      const shapes = ['circle', 'angle', 'heart', 'square', 'hexagon', 'triangle', 'oval', 'star'];
      const shapeClass = shapes[index % shapes.length];
      card.innerHTML = `
        <h2>${church.name}</h2>
        <figure class="${shapeClass}">
          <img src="${church.image}" alt="${church.name}" loading="lazy">
        </figure>
        <address>${church.location}</address>
        <p>${church.description}</p>
        <a href="${church.website}" target="_blank">
          <button>Learn More</button>
        </a>
      `;
      gridContainer.appendChild(card);
    });
  });
  