let demoContainer = null;

let simulationMode = true;
let accessibilityMode = false;

const cards = [
  { title: "👥 Kunden", value: "1.284 Kunden" },
  { title: "📄 Verträge", value: "842 Verträge" },
  { title: "👤 Benutzer", value: "18 Benutzer", target: true },
  { title: "💰 Rechnungen", value: "312 offen" },
  { title: "📦 Produkte", value: "587 Produkte" },
  { title: "⚙️ Einstellungen", value: "24 Optionen" },
];

function updateLayout() {
  if (!demoContainer) return;

  const dashboard = demoContainer.querySelector(".dashboard");
  const zoomContent = demoContainer.querySelector(".zoom-content");
  const zoomText = demoContainer.querySelector(".browser-zoom");
  const viewport = demoContainer.querySelector(".zoom-viewport");

  zoomContent.classList.toggle("zoomed", simulationMode);

  zoomText.textContent = simulationMode ? "🔍 400 %" : "🔍 100 %";

  viewport.classList.toggle("no-scroll", !simulationMode);

  dashboard.classList.toggle("accessible", simulationMode && accessibilityMode);
}

export default {
  title: "🔍 Webseiten bei 400 % Zoom nutzen",

  introduction: `
        <p>
            🔍 <strong>Hinweis:</strong> Diese Challenge simuliert die Nutzung einer Webseite bei einer Vergrößerung von 400&nbsp;%. Die Darstellung wurde vereinfacht und dient ausschließlich der Veranschaulichung.
        </p>

        <p>
            Viele Menschen vergrößern Webseiten deutlich, beispielsweise aufgrund einer Sehbehinderung oder eingeschränkten Sehkraft. Dabei sollte die Seite weiterhin ohne horizontales Scrollen nutzbar und verständlich bleiben.
        </p>

        <p>
            <strong>Ihre Aufgabe:</strong><br>
            Finden Sie die Schaltfläche <strong>„Bearbeiten“</strong> der Karte <strong>„Kundenverwaltung“</strong>.
        </p>

        <p>
            Beobachten Sie anschließend den Unterschied zwischen der eingeschränkten und der barrierefreien Variante.
        </p>
    `,

  explanation: `
        <p>
            In der eingeschränkten Variante wurde das Dashboard nicht für starke Vergrößerungen entwickelt. Die Karten behalten ihre feste Breite bei und ragen über den sichtbaren Bereich hinaus. Dadurch wird horizontales Scrollen notwendig und zusammengehörige Informationen können leicht aus dem Blick geraten.
        </p>

        <p>
            In der barrierefreien Variante passt sich das Layout automatisch an die verfügbare Breite an. Die Karten werden untereinander angeordnet, sodass alle Inhalte ohne horizontales Scrollen erreichbar bleiben.
        </p>

        <p>
            Die WCAG verlangen, dass Inhalte auch bei einer Vergrößerung von bis zu 400&nbsp;% ohne Informationsverlust und – mit wenigen Ausnahmen – ohne horizontales Scrollen nutzbar bleiben. Ein responsives Layout verbessert dabei nicht nur die Barrierefreiheit, sondern auch die Nutzung auf Smartphones und kleinen Bildschirmen.
        </p>
    `,

  render({ demo, enableContinue }) {
    demoContainer = demo;
    demo.innerHTML = `
    <div class="zoom-demo">

        <div class="dashboard">

            <div class="zoom-browser">

                <div class="browser-bar">
                    <span class="browser-zoom">🔍 400 %</span>
                </div>

                <div class="zoom-viewport">

                    <div class="zoom-content zoomed">

                        <h2>Dashboard</h2>

                        <div class="dashboard-grid">

                            ${cards
                              .map(
                                (card) => `
                                <div class="dashboard-card">

                                    <h3>${card.title}</h3>

                                    <p>${card.value}</p>

                                    <button
                                        class="edit-button"
                                        ${card.target ? 'id="targetButton"' : ""}
                                    >
                                        Bearbeiten
                                    </button>

                                </div>
                            `,
                              )
                              .join("")}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
    `;

    const targetButton = demo.querySelector("#targetButton");
    const buttons = demo.querySelectorAll(".edit-button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("selected");
          b.classList.remove("wrong");
        });

        if (button === targetButton) {
          button.classList.add("selected");

          enableContinue();
        } else {
          button.classList.add("wrong");
        }
      });
    });
  },

  setSimulationMode(isSimulation) {
    simulationMode = isSimulation;
    updateLayout();
  },

  setAccessibilityMode(isAccessible) {
    accessibilityMode = isAccessible;
    updateLayout();
  },
};
