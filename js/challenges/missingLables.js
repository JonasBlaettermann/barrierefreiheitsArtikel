let demoContainer = null;

export default {
  title: "🏷️ Fehlende Beschriftungen",

  introduction: `
    <p>
        Formulare sollten dauerhaft beschriftet sein, damit Eingabefelder jederzeit
        eindeutig zugeordnet werden können. Fehlen diese Beschriftungen und werden
        stattdessen nur Platzhalter verwendet, gehen wichtige Informationen während
        der Eingabe verloren.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Ein Kunde hat eine neue <strong>Vorgangsnummer</strong> erhalten.
        Aktualisieren Sie diese im folgenden Formular auf:  
        Aktualisieren Sie diese auf:
    </p>

    <p class="processNumber-value">
        <strong>445128</strong>
    </p>
    `,

  explanation: `
    <p>
      In der Simulation wurden die Beschriftungen der Eingabefelder ausgeblendet. Dadurch war nicht mehr eindeutig erkennbar, welche Nummer zu welchem Feld gehört. Obwohl alle Informationen vorhanden waren, mussten Sie vermutlich raten oder Vermutungen anstellen.
    </p>

    <p>
      Dauerhaft sichtbare Beschriftungen (Labels) verbessern die Orientierung
      und erleichtern das Ausfüllen von Formularen für alle Nutzer. Außerdem
      werden sie von Screenreadern zuverlässig erkannt und vorgelesen, wodurch
      Formulare auch für blinde und sehbehinderte Menschen verständlich bleiben.
    </p>

    <p> 
        Besonders Menschen mit kognitiven Einschränkungen, Konzentrationsproblemen oder Gedächtnisschwierigkeiten profitieren davon, da Eingabefelder jederzeit eindeutig zugeordnet werden können. Gleichzeitig erleichtern sichtbare Labels allen Nutzern die Bearbeitung komplexer Formulare.
    </p>
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

        <p class="success-message hidden"></p>

    </div>
    `;

    const saveButton = demo.querySelector("#saveData");
    const successMessage = demo.querySelector(".success-message");
    const inputs = demo.querySelectorAll(".input-prefix input");

    const originalValues = {};

    inputs.forEach((input) => {
      originalValues[input.id] = input.value;
    });

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 6);

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
      const changedInputs = Array.from(inputs).filter(
        (input) => input.value !== originalValues[input.id],
      );

      const names = {
        customerId: "Kunden-ID",
        contractNumber: "Vertragsnummer",
        referenceNumber: "Referenznummer",
        processNumber: "Vorgangsnummer",
      };

      if (changedInputs.length === 1) {
        successMessage.innerHTML = `
        <strong>Die Änderungen wurden gespeichert.</strong><br><br>

        Sie haben folgendes Feld geändert:<br>
        • ${names[changedInputs[0].id]}
    `;
      } else {
        const changedFields = changedInputs
          .map((input) => `• ${names[input.id]}`)
          .join("<br>");

        successMessage.innerHTML = `
        <strong>Die Änderungen wurden gespeichert.</strong><br><br>

        Sie haben folgende Felder geändert:<br>
        ${changedFields}
    `;
      }

      successMessage.classList.remove("hidden");

      enableContinue();
    });
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    demoContainer.querySelectorAll("label").forEach((element) => {
      element.classList.toggle("hidden", isSimulation);
    });
  },
};
