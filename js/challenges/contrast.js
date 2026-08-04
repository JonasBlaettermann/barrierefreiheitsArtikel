let demoContainer = null;

export default {
  title: "⚫ Farbkontraste",

  introduction: `
    <h3>Schlechter Kontrast erschwert das Lesen</h3>

    <p>
        Ein ausreichender Farbkontrast ist entscheidend dafür, dass Texte gut lesbar sind.
        Ist der Kontrast zwischen Schrift und Hintergrund zu gering, können Informationen
        schwer oder gar nicht erkannt werden.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Erstellen Sie ein Passwort, das alle Anforderungen erfüllt. Orientieren Sie sich dabei an den angezeigten Passwortregeln.
    </p>

    <p>
        Erst nach Abschluss der Aufgabe können Sie zwischen der simulierten und der
        normativen Darstellung sowie einer barrierefreien Variante wechseln.
    </p>
`,

  explanation: `
    <h3>Warum ist das problematisch?</h3>

    <p>
        In der eingeschränkten Variante besitzen die Passwortregeln einen zu geringen
        Farbkontrast zum Hintergrund. Dadurch werden sie schwer lesbar und wichtige
        Informationen können leicht übersehen werden.
    </p>

    <p>
        Ausreichende Kontraste erleichtern das Lesen für alle Menschen. Besonders
        profitieren Personen mit Sehbeeinträchtigungen, ältere Menschen sowie Nutzerinnen
        und Nutzer bei Sonnenlicht oder auf Displays mit geringerer Qualität.
    </p>

    <p>
        Die Web Content Accessibility Guidelines (WCAG) definieren deshalb Mindestanforderungen an den Kontrast von Texten, damit Inhalte zuverlässig wahrgenommen werden können.
    </p>

    <h4>Weiterführende Informationen</h4>

    <ul>
        <li><a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" target="_blank">WCAG 2.2 – Understanding Success Criterion 1.4.3: Contrast (Minimum)</a></li>

        <li><a href="https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum" target="_blank">WCAG Quick Reference – 1.4.3 Contrast (Minimum)</a></li>
    </ul>
`,

  render({ demo, enableContinue }) {
    demoContainer = demo;
    demoContainer.classList.remove("low-contrast");
    demoContainer.classList.remove("accessible");

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
            <p class="password-error hidden">
                Das Passwort erfüllt noch nicht alle Anforderungen.
            </p>

            <p class="password-success hidden">
                ✓ Das Passwort erfüllt alle Anforderungen.
            </p>
        </div>
    `;

    const passwordInput = demo.querySelector("#password");
    const saveButton = demo.querySelector("#save-password");
    const errorMessage = demo.querySelector(".password-error");
    const successMessage = demo.querySelector(".password-success");

    const rules = {
      length: demo.querySelector('[data-rule="length"]'),
      upper: demo.querySelector('[data-rule="upper"]'),
      number: demo.querySelector('[data-rule="number"]'),
      special: demo.querySelector('[data-rule="special"]'),
    };

    let challengeCompleted = false;

    let lengthOk = false;
    let upperOk = false;
    let numberOk = false;
    let specialOk = false;

    function updateRule(element, fulfilled) {
      const text = element.textContent.slice(2);

      element.textContent = `${fulfilled ? "☑" : "☐"} ${text}`;
      element.classList.toggle("fulfilled", fulfilled);

      return fulfilled;
    }

    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;

      lengthOk = updateRule(rules.length, password.length >= 6);

      upperOk = updateRule(rules.upper, /[A-ZÄÖÜ]/.test(password));

      numberOk = updateRule(rules.number, /\d/.test(password));

      specialOk = updateRule(
        rules.special,
        /[^A-Za-z0-9ÄÖÜäöüß]/.test(password),
      );

      if (!challengeCompleted && password.length >= 6) {
        challengeCompleted = true;
        enableContinue();
      }

      saveButton.disabled = false;
    });

    saveButton.addEventListener("click", () => {
      if (lengthOk && upperOk && numberOk && specialOk) {
        errorMessage.classList.add("hidden");
        successMessage.classList.remove("hidden");
        return;
      }

      successMessage.classList.add("hidden");
      errorMessage.classList.remove("hidden");
    });
  },

  setSimulationMode(isSimulation) {
    demoContainer.classList.toggle("low-contrast", isSimulation);
  },

  setAccessibilityMode(isAccessible) {
    demoContainer.classList.toggle("accessible", isAccessible);
  },
};
