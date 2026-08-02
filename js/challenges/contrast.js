let demoContainer = null;

export default {
  title: "⚫ Kontrast entscheidet über Lesbarkeit.",

  introduction: `
    <p>
        Ein ausreichender Farbkontrast ist entscheidend dafür, dass Texte gut lesbar sind.
        Ist der Kontrast zwischen Schrift und Hintergrund zu gering, können Informationen
        schwer oder gar nicht erkannt werden.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Erstellen Sie ein Passwort, das alle Anforderungen erfüllt. Lesen Sie dazu die
        Passwortregeln und geben Sie ein passendes Passwort ein.   
    </p>
`,

  explanation: `
    <p>
        Die Passwortanforderungen wurden mit einem zu geringen Farbkontrast dargestellt.
        Dadurch waren sie deutlich schwerer zu lesen und die Aufgabe unnötig erschwert.
    </p>

    <p>
        Ein ausreichender Kontrast verbessert die Lesbarkeit – insbesondere für Menschen
        mit Sehbeeinträchtigungen, aber auch bei ungünstigen Lichtverhältnissen oder auf
        Displays mit geringerer Qualität.
    </p>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;

    demo.innerHTML = `
        <div class="password-dialog">

            <h3>Passwort erstellen</h3>

            <label for="password">Neues Passwort</label>
            <input
                id="password"
                type="password"
                autocomplete="new-password"
            />

            <div class="password-rules">
                <h4>Passwortanforderungen</h4>

                <ul>
                    <li data-rule="length">☐ Mindestens 6 Zeichen</li>
                    <li data-rule="upper">☐ Einen Großbuchstaben</li>
                    <li data-rule="number">☐ Eine Zahl</li>
                    <li data-rule="special">☐ Ein Sonderzeichen</li>
                </ul>
            </div>

            <div class="button-row">
                <button id="save-password" disabled>
                    Speichern
                </button>
            </div>
            <div>
                <p class="success-message hidden">
                    ✓ Passwort erfolgreich erstellt.
                </p>
                </div>

        </div>
    `;

    const passwordInput = demo.querySelector("#password");
    const saveButton = demo.querySelector("#save-password");
    const successMessage = demo.querySelector(".success-message");

    const rules = {
      length: demo.querySelector('[data-rule="length"]'),
      upper: demo.querySelector('[data-rule="upper"]'),
      number: demo.querySelector('[data-rule="number"]'),
      special: demo.querySelector('[data-rule="special"]'),
    };

    let challengeCompleted = false;

    function updateRule(element, fulfilled) {
      element.textContent = `${fulfilled ? "☑" : "☐"} ${element.textContent.substring(2)}`;

      element.classList.toggle("fulfilled", fulfilled);

      return fulfilled;
    }

    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;

      const lengthOk = updateRule(rules.length, password.length >= 6);

      const upperOk = updateRule(rules.upper, /[A-ZÄÖÜ]/.test(password));

      const numberOk = updateRule(rules.number, /\d/.test(password));

      const specialOk = updateRule(
        rules.special,
        /[^A-Za-z0-9ÄÖÜäöüß]/.test(password),
      );

      const valid = lengthOk && upperOk && numberOk && specialOk;

      saveButton.disabled = !valid;
    });

    saveButton.addEventListener("click", () => {
      if (challengeCompleted) return;

      challengeCompleted = true;

      successMessage.classList.remove("hidden");

      enableContinue();
    });
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    const rules = demoContainer.querySelector(".password-rules");

    if (!rules) return;

    rules.classList.toggle("low-contrast", isSimulation);
  },
};
