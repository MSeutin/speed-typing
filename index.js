let url = "https://api.chucknorris.io/jokes/random";
let text = document.querySelector(".text");
let timer = document.querySelector(".timer");
let seconds = document.querySelectorAll(".seconds");
let timerSelection = document.querySelector(".timer-selection");

function getRandomQuote() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.value)
    .catch((err) => console.error("request failed", err));
}

async function getNewQuote() {
  let quote = await getRandomQuote();
  quote = quote.toLowerCase();
  const characters = quote.split("").map((char) => {
    let span = document.createElement("span");
    span.textContent = char;
    text.appendChild(span);
    return span;
  });
  let index = 0;
  let currentCharacter = characters[index];
  currentCharacter.classList.add("cursor");

  // Cursor Effect 
  let blink = true;
  let speed = 750;
  let cursorEffect = setInterval(() => {
    if (blink) {
      currentCharacter.classList.remove("cursor");
      blink = false;
    } else {
      currentCharacter.classList.add("cursor");
      blink = true;
    }
  }, speed);

  // KEYDOWN, figure out the key.shiftKey problem
  document.addEventListener("keydown", ({ key }) => {
    clearInterval(cursorEffect);
    // my timer has delay
    if (currentCharacter === characters[0]) {
      startTimer();
    }
    if (key === currentCharacter.textContent) {
      currentCharacter.classList.remove("cursor");
      currentCharacter.classList.add("correct");
      currentCharacter.classList.remove("incorrect");
      currentCharacter = characters[++index];
      currentCharacter.classList.add("cursor");
    } else if (key !== currentCharacter.textContent) {
      currentCharacter.classList.remove("cursor");
      currentCharacter.classList.add("incorrect");
      currentCharacter.classList.remove("corret");
      currentCharacter = characters[++index];
      currentCharacter.classList.add("cursor");
    }
  });
}

// TIMER
let secondsLeft = 0;
// function setSecond(second = 29) {
//   return second;
// }

if (timerSelection.classList.contains(15)) {
  timer.textContent = "15";
  timer.classList.add("opaque");
  secondsLeft = 14;
} else if (timerSelection.classList.contains(30)) {
  timer.textContent = "30";
  timer.classList.add("opaque");
  secondsLeft = 29;
} else if (timerSelection.classList.contains(60)) {
  timer.textContent = "60";
  timer.classList.add("opaque");
  secondsLeft = 59;
} else {
  timer.textContent = "120";
  timer.classList.add("opaque");
  secondsLeft = 121;
}

// EVENT LISTENER ON TIMER PICKED
seconds.forEach((second) => {
  second.addEventListener("click", () => {
    document
      .querySelector(".timer-selection")
      .classList.remove("timer-selection");
    second.classList.add("timer-selection");
    if (second.classList.contains(15)) {
      timer.textContent = "15";
      secondsLeft = 14;
      console.log(`second is 14: ${second}`);
    } else if (second.classList.contains(30)) {
      timer.textContent = "30";
      secondsLeft = 29;
    } else if (second.classList.contains(60)) {
      timer.textContent = "60";
      secondsLeft = 59;
    } else {
      timer.textContent = "120";
      secondsLeft = 119;
    }
  });
});

function startTimer() {
  let interval = setInterval(countdown, 1000);
  function countdown() {
    timer.textContent = secondsLeft;
    timer.classList.remove("opaque");
    console.log(secondsLeft);
    secondsLeft--;
    if (secondsLeft < 0) {
      clearInterval(interval);
    }
  }
}

getNewQuote();
// startTimer();

// TO DO
// prevent change of time while timer is started
// stop game and display stats when timer reaches zero.
// fix the shift capital letter problem
// fix the backspace
