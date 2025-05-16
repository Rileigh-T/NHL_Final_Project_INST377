let allPlayers = [];
let allTeams = [];
let playerChart; // For the Chart.js graph
let standingsData = []; // To store the standings data
let currentImageIndex = 0;
let slideInterval; // To store the interval ID for image rotation

// Map team names to 3 images each
const teamImages = {
  // Metropolitan Division
  "carolina hurricanes": [
    "https://static.wixstatic.com/media/3d7fb3_fce03b63b725457dbd5461ea383278ef~mv2_d_1690_1961_s_2.png/v1/fill/w_544,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_fce03b63b725457dbd5461ea383278ef~mv2_d_1690_1961_s_2.png",
    "https://static.wixstatic.com/media/3d7fb3_9adb2030a9884ff8abfe7a8ceecee62c~mv2.png/v1/fill/w_744,h_632,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_9adb2030a9884ff8abfe7a8ceecee62c~mv2.png",
    "https://www.trendsinternational.com/media/catalog/product/cache/5fb323206e711af980740cf91a7c422a/p/o/poster24083.jpg"
  ],
  "columbus blue jackets": [
    "https://static.wixstatic.com/media/3d7fb3_d92c2ba73d4845259be4263a5b3bfad1~mv2_d_3304_3872_s_4_2.png/v1/fill/w_539,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_d92c2ba73d4845259be4263a5b3bfad1~mv2_d_3304_3872_s_4_2.png",
    "https://static.wixstatic.com/media/3d7fb3_ea5be2e92d4f4e95b2998b3bd2f1e3f2~mv2_d_1850_2056_s_2.png/v1/fill/w_568,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_ea5be2e92d4f4e95b2998b3bd2f1e3f2~mv2_d_1850_2056_s_2.png",
    "https://static.wixstatic.com/media/3d7fb3_5e5df5cefdfc4099828bd81abeb755c7~mv2_d_2277_1901_s_2.png/v1/fill/w_756,h_632,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_5e5df5cefdfc4099828bd81abeb755c7~mv2_d_2277_1901_s_2.png"
  ],
  "new jersey devils": [
    "https://static.wixstatic.com/media/3d7fb3_8c37f6089de545a8ac53288a563ed3f3~mv2.png/v1/fill/w_420,h_420,al_c,lg_1,q_85,enc_auto/3d7fb3_8c37f6089de545a8ac53288a563ed3f3~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_a873859968ef49058a43f465675dea3c~mv2.png/v1/fill/w_420,h_420,al_c,lg_1,q_85,enc_auto/3d7fb3_a873859968ef49058a43f465675dea3c~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_0ecdcd3bbc6e41b4be0a5be9f29dd261~mv2.png/v1/fill/w_552,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_0ecdcd3bbc6e41b4be0a5be9f29dd261~mv2.png"
  ],
  "new york islanders": [
    "https://static.wixstatic.com/media/3d7fb3_7184749252074928ae64295947be9b46~mv2.png/v1/fill/w_1122,h_631,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_7184749252074928ae64295947be9b46~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_64f2a296e15947c6b11415fd48a602af~mv2.png/v1/fill/w_530,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_64f2a296e15947c6b11415fd48a602af~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_03e4cf1904634259a7c58eeefa5fc988~mv2_d_3084_2056_s_2.png/v1/fill/w_947,h_631,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_03e4cf1904634259a7c58eeefa5fc988~mv2_d_3084_2056_s_2.png"
  ],
  "new york rangers": [
    "https://www.pngkey.com/png/full/172-1727292_michael-grabner-new-york-rangers.png",
    "https://static.wixstatic.com/media/3d7fb3_bcd6a78405b2420d83d7f5b4c54a3d60~mv2_d_3000_2826_s_4_2.png/v1/fill/w_670,h_632,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_bcd6a78405b2420d83d7f5b4c54a3d60~mv2_d_3000_2826_s_4_2.png",
    "https://static.wixstatic.com/media/3d7fb3_dd538f0029664a208a882a69b9f81db6~mv2.png/v1/fill/w_720,h_360,al_c,lg_1,q_85,enc_auto/3d7fb3_dd538f0029664a208a882a69b9f81db6~mv2.png"
  ],
  "philadelphia flyers": [
    "https://static.wixstatic.com/media/3d7fb3_c7b00b9068074e5b8bba591875861dff~mv2.png/v1/fill/w_420,h_420,al_c,lg_1,q_85,enc_auto/3d7fb3_c7b00b9068074e5b8bba591875861dff~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_0fc11333dd2e4bf28976a40aa06557d9~mv2.png/v1/fill/w_350,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_0fc11333dd2e4bf28976a40aa06557d9~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_74ac48160a364eabb7ef478bc81dd9d8~mv2_d_2687_3000_s_4_2.png/v1/fill/w_566,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_74ac48160a364eabb7ef478bc81dd9d8~mv2_d_2687_3000_s_4_2.png"
  ],
  "pittsburgh penguins": [
    "https://static.wixstatic.com/media/3d7fb3_ab8f53c1891e472b983b98c514dd9581~mv2.png/v1/fill/w_626,h_632,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_ab8f53c1891e472b983b98c514dd9581~mv2.png",
    "https://static.wixstatic.com/media/3d7fb3_6805d4b25daa45d9886d3b51ac00fd58~mv2_d_2043_3000_s_2.png/v1/fill/w_430,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_6805d4b25daa45d9886d3b51ac00fd58~mv2_d_2043_3000_s_2.png",
    "https://static.wixstatic.com/media/3d7fb3_bcd865f6906f48629e61251df310f01c~mv2_d_2209_1291_s_2.png/v1/fill/w_1080,h_631,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_bcd865f6906f48629e61251df310f01c~mv2_d_2209_1291_s_2.png"
  ],
  "washington capitals": [
    "https://static.wixstatic.com/media/3d7fb3_15def2d0a3654217af42c354b64611e5~mv2.png/v1/fill/w_535,h_632,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/3d7fb3_15def2d0a3654217af42c354b64611e5~mv2.png",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d92b8805-8cab-4cc6-9aa7-2d130577f990/d82x4e0-5c7b9bf7-f316-45dd-a4e1-46cf0db1fdeb.png/v1/fill/w_1024,h_853/alexander_ovechkin_png__1_by_meganl125_d82x4e0-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODUzIiwicGF0aCI6IlwvZlwvZDkyYjg4MDUtOGNhYi00Y2M2LTlhYTctMmQxMzA1NzdmOTkwXC9kODJ4NGUwLTVjN2I5YmY3LWYzMTYtNDVkZC1hNGUxLTQ2Y2YwZGIxZmRlYi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.NaS_VBrz3aYVw7-xUfkkHTsyvuW3Z-37QG8ZAsOoV6Y",
    "https://static.wixstatic.com/media/3d7fb3_526ff73a2aa540c896a218fae74013ab~mv2_d_3995_3995_s_4_2.png/v1/fill/w_632,h_632,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/3d7fb3_526ff73a2aa540c896a218fae74013ab~mv2_d_3995_3995_s_4_2.png"
  ],
  
  // Atlantic Division
  "boston bruins": [
    "https://example.com/bruins-logo.png",
    "https://example.com/bruins-player.png",
    "https://example.com/bruins-arena.png"
  ],
  "buffalo sabres": [
    "https://example.com/sabres-logo.png",
    "https://example.com/sabres-player.png",
    "https://example.com/sabres-arena.png"
  ],
  "detroit red wings": [
    "https://example.com/redwings-logo.png",
    "https://example.com/redwings-player.png",
    "https://example.com/redwings-arena.png"
  ],
  "florida panthers": [
    "https://example.com/panthers-logo.png",
    "https://example.com/panthers-player.png",
    "https://example.com/panthers-arena.png"
  ],
  "montreal canadiens": [
    "https://example.com/canadiens-logo.png",
    "https://example.com/canadiens-player.png",
    "https://example.com/canadiens-arena.png"
  ],
  "ottawa senators": [
    "https://example.com/senators-logo.png",
    "https://example.com/senators-player.png",
    "https://example.com/senators-arena.png"
  ],
  "tampa bay lightning": [
    "https://example.com/lightning-logo.png",
    "https://example.com/lightning-player.png",
    "https://example.com/lightning-arena.png"
  ],
  "toronto maple leafs": [
    "https://example.com/mapleleafs-logo.png",
    "https://example.com/mapleleafs-player.png",
    "https://example.com/mapleleafs-arena.png"
  ],
  
  // Central Division
  "arizona coyotes": [
    "https://example.com/coyotes-logo.png",
    "https://example.com/coyotes-player.png",
    "https://example.com/coyotes-arena.png"
  ],
  "chicago blackhawks": [
    "https://example.com/blackhawks-logo.png",
    "https://example.com/blackhawks-player.png",
    "https://example.com/blackhawks-arena.png"
  ],
  "colorado avalanche": [
    "https://example.com/avalanche-logo.png",
    "https://example.com/avalanche-player.png",
    "https://example.com/avalanche-arena.png"
  ],
  "dallas stars": [
    "https://example.com/stars-logo.png",
    "https://example.com/stars-player.png",
    "https://example.com/stars-arena.png"
  ],
  "minnesota wild": [
    "https://example.com/wild-logo.png",
    "https://example.com/wild-player.png",
    "https://example.com/wild-arena.png"
  ],
  "nashville predators": [
    "https://example.com/predators-logo.png",
    "https://example.com/predators-player.png",
    "https://example.com/predators-arena.png"
  ],
  "st. louis blues": [
    "https://example.com/blues-logo.png",
    "https://example.com/blues-player.png",
    "https://example.com/blues-arena.png"
  ],
  "winnipeg jets": [
    "https://example.com/jets-logo.png",
    "https://example.com/jets-player.png",
    "https://example.com/jets-arena.png"
  ],
  
  // Pacific Division
  "anaheim ducks": [
    "https://example.com/ducks-logo.png",
    "https://example.com/ducks-player.png",
    "https://example.com/ducks-arena.png"
  ],
  "calgary flames": [
    "https://example.com/flames-logo.png",
    "https://example.com/flames-player.png",
    "https://example.com/flames-arena.png"
  ],
  "edmonton oilers": [
    "https://example.com/oilers-logo.png",
    "https://example.com/oilers-player.png",
    "https://example.com/oilers-arena.png"
  ],
  "los angeles kings": [
    "https://example.com/kings-logo.png",
    "https://example.com/kings-player.png",
    "https://example.com/kings-arena.png"
  ],
  "san jose sharks": [
    "https://example.com/sharks-logo.png",
    "https://example.com/sharks-player.png",
    "https://example.com/sharks-arena.png"
  ],
  "seattle kraken": [
    "https://example.com/kraken-logo.png",
    "https://example.com/kraken-player.png",
    "https://example.com/kraken-arena.png"
  ],
  "vancouver canucks": [
    "https://example.com/canucks-logo.png",
    "https://example.com/canucks-player.png",
    "https://example.com/canucks-arena.png"
  ],
  "vegas golden knights": [
    "https://example.com/goldenknights-logo.png",
    "https://example.com/goldenknights-player.png",
    "https://example.com/goldenknights-arena.png"
  ]
};

