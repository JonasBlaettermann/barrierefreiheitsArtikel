const title = document.getElementById("title");
const introduction = document.getElementById("introduction");
const demo = document.getElementById("demo");

const resultSection = document.getElementById("result");
const resultText = document.getElementById("resultText");

const checkButton = document.getElementById("checkButton");
const comparison = document.getElementById("comparison");
const toggle = document.getElementById("toggleView");

let currentChallenge = null;
let explanationVisible = false;

let onNext = () => {};
let onComplete = () => {};

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
  //comparison.classList.add("hidden");
  toggle.checked = true;

  checkButton.disabled = true;
  checkButton.textContent = "Bitte führen Sie zuerst die Aufgabe aus";

  // Inhalte laden
  title.innerHTML = challenge.title;
  introduction.innerHTML = challenge.introduction;
  resultText.innerHTML = challenge.explanation;

  // Demo aufbauen
  challenge.render({
    demo,
    enableContinue() {
      checkButton.disabled = false;
      checkButton.textContent = "Weiter zur Erklärung";
    },
  });
  challenge.setSimulationMode(true);
}

checkButton.addEventListener("click", () => {
  if (!explanationVisible) {
    explanationVisible = true;

    resultSection.classList.add("visible");
    comparison.classList.remove("hidden");

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

  currentChallenge.setSimulationMode(toggle.checked);
});
