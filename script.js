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

function attacking(){
        playShoot();
        const newBullet = document.createElement("div");
        newBullet.classList.add("bullet");
        newBullet.classList.add(heroBullet);
        box.appendChild(newBullet);
        newBullet.style.left = player.offsetLeft + (player.offsetWidth / 2) + "px";
        newBullet.style.top = player.offsetTop + player.offsetHeight + "px";
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
                    enemy.hp -= damage;
                    enemy.classList.add("hit");
                    setTimeout(() => {
                        enemy.classList.remove("hit");
                    }, 100);
                    clearInterval(hit);
                    newBullet.remove();

                    if(enemy.hp <= 0){
                        playBoom();
                        explode(enemy);
                        enemies.splice(enemies.indexOf(enemy), 1);
                        enemy.remove();
                        currentScore += enemyPoints;
                        updateScore();
                        enemyCount++;
                        break;
                    }
                }
            }
        }, 16);
        
        anim.onfinish = () => {
            clearInterval(hit);
            newBullet.remove(); 
        };

    }

function start(){
    if (soundOn) { bgm.currentTime = 0; bgm.play().catch(() => {}); }
    if(waves !== null) return;

    player.style.top = "20px";
    player.style.left = "calc(50% - 25px)";

    currentScore = 0;
    currentTime = 0;
    enemyCount = 0;
    enemyHp = 10;

    currentHp = heroHp + currentAcc["accHp"];
    damage = heroDamage;
    attackSpeed = heroAttackSpeed;

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
        if(enemyCount > 50){
            newEnemy.style.background = enemyCount > 50? "url('images/enemy-boss.svg') center / contain no-repeat": "url('images/enemy-bat.svg') center / contain no-repeat";
            enemyHp = enemyCount > 150? 1000 : 100;
            enemyPoints = enemyCount > 150? 20: 10;
        }
        enemies.push(newEnemy);
        newEnemy.hp = enemyHp;

        let alreadyHit = false;

        const playerHit = setInterval(() => {
            if(!newEnemy.isConnected){
                clearInterval(playerHit);
                return;
            }
            if(currentHp <= 0){
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
                if(currentHp <= 0){
                    stop();
                    updateGame();
                    setTimeout(() => {
                        wipeOut(enemies);
                        enemies.length = 0;
                        home.classList.remove("hidden");
                        box.classList.add("hidden");
                    }, 3000);
                }
            }   
        }, 16);

        newEnemy.addEventListener("animationend", () => {
            enemies.splice(enemies.indexOf(newEnemy), 1);
            clearInterval(playerHit);
            newEnemy.remove();
        });
    
    }, 400);

    attack = setInterval(attacking, attackSpeed);

    orbs = setInterval(function(){
        if(currentHp <= 0) return;
        const newOrb = document.createElement("div");
        newOrb.classList.add("orb");
        let rand = Math.ceil(Math.random() * 3);
        switch(rand){
            case 1:
                newOrb.style.background = "url('images/orb-heal.svg') center / contain no-repeat";
                break;
            case 2:
                newOrb.style.background = "url('images/orb-power.svg') center / contain no-repeat";
                break;
            case 3:
                newOrb.style.background = "url('images/orb-speed.svg') center / contain no-repeat";
                break;
        }
        box.appendChild(newOrb);
        newOrb.style.left = Math.random() * (box.clientWidth - newOrb.offsetWidth) + "px";

        let alreadybuff = false;

        const playerBuff = setInterval(function(){
            const p = player.getBoundingClientRect();
            const o = newOrb.getBoundingClientRect();

            if(!alreadybuff && p.left < o.right && p.right > o.left && p.top < o.bottom && p.bottom > o.top){
                alreadybuff = true;
                switch(rand){
                    case 1:
                        currentHp += 1;
                        updateHp();
                        break;
                    case 2:
                        damage += 2;
                    break;
                    case 3:
                        if(attackSpeed >= 100){
                            attackSpeed -= 20;
                            clearInterval(attack);
                            attack = setInterval(attacking, attackSpeed);
                        }else{
                            damage += 2;
                        }
                    break;
                }
                clearInterval(playerBuff);
                newOrb.remove();
            }
            
            if(currentHp <= 0){
                clearInterval(playerBuff);
                newOrb.remove();
            }

        }, 16);

        newOrb.addEventListener("animationend", () => {
            clearInterval(playerBuff);
            newOrb.remove();
        });

    }, 5000);
}

function stop(){
    bgm.pause();
    clearInterval(timer);
    clearInterval(waves);
    clearInterval(attack);
    clearInterval(orbs);
    waves = null;
    attack = null;
    timer = null;
    orbs = null;
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
    currentScore += (enemies.length * enemyPoints);
    enemyCount += enemies.length;
    updateScore();
    enemies.length = 0;
});