// Fetch all player 
async function fetchAllPlayers() {
  const url = 'https://api.nhle.com/stats/rest/en/skater/summary?limit=-1&cayenneExp=seasonId=20232024';
  try {
    const res = await fetch(url);
    const data = await res.json();
    allPlayers = data.data;
  } catch (error) {
    console.error('Error fetching player data:', error);
  }
}

// Fetch all team stats
async function fetchAllTeams() {
  const url = 'https://api.nhle.com/stats/rest/en/team/summary?limit=-1&cayenneExp=seasonId=20232024';
  try {
    const res = await fetch(url);
    const data = await res.json();
    allTeams = data.data;
  } catch (error) {
    console.error('Error fetching team data:', error);
  }
}

// Fetch standings data
async function fetchStandings() {
  const url = 'https://api-web.nhle.com/v1/standings-season';
  try {
    const res = await fetch(url);
    const data = await res.json();
    standingsData = data.seasons;
    displayStandings();
  } catch (error) {
    console.error('Error fetching standings data:', error);
  }
}

// Display standings data
function displayStandings() {
  const standingsDiv = document.getElementById("standings-result");
  if (standingsData.length === 0) {
    standingsDiv.innerHTML = "<p>No standings data available.</p>";
    return;
  }

  let standingsHTML = "<h2>Season Standings</h2><ul>";
  standingsData.forEach(season => {
    standingsHTML += `
      <li><strong>Season: ${season.id}</strong><br>
        <ul>
          <li>Start Date: ${season.standingsStart}</li>
          <li>End Date: ${season.standingsEnd}</li>
          <li>Ties in Use: ${season.tiesInUse ? 'Yes' : 'No'}</li>
        </ul>
      </li>
    `;
  });
  standingsHTML += "</ul>";
  standingsDiv.innerHTML = standingsHTML;
}

