var userTotalScore = 0;
var compTotalScore = 0;

const compScore = document.querySelector(".computer-score"),
  userScore = document.querySelector(".user-score"),
  result_stmt = document.querySelector(".result p"),
  stone = document.querySelector(".stone"),
  paper = document.querySelector(".paper"),
  scissor = document.querySelector(".scissor"),
  winner = document.querySelector(".winnig-card"),
  looser = document.querySelector(".losing-card"),
  instruc = document.querySelector(".rules-card"),
  section_bg = document.querySelector("section");

stone.addEventListener("click", () => game(stone));
paper.addEventListener("click", () => game(paper));
scissor.addEventListener("click", () => game(scissor));

// resetting entire Scores
function resettingScores() {
  userTotalScore = 0;
  compTotalScore = 0;
  compScore.textContent = 0;
  userScore.textContent = 0;
}

function getComputerChoice() {
  const choices = ["stone", "paper", "scissor"];
  const choiceNum = Math.floor(Math.random() * 3);
  return choices[choiceNum];
}

function game(userChoice) {
  const compChoice = getComputerChoice();

  switch (userChoice.className + " " + compChoice) {
    case "scissor paper":
    case "stone scissor":
    case "paper stone":
      glowEffect(userChoice, "won");
      showResult(userChoice, "won");
      matchWon();
      break;
    case "paper scissor":
    case "scissor stone":
    case "stone paper":
      glowEffect(userChoice, "lost");
      showResult(userChoice, "lost");
      matchLost();
      break;
    case "paper paper":
    case "stone stone":
    case "scissor scissor":
      glowEffect(userChoice, "draw");
      showResult(userChoice, "draw");
      break;
  }
}
function glowEffect(userChoice, result) {
  if (result === "won") {
    userChoice.style.border = "6px solid green";
    setTimeout(() => {
      userChoice.style.border = "2px solid white";
    }, 200);
  } else if (result === "lost") {
    userChoice.style.border = "6px solid red";
    setTimeout(() => {
      userChoice.style.border = "2px solid white";
    }, 200);
  } else if (result === "draw") {
    userChoice.style.border = "6px solid yellow";
    setTimeout(() => {
      userChoice.style.border = "2px solid white";
    }, 200);
  }
}

function matchWon() {
  userTotalScore++;
  if (userTotalScore === 7) {
    console.log("User Won Match");
    showCard(winner);
    resettingScores();
  } else if (userTotalScore < 7) {
    userScore.innerHTML = userTotalScore;
  }
}

function matchLost() {
  compTotalScore++;
  if (compTotalScore === 7) {
    console.log("User lost match");
    showCard(looser);
    resettingScores();
  } else {
    compScore.innerHTML = compTotalScore;
  }
}

function showCard(player) {
  player.classList.remove("hide");
  player.classList.add("show");
  section_bg.style.filter = "blur(1px)";
  setTimeout(() => {
    player.classList.remove("show");
  }, 2500);
  setTimeout(() => {
    player.classList.add("hide");
    section_bg.style.filter = "blur(0px)";
  }, 2000);
}

function showResult(userChoice, result) {
  const stmts = [
    `Stone Breaks Scissor. You ${result}!!`,
    `Paper Cover Stone. You ${result}!!`,
    `Scissor Cuts Paper. You ${result}!!`,
  ];

  if (userChoice.className === "stone" && result === "won") {
    result_stmt.innerHTML = stmts[0];
  } else if (userChoice.className === "paper" && result === "won") {
    result_stmt.innerHTML = stmts[1];
  } else if (userChoice.className === "scissor" && result === "won") {
    result_stmt.innerHTML = stmts[2];
  } else if (userChoice.className === "stone" && result === "lost") {
    result_stmt.innerHTML = stmts[0];
  } else if (userChoice.className === "paper" && result === "lost") {
    result_stmt.innerHTML = stmts[1];
  } else if (userChoice.className === "scissor" && result === "lost") {
    result_stmt.innerHTML = stmts[2];
  } else if (result === "draw") {
    result_stmt.innerHTML = "Oops!! Its a Tie  ";
  }
}

function closeInstructions() {
  instruc.style.display = "none";
  section_bg.style.filter = "blur(0px)";
}

resettingScores();
