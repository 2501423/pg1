// ===== 初期設定 =====
const saveBtn = document.getElementById("saveBtn");
const list = document.getElementById("list");
const summary = document.getElementById("summary");
const opponentSelect = document.getElementById("opponent");

// Rocketsは固定
const MY_TEAM = "Houston Rockets";

// NBAチーム一覧
const nbaTeams = [
  "Atlanta Hawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "Charlotte Hornets",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Dallas Mavericks",
  "Denver Nuggets",
  "Detroit Pistons",
  "Golden State Warriors",
  "Houston Rockets",
  "Indiana Pacers",
  "LA Clippers",
  "LA Lakers",
  "Memphis Grizzlies",
  "Miami Heat",
  "Milwaukee Bucks",
  "Minnesota Timberwolves",
  "New Orleans Pelicans",
  "New York Knicks",
  "Oklahoma City Thunder",
  "Orlando Magic",
  "Philadelphia 76ers",
  "Phoenix Suns",
  "Portland Trail Blazers",
  "Sacramento Kings",
  "San Antonio Spurs",
  "Toronto Raptors",
  "Utah Jazz",
  "Washington Wizards"
];

const rocketsPlayers = [
  "Fred VanVleet",
  "Amen Thompson",
  "Reed Sheppard",
  "Josh Okogie",
  "Tristen Newton",
  "Aaron Holiday",
  "JD Divison",
  "Jae'Sean Tate",
  "Jabari Smith Jr.",
  "Jeff Green",
  "Dorian Finney-Smith",
  "Tari Eason",
  "Kevin Durant",
  "Isaiah Crawford",
  "Alperen Şengün",
  "Clint Capela",
  "Steven Adams",
];

const teamLogos = {
  "Atlanta Hawks": "img/Hawks.svg",
  "Boston Celtics": "img/Celtics.svg",
  "Brooklyn Nets": "img/Nets.svg",
  "Charlotte Hornets": "img/Hornets.svg",
  "Chicago Bulls": "img/Bulls.svg",
  "Cleveland Cavaliers": "img/Cavaliers.svg",
  "Dallas Mavericks": "img/Mavericks.svg",
  "Denver Nuggets": "img/Nuggets.svg",
  "Detroit Pistons": "img/Pistons.svg",
  "Golden State Warriors": "img/Warriors.svg",
  "Houston Rockets": "img/Rockets.svg",
  "Indiana Pacers": "img/Pacers.svg",
  "LA Clippers": "img/Clippers.svg",
  "LA Lakers": "img/Lakers.svg",
  "Memphis Grizzlies": "img/Grizzlies.svg",
  "Miami Heat": "img/Heat.svg",
  "Milwaukee Bucks": "img/Bucks.svg",
  "Minnesota Timberwolves": "img/Wolves.svg",
  "New Orleans Pelicans": "img/Pelicans.svg",
  "New York Knicks": "img/Knicks.svg",
  "Oklahoma City Thunder": "img/Thunder.svg",
  "Orlando Magic": "img/Magic.svg",
  "Philadelphia 76ers": "img/76ers.svg",
  "Phoenix Suns": "img/Suns.svg",
  "Portland Trail Blazers": "img/Blazers.svg",
  "Sacramento Kings": "img/Kings.svg",
  "San Antonio Spurs": "img/Spurs.svg",
  "Toronto Raptors": "img/Raptors.svg",
  "Utah Jazz": "img/Jazz.svg",
  "Washington Wizards": "img/Wizards.svg"
};
// ===== 対戦相手select作成 =====
nbaTeams.forEach(team => {
  if (team === MY_TEAM) return;

  const option = document.createElement("option");
  option.value = team;
  option.textContent = team;
  opponentSelect.appendChild(option);
});

const topScorerSelect = document.getElementById("topScorer");

rocketsPlayers.forEach(player => {
  const option = document.createElement("option");
  option.value = player;
  option.textContent = player;
  topScorerSelect.appendChild(option);
});


// ===== localStorage から読み込み =====
const games = JSON.parse(localStorage.getItem("rocketsGames")) || [];

// ===== 表示処理 =====
function render() {
  list.innerHTML = "";

  games.forEach((game, index) => {
    const div = document.createElement("div");
    div.className = "game " + (game.isWin ? "win" : "lose");

    div.innerHTML = `
      <strong>
        <img src="${teamLogos[MY_TEAM]}" alt="${MY_TEAM}" class="team-logo">${MY_TEAM}
        vs
        <img src="${teamLogos[game.opponent]}" alt="${game.opponent}" class="team-logo">${game.opponent}
        ${game.date}
        </strong><br>>
      スコア：${game.myScore} - ${game.oppScore}
      （${game.isWin ? "勝ち" : "負け"}）<br>
      最多得点：${game.topScorer} (${game.topPoints}点)<br>
      <button onclick="deleteGame(${index})">削除</button>
    `;

    list.appendChild(div);
  });

  renderSummary();
}

// ===== 勝率表示 =====
function renderSummary() {
  const wins = games.filter(g => g.isWin).length;
  const rate = games.length
    ? Math.round((wins / games.length) * 100)
    : 0;

  summary.textContent = `勝率：${rate}%（${wins}勝 / ${games.length}試合）`;
}

// ===== 保存処理 =====
saveBtn.addEventListener("click", () => {
  const date = document.getElementById("date").value;
  const opponent = opponentSelect.value;
  const myScore = Number(document.getElementById("myScore").value);
  const oppScore = Number(document.getElementById("oppScore").value);
  const topScorer = document.getElementById("topScorer").value;
  const topPoints = Number(document.getElementById("topPoints").value);

  if (!date || !opponent || isNaN(myScore) || isNaN(oppScore)) {
    alert("未入力の項目があります！");
    return;
  }

  const game = {
    date,
    opponent,
    myScore,
    oppScore,
    isWin: myScore > oppScore,
    topScorer,
    topPoints
  };

  games.push(game);
  localStorage.setItem("rocketsGames", JSON.stringify(games));

  // 入力欄クリア
  opponentSelect.value = "";
  document.getElementById("myScore").value = "";
  document.getElementById("oppScore").value = "";
  document.getElementById("topScorer").value = "";
  document.getElementById("topPoints").value = "";

  render();
});

// ===== 削除処理 =====
function deleteGame(index) {
  games.splice(index, 1);
  localStorage.setItem("rocketsGames", JSON.stringify(games));
  render();
}

// ===== 起動時 =====
render();