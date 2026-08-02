import { speak } from "./reader.js";

const title = document.getElementById("title");
const introduction = document.getElementById("introduction");
const demo = document.getElementById("demo");

const resultSection = document.getElementById("result");
const resultText = document.getElementById("resultText");

const checkButton = document.getElementById("checkButton");
const comparison = document.getElementById("comparison");
const toggle = document.getElementById("toggleView");
const accessibilityToggle = document.getElementById("accessibility-switch");
const accessibilityContainer = document.getElementById("accessibility-toggle");

let currentChallenge = null;
let explanationVisible = false;

let onNext = () => {};
let onComplete = () => {};

checkButton.addEventListener("focus", () => {
  speak(`Button, ${checkButton.textContent}`);
});

toggle.addEventListener("focus", () => {
  speak(
    toggle.checked
      ? "Simulation. Umschalter. Eingeschränkt aktiviert."
      : "Simulation. Umschalter. Normativ aktiviert.",
  );
});

accessibilityToggle.addEventListener("focus", () => {
  speak(
    accessibilityToggle.checked
      ? "Barrierefreiheit. Umschalter. Barrierefrei aktiviert."
      : "Barrierefreiheit. Umschalter. Nicht barrierefrei aktiviert.",
  );
});

title.addEventListener("focus", () => {
  speak(title.textContent);
});

introduction.addEventListener("focus", () => {
  speak(introduction.innerText);
});

resultText.addEventListener("focus", () => {
  speak(resultText.innerText);
});

export function loadChallenge(
  challenge,
  { onNext: next, onComplete: complete },
) {
  currentChallenge = challenge;

  onNext = next;
  onComplete = complete;

  // Reset
  explanationVisible = false;

  demo.innerHTML = "";
  resultSection.classList.remove("visible");
  comparison.classList.add("hidden");
  accessibilityContainer.classList.add("hidden");
  accessibilityToggle.checked = false;
  toggle.checked = true;

  checkButton.disabled = true;
  checkButton.textContent = "Bitte führen Sie zuerst die Aufgabe aus";

  // Inhalte laden
  title.innerHTML = challenge.title;
  introduction.innerHTML = challenge.introduction;
  resultText.innerHTML = challenge.explanation;
  title.tabIndex = -1;
  introduction.tabIndex = -1;
  resultText.tabIndex = -1;

  // Demo aufbauen
  challenge.render({
    demo,
    enableContinue() {
      checkButton.disabled = false;
      checkButton.textContent = "Weiter zur Erklärung";
    },
  });
  if (challenge.onLoaded) {
    challenge.onLoaded();
  }
  challenge.setAccessibilityMode?.(false);
  challenge.setSimulationMode?.(true);
}

checkButton.addEventListener("click", () => {
  if (!explanationVisible) {
    explanationVisible = true;

    resultSection.classList.add("visible");
    comparison.classList.remove("hidden");
    accessibilityContainer.classList.remove("hidden");

    checkButton.textContent = "Nächste Challenge →";

    onComplete();

    resultSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    onNext();
  }
});

toggle.addEventListener("change", () => {
  if (!currentChallenge) return;

  currentChallenge.setSimulationMode?.(toggle.checked);

  speak(toggle.checked ? "Eingeschränkt aktiviert." : "Normativ aktiviert.");
});

accessibilityToggle.addEventListener("change", () => {
  if (!currentChallenge) return;

  currentChallenge.setAccessibilityMode?.(accessibilityToggle.checked);
});
