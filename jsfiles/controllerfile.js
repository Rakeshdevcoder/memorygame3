import ElementsFile from "./elementsfile.js";

class ControllerFile {
  constructor(cardsNumber) {
    this.elementsFile = new ElementsFile(cardsNumber);
    this.prevCard = null;
    this.clickCard();
    this.startClock = true;
  }

  clickCard() {
    const { attempts, cards } = this.elementsFile;

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        if (card.classList.contains("stop") || attempts.click >= 2) return;

        if (this.startClock) this.setTime();
        attempts.click++;
        card.classList.add("change");

        if (attempts.click === 1) {
          this.prevCard = card;
        } else if (attempts.click === 2) {
          if (this.prevCard === card) {
            attempts.click = 1;
            return;
          }

          if (this.prevCard.dataset.index === card.dataset.index) {
            attempts.correct++;
            card.classList.add("stop");
            this.prevCard.classList.add("stop");
            attempts.click = 0;
            this.prevCard = null;
            this.endGame(attempts);
          } else {
            attempts.wrong++;
            cards.forEach((c) => c.classList.add("pause"));
            setTimeout(() => {
              card.classList.remove("change");
              this.prevCard.classList.remove("change");
              cards.forEach((c) => c.classList.remove("pause"));
              attempts.click = 0;
              this.prevCard = null;
            }, 1000);
          }
        }
        this.startClock = false;
      });
    });
  }

  endGame({ correct }) {
    const { cardsNumber, modal, modalBtn, wrong, attempts, timer, modalTime } =
      this.elementsFile;

    if (correct === cardsNumber / 2) {
      this.startClock = true;
      this.stopTime();
      modal.style.cssText = "visibility: visible; opacity: 1;";
      const timerClone = timer.cloneNode(true);
      modalTime.append(timerClone);
      wrong.textContent = attempts.wrong;
      modalBtn.onclick = () => location.reload();
    }
  }

  setTime() {
    let temp = 1;
    const { timer } = this.elementsFile;

    this.time = setInterval(() => {
      const seconds = temp % 60;
      timer.children[1].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
      const minutes = Math.floor(temp / 60);
      timer.children[0].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      temp++;
    }, 1000);
  }

  stopTime() {
    clearInterval(this.time);
  }
}

export default ControllerFile;
