let demoContainer = null;

let simulationMode = true;
let accessibilityMode = false;

const cards = [
  { title: "👥 Kunden", value: "1.284 Kunden" },
  { title: "📄 Verträge", value: "842 Verträge" },
  { title: "👤 Benutzer", value: "18 Benutzer" },
  { title: "💰 Rechnungen", value: "312 offen" },
  { title: "📦 Produkte", value: "587 Produkte" },
  { title: "⚙️ Einstellungen", value: "24 Optionen" },
];

function updateLayout() {
  if (!demoContainer) return;

  const dashboard = demoContainer.querySelector(".dashboard");
  const viewport = demoContainer.querySelector(".zoom-viewport");
  const zoomContent = demoContainer.querySelector(".zoom-content");
  const zoomText = demoContainer.querySelector(".browser-zoom");

  zoomContent.classList.toggle("zoomed", simulationMode);

  zoomText.textContent = simulationMode ? "🔍 400 %" : "🔍 100 %";

  viewport.classList.toggle("no-scroll", !simulationMode);

  const isAccessibleLayout = simulationMode && accessibilityMode;

  dashboard.classList.toggle("accessible", isAccessibleLayout);
}

export default {
  title: "🔍 Webseiten bei 400 % Zoom nutzen",

  introduction: `
  <h3>Warum 400 % Zoom wichtig sind</h3>

  <p>
      Viele Menschen sind darauf angewiesen, Websiten deutlich zu vergrößern, 
      beispielsweise aufgrund einer Sehbehinderung oder eingeschränkten Sehkraft. Auch bei einer
      Vergrößerung von bis zu <strong>400&nbsp;%</strong> müssen Inhalte
      vollständig nutzbar bleiben, ohne dass ständig horizontal gescrollt
      werden muss.
  </p>

  <p>
      <strong>Ihre Aufgabe:</strong><br>
      Finden Sie die Schaltfläche
      <strong>„Bearbeiten“</strong> der Karte
      <strong>„Benutzer“</strong>.
  </p>

  <p>
      Erst nach Abschluss der Aufgabe können Sie zwischen der simulierten und
      der normativen Darstellung sowie einer barrierefreien Variante wechseln.
  </p>
  `,

  explanation: `
  <h3>Warum ist das problematisch?</h3>

  <p>
      In der eingeschränkten Variante besitzt das Dashboard eine feste Breite.
      Bei einer Vergrößerung auf 400&nbsp;% reichen die Inhalte dadurch über
      den sichtbaren Bereich hinaus. Um alle Inhalte zu erreichen,
      muss zusätzlich horizontal gescrollt werden.
  </p>

  <p>
      In der barrierefreien Variante passt sich das Layout automatisch an den
      verfügbaren Platz an. Die Karten werden untereinander angeordnet,
      sodass alle Inhalte auch bei starker Vergrößerung ohne horizontales
      Scrollen erreichbar bleiben.
  </p>

  <p>
    Ein responsives Layout verbessert nicht nur die Barrierefreiheit, sondern 
    sorgt auch auf Smartphones, Tablets und kleinen Bildschirmen für eine bessere 
    Nutzbarkeit.
  </p>

  <h4>Weiterführende Informationen</h4>

  <ul>
      <li>
          <a href="https://www.w3.org/WAI/WCAG22/Understanding/reflow.html" target="_blank">
              WCAG 2.2 – Understanding Success Criterion 1.4.10: Reflow
          </a>
      </li>

      <li>
          <a href="https://www.w3.org/WAI/WCAG22/quickref/#reflow" target="_blank">
              WCAG Quick Reference – 1.4.10 Reflow
          </a>
      </li>
  </ul>
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

    const buttons = demo.querySelectorAll(".edit-button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("selected"));

        button.classList.add("selected");

        enableContinue();
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
