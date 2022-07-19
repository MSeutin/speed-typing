let url = "https://api.chucknorris.io/jokes/random";
let text = document.querySelector(".text");
let timer = document.querySelector(".timer");
let seconds = document.querySelectorAll(".seconds");

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

  // KEYDOWN, figure out the key.shiftKey problem 
  document.addEventListener("keydown", ({ key }) => {
    // my timer has delay
    if (currentCharacter === characters[0]) {
      timer.textContent = "30";
      startTimer();
    }
    if (key === currentCharacter.textContent) {
      currentCharacter.classList.remove("cursor");
      currentCharacter.classList.add("correct");
      currentCharacter.classList.remove("incorrect");
      currentCharacter = characters[++index]
      currentCharacter.classList.add("cursor");
    }
    else if (key !== currentCharacter.textContent) {
      currentCharacter.classList.remove("cursor");
      currentCharacter.classList.add("incorrect");
      currentCharacter.classList.remove("corret");
      currentCharacter = characters[++index];
      currentCharacter.classList.add("cursor");
    }
  });
}
let second = 29;

function startTimer() {
    let interval = setInterval(countdown, 1000);
    function countdown() {
      timer.textContent = second;
      second--;
      if (second < 0) {
        clearInterval(interval);
      }
    }
}

getNewQuote();
// startTimer();


// EVENT LISTENER ON SECONDS PICKED
seconds.forEach((second) => {
  second.addEventListener("click", () => {
    document.querySelector(".timer-selection").classList.remove("timer-selection");
    second.classList.add("timer-selection");
  })
});