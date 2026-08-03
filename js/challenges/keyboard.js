let demoContainer = null;

export default {
  title: "⌨️ Tastaturnavigation",

  introduction: `
    <h3>Warum Tastaturnavigation wichtig ist</h3>

    <p>
        Nicht alle Menschen können eine Maus verwenden. Viele bedienen
        Webseiten ausschließlich mit der Tastatur oder anderen
        Eingabegeräten, die sich wie eine Tastatur verhalten.
        Deshalb müssen alle interaktiven Elemente zuverlässig erreichbar
        und ihr Fokus jederzeit eindeutig erkennbar sein.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Bedienen Sie den folgenden Anmeldedialog ausschließlich mit der
        Tastatur. Verwenden Sie die <strong>Tabulatortaste</strong>, um
        zwischen den Elementen zu wechseln, und schließen Sie die
        Anmeldung über die Schaltfläche <strong>Anmelden</strong> ab.
    </p>

    <p>
        Erst nach Abschluss der Aufgabe können Sie zwischen der
        simulierten und der normativen Darstellung sowie einer
        barrierefreien Variante wechseln.
    </p>
  `,

  explanation: `
    <h3>Warum ist das problematisch?</h3>

    <p>
        In der nicht barrierefreien Variante wurde die sichtbare
        Fokusmarkierung entfernt. Dadurch ist nicht mehr erkennbar,
        welches Element aktuell ausgewählt ist. Für Menschen, die
        ausschließlich mit der Tastatur navigieren, wird die Bedienung
        dadurch schnell schwierig oder sogar unmöglich.
    </p>

    <p>
        Eine deutlich sichtbare Fokusmarkierung erleichtert die
        Orientierung und sorgt dafür, dass jederzeit nachvollziehbar
        bleibt, welches Element als Nächstes aktiviert wird. Davon
        profitieren nicht nur Menschen mit motorischen
        Einschränkungen, sondern auch alle, die eine Tastatur zur
        Navigation verwenden.
    </p>

    <p>
        Die Web Content Accessibility Guidelines (WCAG) fordern deshalb,
        dass der Tastaturfokus sichtbar und eindeutig erkennbar sein
        muss.
    </p>

    <h4>Weiterführende Informationen</h4>

    <ul>
        <li>
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html" target="_blank">
                WCAG 2.2 – Understanding Success Criterion 2.4.7: Focus Visible
            </a>
        </li>

        <li>
            <a href="https://www.w3.org/WAI/WCAG22/quickref/#focus-visible" target="_blank">
                WCAG Quick Reference – 2.4.7 Focus Visible
            </a>
        </li>
    </ul>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;

    demo.innerHTML = `
        <div class="login-dialog">

            <h3>Anmeldung</h3>

            <label for="username">Benutzername</label>
            <input id="username" type="text" value="MaxMuster" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">

            <label for="password">Passwort</label>
            <input id="password" type="password" value="Secure123!" autocomplete="new-password">

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

        </div>
        `;

    const usernameInput = demo.querySelector("#username");
    const loginButton = demo.querySelector("#loginButton");

    usernameInput.focus();

    demo.addEventListener("mousedown", (event) => {
      if (demoContainer.classList.contains("keyboard-simulation")) {
        event.preventDefault();
      }
    });

    demo.querySelectorAll("button, .forgot-password").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });

    loginButton.addEventListener("focus", () => {
      enableContinue();
    });

    loginButton.addEventListener("click", (event) => {
      if (
        demoContainer.classList.contains("keyboard-simulation") &&
        event.detail !== 0
      ) {
        return;
      }

      enableContinue();
    });

    let tabCount = 0;

    demo.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        tabCount++;

        if (tabCount >= 5) {
          enableContinue();
        }
      }
    });
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    demoContainer.classList.toggle("keyboard-simulation", isSimulation);

    // demoContainer.querySelector("#username")?.focus();
  },

  setAccessibilityMode(isAccessible) {
    if (!demoContainer) return;

    demoContainer.classList.toggle("accessible", isAccessible);

    // demoContainer.querySelector("#username")?.focus();
  },
};
