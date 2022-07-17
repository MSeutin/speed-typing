let url = "https://api.chucknorris.io/jokes/random";
let text = document.querySelector(".text");
let timer = document.querySelector(".timer");

function getRandomQuote() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.value)
    .catch((err) => console.error("request failed", err));
}

async function getNewQuote() {
  const quote = await getRandomQuote();
  text.textContent = "";
  quote.split("").forEach((character) => {
    let span = document.createElement("span");
    span.textContent = character;
    text.appendChild(span);
  });
  textInput.addEventListener("input", () => {
    arrayQuote = textDisplay.querySelectorAll("span");
    arrayValue = textInput.value.split("");
    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index];
      if (character == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        correct = false;
      } else if (character === characterSpan.textContent) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
      } else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        correct = false;
      }
    });
      if (correct) {
          getNewQuote();
          startTimer();

      }
  });
}
let second = 10;

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
startTimer();
