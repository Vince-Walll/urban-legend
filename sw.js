const CACHE = "urban-legend-v1.3";
const FILES = [
    "./",
    "index.html",
    "style.css",
    "manifest.json",
    "declaration.js",
    "updator.js",
    "script.js",
    "done/logIn.js",
    "done/movement.js",
    "images/hero.svg",
    "images/hero-pink.svg",
    "images/hero-nyx.svg",
    "images/hero-vesper.svg",
    "images/hero-warden.svg",
    "images/enemy.svg",
    "images/enemy-bat.svg",
    "images/enemy-boss.svg",
    "images/enemy-skull.svg",
    "images/bullet.svg",
    "images/bullet-pink.svg",
    "images/explosion.svg",
    "images/explosion-pink.svg",
    "images/orb-heal.svg",
    "images/orb-power.svg",
    "images/orb-speed.svg",
    "images/orb-bomb.svg",
    "images/battle-bg.svg",
    "images/home-bg.svg",
    "images/home-bg-desktop.svg",
    "images/login-bg.svg",
    "sounds/bgm.wav",
    "sounds/shoot.wav",
    "sounds/explosion.wav",
    "sounds/shoot-crizel.wav",
    "sounds/explosion-crizel.wav",
    "sounds/multo.wav"
];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE).then(async (cache) => {
            for (const file of FILES) {
                try {
                    await cache.add(file);
                } catch (err) {
                    console.log("SKIPPED (not found):", file);
                }
            }
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    );
    self.clients.claim();
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(cached => {
            return cached || fetch(e.request).catch(() => caches.match("index.html"));
        })
    );
});