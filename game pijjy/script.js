// องค์ประกอบเกม
const p1 = document.getElementById("player1");
const p2 = document.getElementById("player2");

const p1EnergyDisplay = document.getElementById("p1Energy");
const p2EnergyDisplay = document.getElementById("p2Energy");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

// ตัวแปรเกม
let p1Energy = 100;
let p2Energy = 100;
let p1Score = 0;
let p2Score = 0;

let p1Pos = 100;
let p2Pos = 740;

const speed = 10;
let gameRunning = false;

let keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.code] = false;
});

function updateUI() {
    p1EnergyDisplay.textContent = "พลังงาน P1: " + p1Energy;
    p2EnergyDisplay.textContent = "พลังงาน P2: " + p2Energy;
    scoreDisplay.textContent = "คะแนน: " + p1Score + " - " + p2Score;
}

// รีเซ็ตตำแหน่ง & พลังงาน
function resetRound() {
    p1Energy = 100;
    p2Energy = 100;
    p1Pos = 100;
    p2Pos = 740;
    updateUI();
    positionPlayers();
}

function startGame() {
    if (!gameRunning) {
        resetRound();
        gameRunning = true;
        gameLoop();
    }
}

startBtn.addEventListener("click", startGame);

// ท่าตีฝั่งซ้าย
function attackP1() {
    if (!gameRunning) return;
    if (Math.abs(p1Pos - p2Pos) < 80) {
        p2Energy -= 10;
        p2.classList.add("hitEffect");
        setTimeout(() => p2.classList.remove("hitEffect"), 200);
        updateUI();
        checkKO();
    }
}

// ท่าตีฝั่งขวา
function attackP2() {
    if (!gameRunning) return;
    if (Math.abs(p2Pos - p1Pos) < 80) {
        p1Energy -= 10;
        p1.classList.add("hitEffect");
        setTimeout(() => p1.classList.remove("hitEffect"), 200);
        updateUI();
        checkKO();
    }
}

// ตรวจสอบการชนะรอบ
function checkKO() {
    if (p1Energy <= 0) {
        p2Score++;
        alert("Player 2 ชนะรอบนี้!");
        resetRound();
    }
    if (p2Energy <= 0) {
        p1Score++;
        alert("Player 1 ชนะรอบนี้!");
        resetRound();
    }
}

// อัปเดตตำแหน่งตัวละครบนฉาก
function positionPlayers() {
    p1.style.left = p1Pos + "px";
    p2.style.left = p2Pos + "px";
}

function updatePlayers() {
    if (!gameRunning) return;

    // Player 1 movement (W A S D)
    if (keys["KeyA"]) p1Pos -= speed;
    if (keys["KeyD"]) p1Pos += speed;

    if (keys["Space"]) attackP1();

    // Player 2 movement (Arrow keys)
    if (keys["ArrowLeft"]) p2Pos -= speed;
    if (keys["ArrowRight"]) p2Pos += speed;

    if (keys["Enter"]) attackP2();

    // ขอบเขตสนาม
    p1Pos = Math.max(0, Math.min(840, p1Pos));
    p2Pos = Math.max(0, Math.min(840, p2Pos));

    positionPlayers();
}

function gameLoop() {
    if (!gameRunning) return;
    updatePlayers();
    requestAnimationFrame(gameLoop);
}

updateUI();
positionPlayers();
