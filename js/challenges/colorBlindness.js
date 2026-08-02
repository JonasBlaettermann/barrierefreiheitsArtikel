let demoContainer = null;
let simulationMode = true;
let accessibilityMode = false;

const colors = {
  simulation: {
    inaccessible: {
      successLight: "#9a9546",
      successDark: "#8b863f",
      failure: "#978a48",
    },
    accessible: {
      successLight: "#4a90e2",
      successDark: "#1565c0",
      failure: "#424242",
    },
  },
  normal: {
    inaccessible: {
      successLight: "#4caf50",
      successDark: "#27ae60",
      failure: "#e74c3c",
    },
    accessible: {
      successLight: "#4a90e2",
      successDark: "#1565c0",
      failure: "#424242",
    },
  },
};

function updateColors() {
  if (!demoContainer) return;

  const successButtons = demoContainer.querySelectorAll(".status-success");
  const failure = demoContainer.querySelector(".status-failure");

  if (successButtons.length < 2 || !failure) return;

  const mode = simulationMode ? colors.simulation : colors.normal;
  const palette = accessibilityMode ? mode.accessible : mode.inaccessible;

  successButtons[0].style.background = palette.successLight;
  successButtons[1].style.background = palette.successDark;

  successButtons.forEach((button) => {
    button.style.color = "#fff";
  });

  failure.style.background = palette.failure;
  failure.style.color = "#fff";
}

export default {
  title: "🌈 Rot-Grün-Sehschwäche",

  introduction: `
    <h3>Farben sind nicht für alle gleich</h3>
    <p>
        Rund 8 % der Männer und etwa 0,5 % der Frauen europäischer Abstammung haben eine Form der Rot-Grün-Sehschwäche. Für sie können bestimmte Rot- und Grüntöne nur schwer oder gar nicht voneinander unterschieden werden.
    </p>

    <p>
       <strong>Ihre Aufgabe:</strong><br>
      Zwei der drei Statusmeldungen gehören zusammen.
      Welche Statusmeldung unterscheidet sich von den anderen?
      Treffen Sie Ihre Entscheidung ausschließlich anhand der dargestellten Farben.
  </p>

    <p>
        Erst nach Abschluss der Aufgabe können Sie zwischen der simulierten und der normativen Darstellung sowie einer barrierefreien Variante wechseln.
    </p>
`,

  explanation: `
    <h3>Warum ist das problematisch?</h3>

    <p>
        In der eingeschränkten Variante unterscheiden sich die beiden Statusmeldungen ausschließlich durch ihre Farbe. Für Menschen mit einer Rot-Grün-Sehschwäche kann dieser Unterschied kaum oder gar nicht erkennbar sein. Dadurch wird unklar, welche Meldung einen Fehler und welche einen erfolgreichen Zustand beschreibt.
    </p>

    <p>
        In einer barrierefreien Oberfläche wird Bedeutung nicht ausschließlich über Farben vermittelt. Zusätzliche Hinweise wie Symbole, Texte oder unterschiedliche Formen stellen sicher, dass Informationen unabhängig vom Farbsehen verständlich bleiben.
    </p>

    <p>
        Dieses Prinzip ist Bestandteil der Web Content Accessibility Guidelines (WCAG). Informationen dürfen nicht ausschließlich durch Farben vermittelt werden.
    </p>

    <h4>Weiterführende Informationen</h4>

    <ul>
        <li><a href="https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html" target="_blank">WCAG 2.2 – Understanding Success Criterion 1.4.1: Use of Color</a></li>
        <li><a href="https://www.w3.org/WAI/WCAG22/quickref/#use-of-color" target="_blank">WCAG Quick Reference – 1.4.1 Use of Color</a></li>
    </ul>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;
    simulationMode = true;
    accessibilityMode = false;

    demo.innerHTML = `
    <div class="status-list">

          <button class="status status-success">
              <span class="status-text">Status A</span>
          </button>

          <button class="status status-success">
              <span class="status-text">Status B</span>
          </button>

          <button class="status status-failure">
              <span class="status-text">Status C</span>
          </button>

      </div>
    `;

    updateColors();

    const statusButtons = demo.querySelectorAll(".status");
    let hasSelected = false;

    statusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        statusButtons.forEach((b) => b.classList.remove("selected"));
        button.classList.add("selected");

        if (hasSelected) return;

        hasSelected = true;
        enableContinue();
      });
    });
  },

  setSimulationMode(isSimulation) {
    simulationMode = isSimulation;
    updateColors();
  },

  setAccessibilityMode(isAccessible) {
    accessibilityMode = isAccessible;
    updateColors();
  },
};
