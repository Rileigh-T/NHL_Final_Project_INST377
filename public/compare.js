const milestones = {
  "1000 Point Career": "/milestone-1000-point-career",
  "500 Goal Career": "/milestone-500-goal-career",
  "100 Point Season": "/milestone-100-point-season",
  "50 Goal Season": "/milestone-50-goal-season",
  "5 Goal Game": "/milestone-5-goal-game"
};

function capitalize(name) {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function fetchMilestonePlayers(endpoint) {
  const url = `https://records.nhl.com/site/api${endpoint}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
}

async function checkMilestones() {
  const p1Input = document.getElementById("player1").value.trim().toLowerCase();
  const p2Input = document.getElementById("player2").value.trim().toLowerCase();
  const milestoneResultsDiv = document.getElementById("milestoneResults");
  milestoneResultsDiv.innerHTML = "<p>Loading milestone data...</p>";

  if (!p1Input || !p2Input) {
    milestoneResultsDiv.innerHTML = "<p>Please enter both player names.</p>";
    document.getElementById("playerResults").innerHTML = "";
    return;
  }

  const playerMilestones = {
    [p1Input]: [],
    [p2Input]: []
  };

  try {
    const milestoneEntries = Object.entries(milestones);
    await Promise.all(
      milestoneEntries.map(async ([milestoneName, endpoint]) => {
        const players = await fetchMilestonePlayers(endpoint);
        players.forEach(player => {
          if (!player.skaterFirstName || !player.skaterLastName) return;
          const fullName = `${player.skaterFirstName} ${player.skaterLastName}`.toLowerCase();

          if (fullName.includes(p1Input)) {
            playerMilestones[p1Input].push(milestoneName);
          }
          if (fullName.includes(p2Input)) {
            playerMilestones[p2Input].push(milestoneName);
          }
        });
      })
    );

    
    const supabaseResponse = await fetch('http://localhost:3000/players');
    if (!supabaseResponse.ok) throw new Error(`HTTP error! status: ${supabaseResponse.status}`);
    const supabasePlayers = await supabaseResponse.json();

    const playerSupabaseStats = {};
    supabasePlayers.forEach(p => {
      const nameKey = p.Player.trim().toLowerCase();
      playerSupabaseStats[nameKey] = p;
    });

    
    let html = "";
    for (const [player, milestones] of Object.entries(playerMilestones)) {
      const stats = playerSupabaseStats[player];

      html += `<div class="player-box"><h3>${capitalize(player)}</h3><ul>`;
      if (stats) {
        html += `<li>Goals: ${stats.G}</li>`;
        html += `<li>Assists: ${stats.A}</li>`;
        html += `<li>Points: ${stats.P}</li>`;
      } else {
        html += `<li>Player stats not found in Supabase.</li>`;
      }
      html += "</ul>";

      if (milestones.length > 0) {
        html += `<p>Milestones achieved:</p><ul class="milestone-list">`;
        milestones.forEach(m => (html += `<li>${m}</li>`));
        html += "</ul>";
      } else {
        html += `<p>No milestones found for this player.</p>`;
      }

      html += "</div>";
    }

    milestoneResultsDiv.innerHTML = html;
    document.getElementById("playerResults").innerHTML = "";

  } catch (error) {
    milestoneResultsDiv.innerHTML = "<p>There was an error retrieving data.</p>";
    document.getElementById("playerResults").innerHTML = "";
    console.error("Error in checkMilestones:", error);
  }
}

async function addPlayer() {
  const name = document.getElementById("newPlayerName").value.trim();
  const goals = document.getElementById("newPlayerGoals").value;
  const assists = document.getElementById("newPlayerAssists").value;
  const points = document.getElementById("newPlayerPoints").value;
  const messageDiv = document.getElementById("addPlayerMessage");

  if (!name || !goals || !assists || !points) {
    messageDiv.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Player: name,
        G: parseInt(goals),
        A: parseInt(assists),
        P: parseInt(points)
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Server responded with:", err);
      messageDiv.textContent = "Failed to add player.";
    } else {
      messageDiv.textContent = `Successfully added ${name}!`;
    }
  } catch (error) {
    console.error("Error adding player:", error);
    messageDiv.textContent = "Failed to add player.";
  }
}


window.onload = () => {
  document.getElementById("milestoneResults").innerHTML = "";
  document.getElementById("playerResults").innerHTML = "";
};

AOS.refresh();
