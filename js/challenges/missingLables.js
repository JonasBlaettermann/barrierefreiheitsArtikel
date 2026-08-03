let demoContainer = null;

export default {
  title: "🏷️ Fehlende Beschriftungen",

  introduction: `
    <h3>Warum sichtbare Beschriftungen wichtig sind</h3>

    <p>
        Formulare sollten dauerhaft sichtbare Beschriftungen besitzen, damit
        Eingabefelder jederzeit eindeutig zugeordnet werden können. Werden
        stattdessen ausschließlich Platzhalter oder andere Hinweise verwendet,
        gehen wichtige Informationen häufig während der Eingabe verloren.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Ein Kunde hat eine neue <strong>Vorgangsnummer</strong> erhalten.
        Aktualisieren Sie diese auf: <strong>445128</strong>
    </p>
    `,

  explanation: `
    <h3>Warum ist das problematisch?</h3>

    <p>
        In der nicht barrierefreien Variante fehlen die sichtbaren
        Beschriftungen der Eingabefelder. Sobald ein Feld ausgefüllt wird,
        ist nicht mehr eindeutig erkennbar, welche Information dort
        eingetragen werden soll. Dadurch steigt die Wahrscheinlichkeit von
        Eingabefehlern deutlich.
    </p>

   <p>
        Dauerhaft sichtbare Beschriftungen erleichtern die Orientierung,
        unterstützen beim Ausfüllen komplexer Formulare und helfen auch
        nach einer Unterbrechung dabei, Eingaben korrekt zuzuordnen.
        Davon profitieren alle Nutzerinnen und Nutzer.
    </p>

    <p>
        Außerdem können Screenreader sichtbare Beschriftungen zuverlässig
        mit den jeweiligen Eingabefeldern verknüpfen. Dadurch werden
        Formulare auch für blinde und sehbehinderte Menschen verständlich
        und zuverlässig bedienbar.
    </p>

    <h4>Weiterführende Informationen</h4>

    <ul>
        <li>
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html" target="_blank">
                WCAG 2.2 – Understanding Success Criterion 3.3.2: Labels or Instructions
            </a>
        </li>

        <li>
            <a href="https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions" target="_blank">
                WCAG Quick Reference – 3.3.2 Labels or Instructions
            </a>
        </li>
    </ul>   
    `,

  render({ demo, enableContinue }) {
    demoContainer = demo;

    demo.innerHTML = `
    <div class="form-dialog">

        <h3>Kundendaten</h3>

        <div class="form-group">
            <label for="customerId">Kunden-ID</label>
            <div class="input-prefix">
                <span>KM-</span>
                <input id="customerId" type="text" inputmode="numeric" maxlength="6" value="482731">
            </div>
        </div>

        <div class="form-group">
            <label for="contractNumber">Vertragsnummer</label>
            <div class="input-prefix">
                <span>VM-</span>
                <input id="contractNumber" type="text" inputmode="numeric" maxlength="6" value="638415">
            </div>
        </div>

        <div class="form-group">
            <label for="referenceNumber">Referenznummer</label>
            <div class="input-prefix">
                <span>RM-</span>
                <input id="referenceNumber" type="text" inputmode="numeric" maxlength="6" value="591827">
            </div>
        </div>

        <div class="form-group">
            <label for="processNumber">Vorgangsnummer</label>
            <div class="input-prefix">
                <span>VG-</span>
                <input id="processNumber" type="text" inputmode="numeric" maxlength="6" value="345128">
            </div>
        </div>

        <div class="button-row">
            <button id="saveData" disabled>
                Speichern
            </button>
        </div>

    </div>
    `;

    demoContainer
      .querySelectorAll("label")
      .forEach((label) => label.classList.add("hidden"));

    const saveButton = demo.querySelector("#saveData");
    const inputs = demo.querySelectorAll(".input-prefix input");

    const originalValues = {};

    inputs.forEach((input) => {
      originalValues[input.id] = input.value;
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 6);

        const wrapper = input.closest(".input-prefix");

        wrapper.classList.toggle(
          "modified",
          input.value !== originalValues[input.id],
        );
        updateSaveButton();
      });
    });

    function updateSaveButton() {
      const changedInputs = Array.from(inputs).filter(
        (input) => input.value !== originalValues[input.id],
      );

      saveButton.disabled = changedInputs.length === 0;
    }

    saveButton.addEventListener("click", () => {
      enableContinue();
    });
  },

  setAccessibilityMode(isAccessible) {
    demoContainer
      .querySelectorAll("label")
      .forEach((label) => label.classList.toggle("hidden", !isAccessible));

    demoContainer.classList.toggle("accessible", isAccessible);
  },
};
