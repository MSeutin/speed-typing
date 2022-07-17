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
  let quote = await getRandomQuote();
  const characters = quote.split("").map((char) => {
    let span = document.createElement("span");
    span.textContent = char;
    text.appendChild(span);
    return span;
  }); 
  let index = 0;
  let currentCharacter = characters[index];
  currentCharacter.classList.add("cursor");

  document.addEventListener("keyup", ({ key }) => {
    if (currentCharacter === characters[0]) {
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
let second = 30;

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
