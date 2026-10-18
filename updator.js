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

heroesChanger.addEventListener("click", () => {
    switch(nextHero){
        case 1:
            appearance.style.background = "url('images/hero-pink.svg') center / contain no-repeat";
            heroUi.style.background = "url('images/hero-pink.svg') center / contain no-repeat";
            heroName.textContent = "Crizel";
            heroName.style.color = "pink";
            heroName.style.textShadow = "0 0 12px rgba(255, 127, 223, 0.6), 0 2px 4px #000";
            heroBullet = "crizel";
            pink = true;
            heroHp = -1;
            heroAttackSpeed = 200;
            heroDamage = 2;
            nextHero++;
        break;
        case 2:
            appearance.style.background = "url('images/hero-nyx.svg') center / contain no-repeat";
            heroUi.style.background = "url('images/hero-nyx.svg') center / contain no-repeat";
            heroName.textContent = "Nyx";
            heroName.style.color = "#722bc4";
            heroName.style.textShadow = "0 0 12px rgba(183, 94, 224, 0.6), 0 2px 4px #000";
            heroBullet = "cipher"
            pink = false;
            heroHp = -2;
            heroAttackSpeed = 500;
            heroDamage = 10;
            nextHero++;
        break;
        case 3:
            appearance.style.background = "url('images/hero-vesper.svg') center / contain no-repeat";
            heroUi.style.background = "url('images/hero-vesper.svg') center / contain no-repeat";
            heroName.textContent = "Vesper";
            heroName.style.color = "#d65a29";
            heroName.style.textShadow = "0 0 12px rgba(196, 134, 42, 0.6), 0 2px 4px #000";
            heroHp = 0;
            heroAttackSpeed = 500;
            heroDamage = 5;
            nextHero++;
        break;
        case 4:
            appearance.style.background = "url('images/hero-warden.svg') center / contain no-repeat";
            heroUi.style.background = "url('images/hero-warden.svg') center / contain no-repeat";
            heroName.textContent = "Warden";
            heroName.style.color = "#18ad5b";
            heroName.style.textShadow = "0 0 12px rgba(33, 199, 61, 0.6), 0 2px 4px #000";
            heroAttackSpeed = 700;
            heroHp = 7;
            heroDamage = 10;
            nextHero++;
        break;
        case 5:
            appearance.style.background = "url('images/hero.svg') center / contain no-repeat";
            heroUi.style.background = "url('images/hero.svg') center / contain no-repeat";
            heroName.textContent = "Cipher";
            heroName.style.color = "#7ff3ff";
            heroName.style.textShadow = "0 0 12px rgba(127, 243, 255, 0.6), 0 2px 4px #000";
            heroAttackSpeed = 500;
            heroHp = 0;
            nextHero = 1;
        break;
    }
});