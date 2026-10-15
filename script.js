startGame.onclick = () => {
    home.classList.add("hidden");
    box.classList.remove("hidden");
    start();
};

function start(){
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
                newEnemy.style.background = "red";
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
                    wipeOut();
                    enemies.length = 0;
                }, 3000);
            }

        }, 16);

        newEnemy.addEventListener("animationend", () => {
            enemies.splice(enemies.indexOf(newEnemy), 1);
            clearInterval(playerHit);
            newEnemy.remove();
        });
    
    }, 1000);//gameSpeed - (gameLevel * 1000));

    attack = setInterval(function(){
        const newBullet = document.createElement("div");
        newBullet.classList.add("bullet");
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
    clearInterval(timer);
    clearInterval(waves);
    clearInterval(attack);
    waves = null;
    attack = null;
}

function updateScore(){
    scores.textContent = currentScore;
}
function updateHp(){
    hp.textContent = currentHp;
}
function updateTime(){
    const m = Math.floor(currentTime / 60);
    const s = currentTime % 60;
    time.textContent = m + ":" + String(s).padStart(2, "0");
}
function updateGame(){
    if(currentScore > currentAcc["accScore"]){
        currentAcc["accScore"] = currentScore;
    }else{
        currentScore = 0;
    }
    if(currentTime > currentAcc["accTime"]){
        currentAcc["accTime"] = currentTime;
    }else{
        currentTime = 0;
    }
    currentHp = currentAcc["accHp"];

    const accounts = JSON.parse(localStorage.getItem("Accounts")) || [];
    const accIndex = accounts.findIndex(acc => acc["name"] === currentAcc["name"] && acc["password"] === currentAcc["password"]);
    if(accIndex === -1) return;
    accounts[accIndex] = currentAcc;
    localStorage.setItem("Accounts", JSON.stringify(accounts));

    displayScore.textContent = currentAcc["accScore"];

    const m = Math.floor(currentAcc["accTime"] / 60);
    const s = currentAcc["accTime"] % 60;
    displayTime.textContent = m + ":" + String(s).padStart(2, "0");
}

function wipeOut(list){
    for(let enemy of list){
        enemy.remove();   
    }
}

ultimate.addEventListener("click", () => {
    wipeOut(enemies);
    currentScore += enemies.length;
    updateScore();
    enemies.length = 0;

});
start();