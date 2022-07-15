const gameBox = document.querySelector(".box__word");
const buttonReset = document.querySelector(".btn-reset");
const spanHint = document.querySelector(".span-hint");
const spanGuess = document.querySelector(".span-guess");
const spanLetters = document.querySelector(".span-letters");

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
  console.log(getWord);
  spanHint.textContent = getWord.hint;
  for (let i = 0; i < getWord.word.length; i += 1) {
    createWord(getWord);
  }
  console.log(getWord);
}

createWords();

buttonReset.addEventListener("click", () => {
  gameBox.innerHTML = "";
  spanGuess.textContent = 8;
  spanLetters.textContent = 0;
  createWords();
});
