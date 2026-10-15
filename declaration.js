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

//tester
const joyStick = document.getElementById("joyStick");