const gameBox = document.querySelector(".box__word");
const buttonReset = document.querySelector(".btn-reset");
const spanHint = document.querySelector(".span-hint");
const spanGuess = document.querySelector(".span-guess");
const spanLetters = document.querySelector(".span-letters");
const message = document.querySelector(".message");

let store = [];

function getRandomWord() {
  const randomNumber = Math.round(Math.random() * wordList.length);
  const randomWord = wordList[randomNumber];
  return randomWord;
}

function createWord(getWord) {
  const newChar = document.createElement("div");
  gameBox.appendChild(newChar);
  newChar.classList.add("char");
  const getWordLength = Math.round(100 / getWord.word.length) - 5 + "%";
  newChar.style.width = getWordLength;
  return newChar;
}

function createWords() {
  const getWord = getRandomWord();

  let verify = true;

  spanHint ? (spanHint.textContent = getWord.hint) : "";

  for (let i = 0; i < getWord.word.length; i += 1) {
    createWord(getWord);
  }

  let setChar = document.querySelectorAll(".char");

  function rightWord(e) {
    let findIndex = getWord.word.indexOf(e);
    setChar[findIndex].textContent = e;
  }

  function wrongWord(result) {
    spanGuess.textContent = +spanGuess.textContent - 1;
    spanLetters.textContent = +spanLetters.textContent + 1;
    if (result === 1) {
      message.textContent = "😵‍💫 Você perdeu!";
      verify = false;
    }
  }

  document.addEventListener("keydown", (e) => {
    if (verify) {
      const letters = "abcdefghijklmnopqrstuvwxyz";
      const isEventFindInLetters = letters.includes(e.key);
      const isEventInWord = getWord.word.includes(e.key);
      const result = +spanGuess.textContent;

      if (!store.includes(e.key)) {
        if (isEventFindInLetters && isEventInWord) {
          rightWord(e.key);
        }

        if (isEventFindInLetters) {
          wrongWord(result);
        }

        store.push(e.key);
      }
    }
  });
}

createWords();

buttonReset.addEventListener("click", () => {
  gameBox.innerHTML = "";
  spanGuess.textContent = 8;
  spanLetters.textContent = 0;
  store = [];
  message.textContent = "";
  createWords();
});
