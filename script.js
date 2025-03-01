import ControllerFile from "./jsfiles/controllerfile.js";

const selectCellsNumber = document.querySelector(".select-cells-number");

const game = new ControllerFile(selectCellsNumber.value || 16);

const timerContent = "<span>00</span> <span>00</span>sec";
let prevGame;

selectCellsNumber.addEventListener("change", (e) => {
  document.querySelector(".playground").innerHTML = "";

  game.stopTime();
  game.elementsFile.timer.innerHTML = timerContent;

  prevGame && prevGame.stopTime();

  prevGame && (prevGame.innerHTML = timerContent);

  const newGame = new ControllerFile(e.target.value);

  prevGame = newGame;
});
