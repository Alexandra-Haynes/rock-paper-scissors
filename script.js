const selectionButtons = document.querySelectorAll("[data-selection]");
const possibleSelections = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌",
    beats: "paper",
  },
];

const finalColumn = document.querySelector("[data-final-column]");
const computerScore = document.querySelector("[data-computer-score]");
const yourScore = document.querySelector("[data-your-score]");

selectionButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectionName = button.dataset.selection;
    const selection = possibleSelections.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function makeSelection(selection) {
  const computerSelection = computerRandomSelection();
  // console.log(computerSelection)
  const youWon = determineWinner(selection, computerSelection);
  const youLost = determineWinner(computerSelection, selection);
  renderSelectionResult(computerSelection, youLost);
  renderSelectionResult(selection, youWon);
  if(youWon) updateScore(yourScore);
  if (youLost) updateScore(computerScore);
  
}

function computerRandomSelection() {
  const randomIndex = Math.floor(Math.random() * 3);
  return possibleSelections[randomIndex];
}

function determineWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name;
}

function renderSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div); //add the last selection right below score
}

function updateScore(score) {
  score.innerText = parseInt(score.innerText) + 1;
}
