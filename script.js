// Fetch Anime Data from Jikan API
fetch('https://api.jikan.moe/v4/anime')
  .then(response => response.json())
  .then(data => {
    const animeList = data.data;
    const animeCards = document.getElementById('anime-cards');
    
    animeList.forEach(anime => {
      const card = document.createElement('div');
      card.classList.add('anime-card');
      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <a href="anime.html?id=${anime.mal_id}">View Details</a>
      `;
      animeCards.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching anime:', error));

// Anime Detail Page Logic (on anime.html)
if (window.location.pathname.includes('anime.html')) {
  const params = new URLSearchParams(window.location.search);
  const animeId = params.get('id');
  
  fetch(`https://api.jikan.moe/v4/anime/${animeId}`)
    .then(response => response.json())
    .then(data => {
      const anime = data.data;
      document.getElementById('anime-title').textContent = anime.title;
      document.getElementById('anime-img').src = anime.images.jpg.image_url;
      document.getElementById('anime-description').textContent = anime.synopsis;
    })
    .catch(error => console.error('Error fetching anime details:', error));
}
