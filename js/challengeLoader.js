import { speak } from "./reader.js";

const title = document.getElementById("title");
const introduction = document.getElementById("introduction");
const demo = document.getElementById("demo");

const resultSection = document.getElementById("result");
const resultText = document.getElementById("resultText");

const checkButton = document.getElementById("checkButton");
const comparisonPanel = document.getElementById("comparisonPanel");
const toggle = document.getElementById("toggleView");
const accessibilityToggle = document.getElementById("accessibility-switch");
const simulationToggle = document.getElementById("simulation-toggle");

const simulationLeft = document.getElementById("simulation-left");
const simulationRight = document.getElementById("simulation-right");
const accessibilityLeft = document.getElementById("accessibility-left");
const accessibilityRight = document.getElementById("accessibility-right");

let currentChallenge = null;
let explanationVisible = false;

let onNext = () => {};
let onComplete = () => {};

checkButton.addEventListener("focus", () => {
  speak(`Button, ${checkButton.textContent}`);
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

function updateToggleLabels() {
  simulationLeft.classList.toggle("active", !toggle.checked);
  simulationRight.classList.toggle("active", toggle.checked);

  accessibilityLeft.classList.toggle("active", !accessibilityToggle.checked);
  accessibilityRight.classList.toggle("active", accessibilityToggle.checked);
}

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
  comparisonPanel.classList.add("hidden");

  const hasSimulation = typeof challenge.setSimulationMode === "function";
  simulationToggle.classList.toggle("hidden", !hasSimulation);

  accessibilityToggle.checked = false;
  toggle.checked = true;
  updateToggleLabels();

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
  if (hasSimulation) {
    challenge.setSimulationMode?.(true);
  }
}

checkButton.addEventListener("click", () => {
  if (!explanationVisible) {
    explanationVisible = true;

    resultSection.classList.add("visible");
    comparisonPanel.classList.remove("hidden");
    checkButton.textContent = "Nächste Challenge →";

    onComplete();
  } else {
    onNext();
  }
});

toggle.addEventListener("change", () => {
  if (!currentChallenge) return;

  currentChallenge.setSimulationMode?.(toggle.checked);

  updateToggleLabels();

  speak(toggle.checked ? "Eingeschränkt aktiviert." : "Normativ aktiviert.");
});

accessibilityToggle.addEventListener("change", () => {
  if (!currentChallenge) return;

  currentChallenge.setAccessibilityMode?.(accessibilityToggle.checked);

  updateToggleLabels();
});
