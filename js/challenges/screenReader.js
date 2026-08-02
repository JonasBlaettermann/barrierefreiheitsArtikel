import { icons } from "../icons.js";
import { speak } from "../reader.js";

let demoContainer = null;

const speechTexts = {
  inaccessible: ["Link", "Button", "Link", "Button", "Button"],

  accessible: [
    "Link, Startseite",
    "Button, Suche",
    "Link, Favoriten",
    "Button, Warenkorb, 3 Artikel",
    "Button, Profil",
  ],
};

function updateSpeechTexts(isAccessible) {
  if (!demoContainer) return;

  const texts = isAccessible
    ? speechTexts.accessible
    : speechTexts.inaccessible;

  const items = demoContainer.querySelectorAll(".nav-item");

  items.forEach((item, index) => {
    item.dataset.speech = texts[index];
  });
}

export default {
  title: "🔊 Mit einem Screenreader navigieren",

  introduction: `
    <p>
        🎧 <strong>Hinweis:</strong> Aktivieren Sie für diese Challenge Ihren Ton. Die Aufgabe ist nur mit Audioausgabe vollständig erlebbar.
    </p>

    <p>
        <strong>Hinweis zur Demo:</strong> Diese Challenge verwendet eine vereinfachte Simulation eines Screenreaders. Sie soll typische Funktionen und Herausforderungen veranschaulichen, ersetzt jedoch keinen echten Screenreader.
    </p>

    <p>
        Viele blinde und sehbehinderte Menschen bedienen Webseiten mit einem Screenreader. Dieser liest die Inhalte einer Webseite vor und ermöglicht die Navigation hauptsächlich über die Tastatur.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Versuchen Sie, den Warenkorb ausschließlich anhand der Audioausgabe zu finden.
    </p>

    <p>
        Der Demo-Bereich bleibt zunächst absichtlich schwarz. Navigieren Sie mit der <strong>Tab-Taste</strong> durch die Navigation. Wenn Sie glauben, den Warenkorb gefunden zu haben, können Sie das Element optional mit <strong>Enter</strong> oder der <strong>Leertaste</strong> aktivieren.
    </p>
    `,

  explanation: `
    <p>
        In der Simulation wurden die Navigationselemente absichtlich nicht aussagekräftig beschriftet. Der Screenreader konnte deshalb lediglich allgemeine Informationen wie „Link“ oder „Button“ vorlesen. Ohne weitere Hinweise war nicht erkennbar, welche Funktion sich hinter den einzelnen Elementen verbarg.
    </p>

    <p>
        Nach dem Umschalten auf die barrierefreie Variante wurden dieselben Elemente mit aussagekräftigen Bezeichnungen versehen, beispielsweise „Button, Warenkorb, 3&nbsp;Artikel“. Die Oberfläche hat sich dabei optisch kaum verändert – für Nutzerinnen und Nutzer eines Screenreaders jedoch erheblich.
    </p>

    <p>
        Barrierefreiheit bedeutet nicht nur, dass Inhalte technisch erreichbar sind. Informationen müssen auch verständlich und eindeutig bereitgestellt werden. Aussagekräftige Beschriftungen, Alternativtexte und eine korrekte HTML-Struktur ermöglichen es Screenreadern, Bedienelemente zuverlässig zu erkennen und sinnvoll vorzulesen.
    </p>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;

    demo.innerHTML = `
    <div class="screenreader-demo">

        <header class="header">

            <div class="logo">
                ShopLogo
            </div>

            <nav class="navigation" aria-label="Hauptnavigation">

                <a class="nav-item" href="#">
                    ${icons.home}
                </a>

                <button class="nav-item" aria-label="">
                    ${icons.search}
                </button>

                <a class="nav-item" href="#">
                    ${icons.favorite}
                </a>

                <button class="nav-item" aria-label="" id="cartButton">
                    ${icons.cart}
                    <span class="cart-badge">3</span>
                </button>

                <button class="nav-item" aria-label="">
                    ${icons.person}
                </button>

            </nav>

            

        </header>
       
        <div class="screen-overlay"></div>

    </div>

     <div class="screenreader-status hidden">

        <p>
           Ende der Navigation erreicht.
        </p>

        <p class="screenreader-hint">
            Sie können die Navigation erneut ausprobieren oder mit der Erklärung fortfahren.
        </p>

        <button id="restartNavigation">
            🔄 Von vorne beginnen
        </button>

    </div>
    `;

    updateSpeechTexts(false);

    const navItems = demo.querySelectorAll(".nav-item");
    const status = demo.querySelector(".screenreader-status");
    const restartButton = demo.querySelector("#restartNavigation");
    const lastItem = navItems[navItems.length - 1];

    navItems.forEach((item) => {
      item.addEventListener("focus", () => {
        speak(item.dataset.speech);
      });
    });

    navItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
      });
    });

    lastItem.addEventListener("keydown", (event) => {
      if (event.key !== "Tab" || event.shiftKey) {
        return;
      }

      status.classList.remove("hidden");

      speak(
        "Ende der Navigation erreicht. Sie können die Navigation erneut ausprobieren oder mit der Erklärung fortfahren.",
      );

      enableContinue();

      setTimeout(() => {
        restartButton.focus();
      }, 0);
    });

    restartButton.addEventListener("click", () => {
      speechSynthesis.cancel();

      status.classList.add("hidden");

      navItems.forEach((i) => i.classList.remove("selected"));

      navItems[0].focus();
    });

    navItems.forEach((item) => {
      item.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }

        event.preventDefault();

        navItems.forEach((i) => i.classList.remove("selected"));

        item.classList.add("selected");

        speak(`${item.dataset.speech}, aktiviert`);
      });
    });
  },

  setAccessibilityMode(isAccessible) {
    updateSpeechTexts(isAccessible);
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    demoContainer
      .querySelector(".screen-overlay")
      .classList.toggle("hidden", !isSimulation);
  },

  onLoaded() {
    document.getElementById("title").focus();
  },
};
