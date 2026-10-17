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

    wipeOut(enemies);
    enemies.length = 0;
}