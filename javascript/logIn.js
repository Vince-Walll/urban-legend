goToCreate.onclick = showCreatePage;
goToLogIn.onclick = showLogInPage;

function showCreatePage(){
    logInPage.classList.add("hidden");
    createAccPage.classList.remove("hidden");
}
function showLogInPage(){
    logInPage.classList.remove("hidden");
    createAccPage.classList.add("hidden");
}

logInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(logInForm);
    const account = Object.fromEntries(data);
    const accounts = JSON.parse(localStorage.getItem("Accounts")) || [];

    if(accounts.some(acc => acc["name"] === account["name"] && acc["password"] === account["password"])){
        currentAcc = accounts.find(acc => acc["name"] === account["name"] && acc["password"] === account["password"]);
        updateGame();
        logInForm.reset();
        window.alert("Welcome " + currentAcc["name"]);
        logInPage.classList.add("hidden");
        home.classList.remove("hidden");





        if (soundOn) { multo.currentTime = 0; multo.play().catch(() => {}); }   





    }else{
        window.alert("Wrong Name or Password!");
    }
});

createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(createForm);
    const newAccount = Object.fromEntries(data);
    const accounts = JSON.parse(localStorage.getItem("Accounts")) || [];
    
    if(!accounts.some(acc => acc["name"] === newAccount["name"])){
        if(newAccount["password"] === newAccount["confirmPassword"]){
            newAccount.accScore = 0;
            newAccount.accHp = 3;
            newAccount.accTime = 0;
            accounts.push(newAccount);
            localStorage.setItem("Accounts", JSON.stringify(accounts));

            createForm.reset();
            window.alert("Account Successfully Created!");
        }else{
            window.alert("Password doesn't match!");
        }
    }
});

logOut.addEventListener("click", () => {
    home.classList.add("hidden");
    box.classList.add("hidden");
    logInPage.classList.remove("hidden");
    currentAcc = null;
    currentScore = 0;
    currentHp = 3;
    currentTime = 0;
});