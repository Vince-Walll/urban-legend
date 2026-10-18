startGame.onclick = () => {
    home.classList.add("hidden");
    box.classList.remove("hidden");
    unlockAudio();
    start();
};




function explode(enemy) {
    const boom = document.createElement("div");
    boom.classList.add("explosion");
    boom.style.left = enemy.offsetLeft + "px";
    boom.style.top = enemy.offsetTop + "px";
    box.appendChild(boom);

    const anim = boom.animate(
        [
            { transform: "scale(0.3)", opacity: 1 },
            { transform: "scale(1.4)", opacity: 0 }
        ],
        { duration: 400, easing: "ease-out" }
    );
    anim.onfinish = () => boom.remove();
}




function start(){
    if (soundOn) { bgm.currentTime = 0; bgm.play().catch(() => {}); }
    if(waves !== null && attack !== null) return;

    player.style.top = "20px";
    player.style.left = "calc(50% - 25px)";

    currentScore = 0;
    currentHp = currentAcc["accHp"];
    currentTime = 0;
    scores.textContent = currentScore;
    hp.textContent = currentHp;
    time.textContent = currentTime;

    timer = setInterval(function(){
        currentTime += 1;
        updateTime();
    }, 1000);

    waves = setInterval(function(){
        const newEnemy = document.createElement("div");
        newEnemy.classList.add("enemy");
        box.appendChild(newEnemy);
        newEnemy.style.left = Math.random() * (box.clientWidth - newEnemy.offsetWidth) + "px";
        if(enemyCount > 40){
            newEnemy.style.background = enemyCount > 80 ? "url('images/enemy-boss.svg') center / contain no-repeat": "url('images/enemy-bat.svg') center / contain no-repeat"; 
        }
        enemyCount++;
        enemies.push(newEnemy);

        let alreadyHit = false;

        const playerHit = setInterval(() => {
            if(!newEnemy.isConnected){
                clearInterval(playerHit);
                return;
            }
            const p = player.getBoundingClientRect();
            const e = newEnemy.getBoundingClientRect();

            if (!alreadyHit && p.left < e.right && p.right > e.left && p.top < e.bottom && p.bottom > e.top) {
                alreadyHit= true;
                newEnemy.classList.add("hit");
                currentHp -= 1;
                updateHp();
            }

            if(currentHp <= 0){
                stop();
                const gameOver = setTimeout(() => {
                    home.classList.remove("hidden");
                    box.classList.add("hidden");
                    currentHp = currentAcc["accHp"];
                    updateGame();
                    wipeOut(enemies);
                    enemies.length = 0;
                    enemyCount = 0;
                }, 3000);
            }

        }, 16);

        newEnemy.addEventListener("animationend", () => {
            enemies.splice(enemies.indexOf(newEnemy), 1);
            clearInterval(playerHit);
            newEnemy.remove();
        });
    
    }, 400);//gameSpeed - (gameLevel * 1000));

    attack = setInterval(function(){
        playShoot();
        const newBullet = document.createElement("div");
        newBullet.classList.add("bullet");
        box.appendChild(newBullet);
        newBullet.style.left = player.offsetLeft + (player.offsetWidth / 2) + "px";
        newBullet.style.top = player.offsetTop + player.offsetHeight + "px";
        newBullet.style.background = pink? "url('images/bullet-pink.svg') center / contain no-repeat": "url('images/bullet.svg') center / contain no-repeat";
        const anim = newBullet.animate(
            [
                { top: player.offsetTop + player.offsetHeight + "px" },
                { top: box.clientHeight + "px" }
            ],
            {
                duration: 1000,
                iterations: 1,
                easing: "linear"
            }
        );

        const hit = setInterval(function () {
            const bl = newBullet.offsetLeft;
            const bt = newBullet.offsetTop;
            const bw = newBullet.offsetWidth;
            const bh = newBullet.offsetHeight;
            for (const enemy of enemies) {
                const el = enemy.offsetLeft;
                const et = enemy.offsetTop;
                const ew = enemy.offsetWidth;
                const eh = enemy.offsetHeight;
                if (bl < el + ew && bl + bw > el && bt < et + eh && bt + bh > et) {
                    playBoom();
                    explode(enemy);
                    clearInterval(hit);
                    newBullet.remove();
                    enemies.splice(enemies.indexOf(enemy), 1);
                    enemy.remove();
                    currentScore += 5;
                    updateScore();
                    break;
                }
            }
        }, 16);

        anim.onfinish = () => {
            clearInterval(hit);
            newBullet.remove(); 
        };

    }, 500);//attackSpeed);
}

function stop(){
    bgm.pause();
    clearInterval(timer);
    clearInterval(waves);
    clearInterval(attack);
    waves = null;
    attack = null;
}

function wipeOut(list){
    for(let enemy of list){
        explode(enemy);
        enemy.remove();   
    }
}

ultimate.addEventListener("click", () => {
    playBoom();
    wipeOut(enemies);
    currentScore += (enemies.length * 5);
    updateScore();
    enemies.length = 0;
});