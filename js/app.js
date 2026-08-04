import { loadChallenge } from "./challengeLoader.js";

import colorBlindness from "./challenges/colorBlindness.js";
import contrast from "./challenges/contrast.js";
import keyboard from "./challenges/keyboard.js";
import missingLabels from "./challenges/missingLables.js";
import screenReader from "./challenges/screenReader.js";
import responsiveDesign from "./challenges/responsiveDesign.js";

const challenges = [
  colorBlindness,
  contrast,
  keyboard,
  missingLabels,
  screenReader,
  responsiveDesign,
];

let currentChallenge = 0;
const completedChallenges = new Set();

const navigation = document.getElementById("challengeNavigation");

function renderNavigation() {
  navigation.innerHTML = "";

  challenges.forEach((_, index) => {
    const button = document.createElement("button");
    button.classList.add("challenge-dot");

    if (completedChallenges.has(index)) {
      button.classList.add("completed");
    }

    if (index === currentChallenge) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      showChallenge(index);
    });

    navigation.appendChild(button);

    if (index < challenges.length - 1) {
      const line = document.createElement("div");
      line.classList.add("challenge-line");

      navigation.appendChild(line);
    }
  });
}

export function nextChallenge() {
  if (currentChallenge < challenges.length - 1) {
    showChallenge(currentChallenge + 1);
  } else {
    alert("Alle Challenges abgeschlossen!");
  }
}

function completeChallenge() {
  completedChallenges.add(currentChallenge);
  renderNavigation();
}

export function showChallenge(index) {
  currentChallenge = index;

  renderNavigation();

  loadChallenge(challenges[currentChallenge], {
    onNext: nextChallenge,
    onComplete: completeChallenge,
  });
}

showChallenge(0);