// Search for a player
function searchPlayer(name) {
  const resultDiv = document.getElementById("player-result");
  if (!name.trim()) {
    resultDiv.innerHTML = "<p>Please enter a player's name.</p>";
    if (playerChart) {
      playerChart.destroy();
    }
    return;
  }

  const inputName = name.trim().toLowerCase();
  const player = allPlayers.find(p =>
    p.skaterFullName.toLowerCase().includes(inputName)
  );

  if (!player) {
    resultDiv.innerHTML = "<p>No player found.</p>";
    if (playerChart) {
      playerChart.destroy();
    }
    return;
  }

  resultDiv.innerHTML = ` 
    <h2>${player.skaterFullName}</h2>
    <ul>
      <li>Team: ${player.teamAbbrevs}</li>
      <li>Games Played: ${player.gamesPlayed}</li>
      <li>Goals: ${player.goals}</li>
      <li>Assists: ${player.assists}</li>
      <li>Points: ${player.points}</li>
      <li>Plus/Minus: ${player.plusMinus}</li>
      <li>TOI/Game: ${player.timeOnIcePerGame}</li>
    </ul>
  `;
}

// Simple function to rotate team images
function startImageSlideshow(images) {
  // Clear any existing interval
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  
  // Reset current image index
  currentImageIndex = 0;
  
  const imageColumnDiv = document.getElementById("team-images");
  imageColumnDiv.innerHTML = ""; // Clear previous content
  
  // Create a single image element that will be updated
  const imgElement = document.createElement("img");
  imgElement.id = "slideshow-image";
  imgElement.alt = "Team image";
  imgElement.src = images[0]; // Start with first image
  
  imageColumnDiv.appendChild(imgElement);
  
  // Set interval to change image every 3 seconds
  slideInterval = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imgElement.src = images[currentImageIndex];
  }, 3000);
}

