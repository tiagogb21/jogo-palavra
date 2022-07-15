const gameBox = document.querySelector(".box__word");
const buttonReset = document.querySelector(".btn-reset");
const spanHint = document.querySelector(".span-hint");
const spanGuess = document.querySelector(".span-guess");
const spanLetters = document.querySelector(".span-letters");
const message = document.querySelector(".message");

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
  spanHint.textContent = getWord.hint;
  for (let i = 0; i < getWord.word.length; i += 1) {
    createWord(getWord);
  }

  let setChar = document.querySelectorAll(".char");

  document.addEventListener("keydown", (e) => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const isEventFinInLetters = letters.includes(e.key);
    const isEventInWord = getWord.word.includes(e.key);

    if (isEventFinInLetters && isEventInWord) {
      let findIndex = getWord.word.indexOf(e.key);
      setChar[findIndex].textContent = e.key;
    } else {
      let result = +spanGuess.textContent;
      spanGuess.textContent = +spanGuess.textContent - 1;
      if (result === 0) {
        message.textContent = "😵‍💫 Você perdeu!";
        return;
      }
      spanLetters.textContent = +spanLetters.textContent + 1;
    }
  });
}

createWords();

buttonReset.addEventListener("click", () => {
  gameBox.innerHTML = "";
  spanGuess.textContent = 8;
  spanLetters.textContent = 0;
  createWords();
});
