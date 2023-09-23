"use strict";

const europeanCountries = [
  "albania",
  "andorra",
  "austria",
  "belarus",
  "belgium",
  "bosnia",
  "bulgaria",
  "croatia",
  "cyprus",
  "czech republic",
  "denmark",
  "estonia",
  "finland",
  "france",
  "germany",
  "greece",
  "hungary",
  "iceland",
  "ireland",
  "italy",
  "kosovo",
  "latvia",
  "liechtenstein",
  "lithuania",
  "luxembourg",
  "malta",
  "moldova",
  "monaco",
  "montenegro",
  "netherlands",
  "norway",
  "poland",
  "portugal",
  "romania",
  "russia",
  "san Marino",
  "serbia",
  "slovakia",
  "slovenia",
  "spain",
  "sweden",
  "switzerland",
  "ukraine",
  "united kingdom",
  "vatican City",
];

//starting out program
let secretNumber = Math.trunc(Math.random() * europeanCountries.length + 1);
let ourCountry = europeanCountries[secretNumber];
let dataForHint;

//console.log(ourCountry);

//displaying messages

function displayMessage(valueM) {
  document.querySelector(".message").textContent = valueM;
}

function setTextContent(content, className) {
  document.querySelector(className).textContent = content;
}

let score = 20;
let highscore = 0;
let currentDiv = document.querySelector(".number");

////////////////check button event handler//////////////////////////

const checkAnswer = function () {};

document.querySelector(".check").addEventListener("click", function () {
  const guess = document.querySelector(".guess").value;

  //when there is no input
  if (!guess) {
    setTextContent("No country!", ".message");
  }

  //when the answer is right
  else if (guess === europeanCountries[secretNumber]) {
    let countryGet = europeanCountries[secretNumber];
    let num = document.querySelector(".number");

    setTextContent("Correct country!", ".message");

    num.style.width = "30rem";
    document.body.style.backgroundColor = "#38598b";

    //hiding question mark div
    currentDiv.classList.add("disappear");

    //API fetching for country data
    const displayCountry = async function (country) {
      try {
        const dataCountry = await fetch(
          `https://restcountries.com/v3.1/name/${country}`
        );

        const dataCountry2 = await dataCountry.json();
        //  console.log(dataCountry2);
        console.log(dataCountry2[0]);

        const hold_data = dataCountry2[0];

        //creating a new html element
        const img = document.createElement("img");

        //adding a class flag to it so it can be used later to reset the data
        img.classList.add("flag");

        //setting img source from fetched data
        img.src = hold_data.flags.png;

        //adding the flag
        const parentEl = currentDiv.parentElement;

        parentEl.append(img, currentDiv);
      } catch (err) {
        console.error(err);
      }
    };

    //calling our function
    displayCountry(countryGet);

    //highscore setting
    if (score > highscore) {
      setTextContent(score, ".highscore");
      highscore = score;
    } else if (highscore > score) {
      setTextContent(highscore, ".highscore");
    }
  }

  //when wrong guess
  else if (guess !== secretNumber) {
    if (score > 0) {
      setTextContent("Try again!", ".message");
      score--;
      setTextContent(score, ".score");
    } else {
      displayMessage("You lost the game!");
    }
  }
});

//HINT FUNCTIONALITY

const hint = document.querySelector(".hint");
const paragraph = document.createElement("p");
paragraph.classList.add("hintText");

hint.addEventListener("click", () => {
  dataForHint = europeanCountries[secretNumber];

  //extracting first letter for hint
  const firstLetter = dataForHint?.slice(0, 1);

  // Setting the text content of the <p> element

  paragraph.textContent = "First letter is " + firstLetter;

  //styling
  paragraph.style.marginBottom = "30px";
  paragraph.style.fontSize = "20px";

  //adding class to help in reset
  paragraph.classList.add("storeState");

  // Getting the parent element of the .hint element
  const parentElement = hint.parentElement;

  // Inserting the <p> element before the .hint element
  parentElement.insertBefore(paragraph, hint);

  //removing the hint button after showing the hint
  hint.classList.add("disappear");
});

//////////////////////////////AGAIN FUNCTIONALITY////////////////////

document.querySelector(".again").addEventListener("click", function () {
  //reseting the game generated country and score
  secretNumber = Math.trunc(Math.random() * europeanCountries.length + 1);
  ourCountry = europeanCountries[secretNumber];
  score = 20;

  setTextContent("Start guessing...", ".message");

  setTextContent("0", ".score");
  document.body.style.backgroundColor = "#333";

  document.querySelector(".number").style.width = "15rem";

  setTextContent("?", ".number");

  document.querySelector(".guess").value = "";

  //hint button
  const disappearList = document.querySelector(".disappearList");

  hint.classList.remove("disappear");

  let hintTextHide = document.querySelector(".hintText");

  if (hintTextHide !== null) {
    hintTextHide.textContent = "";
  }

  document.querySelector(".guess").textContent = "";

  currentDiv.classList.remove("disappear");

  const flagRemove = document.querySelector(".flag");

  flagRemove?.remove();
});
