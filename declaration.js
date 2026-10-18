//Log in
let currentAcc = null;
const logInPage = document.getElementById("logInPage");
const createAccPage = document.getElementById("createAccPage");
const logInForm = document.getElementById("logInForm");
const createForm = document.getElementById("createForm");
const logIn = document.getElementById("logIn");
const create = document.getElementById("create");
const goToCreate = document.getElementById("goToCreate");
const goToLogIn = document.getElementById("goToLogIn");

//Home
const home = document.getElementById("home");
const logOut = document.getElementById("logOut");
const startGame = document.getElementById("start");
const displayScore = document.getElementById("displayScore");
const displayTime = document.getElementById("displayTime");

//Actual Game
const box = document.getElementById("box");
const player = document.getElementById("player");
const ultimate = document.getElementById("ultimate");
const scores = document.getElementById("scores");
const hp = document.getElementById("hp");
const time = document.getElementById("time");
const heroesChanger = document.getElementById("heroesChanger");
const heroUi = document.getElementById("heroUi");
const heroName = document.getElementById("heroName");
const joyStick = document.getElementById("joyStick");
let nextHero = 1;

let enemyCount = 1;
let pink = false;
let touchX, touchY, playerX, playerY;
let gameLevel = 1;
let summonSpeed = 6000;
let attackSpeed = 1000;
let currentScore = 0;
let currentHp = 3;
let currentTime = 0;

let enemies = [];

let waves = null;
let attack = null;
let timer = null;

//Responsive part
const desktopQuery = window.matchMedia("(min-width: 800px) and (orientation: landscape)");
let rotated = desktopQuery.matches;
desktopQuery.addEventListener("change", e => rotated = e.matches);

const bgm = new Audio("sounds/bgm.wav");
bgm.loop = true;
bgm.volume = 0.35;

const shootPool = Array.from({ length: 4 }, () => new Audio("sounds/shoot.wav"));
const boomPool  = Array.from({ length: 4 }, () => new Audio("sounds/explosion.wav"));
let shootI = 0, boomI = 0;
let soundOn = true;

function playShoot() {
    if (!soundOn) return;
    const a = shootPool[shootI++ % shootPool.length];
    a.currentTime = 0;
    a.volume = 0.25;
    a.play().catch(() => {});
}
function playBoom() {
    if (!soundOn) return;
    const a = boomPool[boomI++ % boomPool.length];
    a.currentTime = 0;
    a.volume = 0.5;
    a.play().catch(() => {});
}
function unlockAudio() {
    [...shootPool, ...boomPool].forEach(a => {
        a.muted = true;
        a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false; }).catch(() => {});
    });
}