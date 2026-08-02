let demoContainer = null;

export default {
  title: "🌈 Farben sind nicht für alle gleich.",

  introduction: `
    <p>
        Bei einer Rot-Grün-Sehschwäche können bestimmte Rot- und Grüntöne nur schwer
        voneinander unterschieden werden. Werden Informationen ausschließlich über
        Farben vermittelt, kann das zu Missverständnissen führen.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Welche der beiden Statusmeldungen signalisiert ein Problem? Treffen Sie Ihre
        Entscheidung ausschließlich anhand der dargestellten Informationen.
    </p>
`,

  explanation: `
    <p>
      Die beiden Meldungen unterscheiden sich ausschließlich durch ihre Farbe.
      Für viele Menschen mit einer Rot-Grün-Sehschwäche ist dieser Unterschied
      nur schwer oder gar nicht erkennbar.
    </p>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;
    demo.innerHTML = `
        <div class="status-list">

            <button class="status status-ok">
                Status A
            </button>

            <button class="status status-error">
                Status B
            </button>

        </div>
    `;

    const buttons = demo.querySelectorAll(".status");
    let hasSelected = false;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Alte Auswahl entfernen
        buttons.forEach((b) => b.classList.remove("selected"));

        // Neue Auswahl markieren
        button.classList.add("selected");

        // Nur beim ersten Klick den Button aktivieren
        if (!hasSelected) {
          hasSelected = true;
          enableContinue();
        }
      });
    });
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    const ok = document.querySelector(".status-ok");
    const error = document.querySelector(".status-error");

    if (!ok || !error) return;

    if (isSimulation) {
      ok.style.background = "#8f8f3f";
      error.style.background = "#9b8d47";
    } else {
      ok.style.background = "#2ecc71";
      error.style.background = "#e74c3c";
    }
  },
};
