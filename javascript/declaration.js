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
const appearance = document.getElementById("appearance");
const ultimate = document.getElementById("ultimate");
const scores = document.getElementById("scores");
const hp = document.getElementById("hp");
const time = document.getElementById("time");
const heroesChanger = document.getElementById("heroesChanger");
const heroUi = document.getElementById("heroUi");
const heroName = document.getElementById("heroName");
const joyStick = document.getElementById("joyStick");
let nextHero = 1;

let touchX, touchY, playerX, playerY;


let gameLevel = 1;
let summonSpeed = 6000;

let heroDamage = 5;
let heroAttackSpeed = 500;
let attackSpeed = heroAttackSpeed;
let damage = heroDamage;
let heroHp = 0;
let heroBullet = "cipher";
let explosionOrb = false;
let pink = false;


let currentScore = 0;
let currentHp = heroHp;
let currentTime = 0;

let enemyHp = 10;
let enemies = [];
let enemyCount = 0;
let enemyPoints = 5;

let waves = null;
let attack = null;
let timer = null;
let orbs = null;
let specialOrbs = null;

//Responsive part
const desktopQuery = window.matchMedia("(min-width: 800px) and (orientation: landscape)");
let rotated = desktopQuery.matches;
desktopQuery.addEventListener("change", e => rotated = e.matches);



const multo = new Audio("sounds/multo.wav");
multo.loop = true;
multo.volume = 0.35;




const bgm = new Audio("sounds/bgm.wav");
bgm.loop = true;
bgm.volume = 0.35;

let soundOn = true;
let lastBoom = 0;

function makePool(src) {
    return Array.from({ length: 4 }, () => new Audio(src));
}

const sfx = {
    cipher: { shoot: makePool("sounds/shoot.wav"),        boom: makePool("sounds/explosion.wav"),        si: 0, bi: 0 },
    crizel: { shoot: makePool("sounds/shoot-crizel.wav"), boom: makePool("sounds/explosion-crizel.wav"), si: 0, bi: 0 }
};

function playShoot() {
    if (!soundOn) return;
    const s = sfx[heroBullet] || sfx.cipher;
    const a = s.shoot[s.si++ % s.shoot.length];
    a.currentTime = 0;
    a.volume = 0.25;
    a.play().catch(() => {});
}

function playBoom(volume = 0.5, force = false) {
    if (!soundOn) return;
    const now = performance.now();
    if (!force && now - lastBoom < 90) return;
    lastBoom = now;

    const s = sfx[heroBullet] || sfx.cipher;
    const a = s.boom[s.bi++ % s.boom.length];
    a.currentTime = 0;
    a.volume = volume;
    a.play().catch(() => {});
}

function unlockAudio() {
    Object.values(sfx).forEach(s => {
        [...s.shoot, ...s.boom].forEach(a => {
            a.muted = true;
            a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false; }).catch(() => {});
        });
    });
}