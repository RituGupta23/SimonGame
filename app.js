let gameSeq = [];
let userSeq = [];
let highestScore = 0;
let btns = ["red", "green", "yellow", "purple"];

let started = false;
let level = 0;

let head = document.querySelector("h4");

// KeyPress Game Started
document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started");
        started = true;

        // Level Up
        levelUp();
    }
}); 

// Flash
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

// Level Up
function levelUp() {
    userSeq = [];
    level++;
    head.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
    btnFlash(randBtn);

    console.log(gameSeq);
}

// Check Answer
function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let score = level;
        highestScore = Math.max(score, highestScore);
        head.innerHTML = `Game Over! Your Score is <b>${score}</b> <br> Press any key to start. <br> Highest Score is <b>${highestScore}</b>`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        reset();
    }
}

// Button Press
function btnPress() {
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
