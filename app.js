const boxes = Array.from(document.getElementsByClassName("box"));
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetScore");
const playText = document.getElementById("playText");
const scoreBoard = document.getElementById("scoreBoard");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;
let O_score = 0;
let X_score = 0;
let gameEnd = false;

//tests
if (localStorage.getItem("oScore")) {
  O_score = localStorage.getItem("oScore");
} else {
  console.log("no data stored in the local storage");
}

if (localStorage.getItem("xScore")) {
  X_score = localStorage.getItem("xScore");
} else {
  console.log("no data stored in the local storage");
}

scoreBoard.innerHTML =
  "O".fontcolor("red") +
  ": " +
  O_score +
  " VS ".fontcolor("purple") +
  "X".fontcolor("blue") +
  ": " +
  X_score;

//add event to each box
const drawBoard = () => {
  boxes.forEach((box) => {
    box.addEventListener("click", boxClicked);
  });
};

//
function boxClicked(e) {
  // declare id
  const id = e.target.id;

  if (!spaces[id] && !gameEnd) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    //change the color of O and X
    if (currentPlayer === O_TEXT) {
      e.target.style = "color: red";
    } else {
      e.target.style = "color: blue";
    }

    if (hasPlayerWon(currentPlayer)) {
      console.log(spaces);
      playText.innerHTML = `${currentPlayer.fontcolor(
        currentPlayer === O_TEXT ? "red" : "blue"
      )} wins!!`;
      if (currentPlayer === O_TEXT) {
        O_score++;
      } else {
        X_score++;
      }
      scoreBoard.innerHTML =
        "O".fontcolor("red") +
        ": " +
        O_score +
        " VS ".fontcolor("purple") +
        "X".fontcolor("blue") +
        ": " +
        X_score;
      gameEnd = true;
      localStorage.setItem("oScore", O_score);
      localStorage.setItem("xScore", X_score);
      return;
    }

    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    console.log(spaces);
  }
}

const hasPlayerWon = (player) => {
  //from top left, check across, down, and diagonal
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      console.log(`${player} wins up top`);
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      console.log(`${player} wins on the left`);
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      console.log(`${player} wins on the diagonal`);
      return true;
    }
  }
  //from bottom check up and across
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      console.log(`${player} wins on the right`);
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      console.log(`${player} wins on the bottom`);
      return true;
    }
  }
  //from middle check middle vertical and middle horizontal
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      console.log(`${player} wins on the middle horizontal`);
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
    if (spaces[2] === player && spaces[6] === player) {
      console.log(`${player} wins on the diagonal`);
      return true;
    }
  }
};

console.log(boxes);
console.log(spaces);
//restart button
restartBtn.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    //clear the boxes
    spaces[index] = null;
    gameEnd = false;
  });

  //clear the boxes
  boxes.forEach((box) => {
    box.innerText = "";
  });

  playText.innerHTML = `Let's Play`;

  currentPlayer = O_TEXT;
});

resetBtn.addEventListener("click", () => {
  localStorage.setItem("oScore", 0);
  localStorage.setItem("xScore", 0);
  location.reload();
});

drawBoard();
