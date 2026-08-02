let demoContainer = null;

export default {
  title: "⌨️ Eine Maus ist nicht selbstverständlich.",

  introduction: `
    <p>
      Nicht alle Menschen können eine Maus verwenden. Viele bedienen Webseiten
      ausschließlich mit der Tastatur.
    </p>

    <p>
      <strong>Ihre Aufgabe:</strong><br>
      Bedienen Sie den folgenden Dialog ausschließlich mit der Tastatur.
      Verwenden Sie <strong>Tab</strong>, um zwischen den Elementen zu wechseln,
      und <strong>Enter</strong> oder <strong>Leertaste</strong>, um Schaltflächen
      zu aktivieren. Achten Sie darauf, wie gut Sie erkennen können, welches
      Element gerade den Fokus besitzt.
    </p>
  `,

  explanation: `
    <p>
      Menschen, die keine Maus verwenden können, navigieren ausschließlich mit
      der Tastatur. Eine sichtbare Fokusmarkierung zeigt jederzeit, welches
      Element aktuell ausgewählt ist. Wird diese Markierung entfernt, wird die
      Bedienung schnell schwierig oder sogar unmöglich.<br>
      Viele Webseiten entfernen die Fokusmarkierung aus gestalterischen Gründen (outline: none), ohne einen gleichwertigen Ersatz bereitzustellen. Für Menschen, die mit der Tastatur navigieren, wird die Bedienung dadurch schnell schwierig oder unmöglich.
    </p>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;
    demo.innerHTML = `
        <div class="login-dialog">

            <h3>Anmeldung</h3>

            <label for="username">Benutzername</label>
            <input id="username" type="text">

            <label for="password">Passwort</label>
            <input id="password" type="password">

            <label class="checkbox-row">
            <input id="remember" type="checkbox">
            Angemeldet bleiben
            </label>

            <a href="#" class="forgot-password">
            Passwort vergessen?
            </a>

            <div class="button-row">
            <button type="button" id="cancelButton">Abbrechen</button>
            <button type="button" id="loginButton">Anmelden</button>
            </div>

            <p id="loginResult" class="login-result"></p>

        </div>
        `;

    const usernameInput = demo.querySelector("#username");
    usernameInput.focus();

    demo.querySelectorAll("button, .forgot-password").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });

    const loginButton = demo.querySelector("#loginButton");
    const result = demo.querySelector("#loginResult");

    loginButton.addEventListener("click", () => {
      result.textContent = "✓ Anmeldung erfolgreich";
      enableContinue();
    });

    let tabCount = 0;

    demo.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        tabCount++;

        if (tabCount >= 6) {
          enableContinue();
        }
      }
    });
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    if (isSimulation) {
      demoContainer.classList.add("keyboard-simulation");
    } else {
      demoContainer.classList.remove("keyboard-simulation");
    }
  },
};