// Search for a team
function searchTeam(name) {
    const message = document.getElementById("team-message");
    if (message) message.style.display = "none";
    const resultDiv = document.getElementById("team-result");
  
  if (!name.trim()) {
    resultDiv.innerHTML = "<p>Please enter a team name.</p>";
    return;
  }

  const inputName = name.trim().toLowerCase();
  const team = allTeams.find(t =>
    t.teamFullName.toLowerCase().includes(inputName)
  );

  if (!team) {
    resultDiv.innerHTML = "<p>No team found.</p>";
    return;
  }

  resultDiv.innerHTML = ` 
    <h2>${team.teamFullName}</h2>
    <ul>
      <li>Games Played: ${team.gamesPlayed}</li>
      <li>Wins: ${team.wins}</li>
      <li>Losses: ${team.losses}</li>
      <li>OT Losses: ${team.otLosses}</li>
      <li>Goals For: ${team.goalsFor}</li>
      <li>Goals Against: ${team.goalsAgainst}</li>
      <li>Power Play %: ${team.powerPlayPct.toFixed(2)}%</li>
      <li>Penalty Kill %: ${team.penaltyKillNetPct.toFixed(2)}%</li>
      <li>Shots Per Game: ${team.shotsForPerGame.toFixed(1)}</li>
    </ul>
    <div>
      <canvas id="shotsChart"></canvas>
    </div>
  `;

  // Add team images to the image column if available
  const teamKey = team.teamFullName.toLowerCase();
  const images = teamImages[teamKey];

  if (images && images.length > 0) {
    // Start the image slideshow with the team's images
    startImageSlideshow(images);
  }

  // Create Shot Chart
  createShotsChart();
}

// Create Shot Chart for teams
async function createShotsChart() {
  const res = await fetch("https://api.nhle.com/stats/rest/en/team/summary?sort=shotsForPerGame&cayenneExp=seasonId=20232024%20and%20gameTypeId=2");
  const data = await res.json();
  const teams = data.data;

  const labels = teams.map(t => t.teamFullName);
  const shots = teams.map(t => t.shotsForPerGame);

  // Chart.js
  const ctx = document.getElementById("shotsChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
        labels: labels,
        datasets: [{
        label: "Avg Shots For per Game (2023-24)",
        data: shots,
        backgroundColor: "rgba(162, 225, 225, 0.77)"
        }]
    },
    options: {
        responsive: true,
        indexAxis: "y",
        scales: {
        x: {
            beginAtZero: true,
            ticks: {
            color: "white"
            },
            grid: {
            color: "rgba(255, 255, 255, 0.2)" // optional for subtle grid
            }
        },
        y: {
            ticks: {
            color: "white"
            },
            grid: {
            color: "rgba(255, 255, 255, 0.2)" // optional for subtle grid
            }
        }
        },
        plugins: {
        legend: {
            labels: {
            color: "white"
            }
        },
        tooltip: {
            bodyColor: "white",
            titleColor: "white"
        }
        }
    }
    });
}

// Event listeners
document.getElementById("search-button").addEventListener("click", () => {
    const message = document.getElementById("player-message");
    if (message) message.style.display = "none";
    const name = document.getElementById("player-name").value;
    searchPlayer(name);
});

document.getElementById("team-search-button").addEventListener("click", () => {
  const name = document.getElementById("team-name").value;
  searchTeam(name);
});

// Fetch data on load
fetchAllPlayers();
fetchAllTeams();
fetchStandings();