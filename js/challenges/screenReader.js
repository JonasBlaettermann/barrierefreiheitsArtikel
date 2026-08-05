import { icons } from "../icons.js";
import { speak } from "../reader.js";

let demoContainer = null;

const speechTexts = {
  inaccessible: [
    "Link",
    "Schaltfläche",
    "Link",
    "Schaltfläche",
    "Schaltfläche",
  ],

  accessible: [
    "Link, Startseite",
    "Schaltfläche, Suche",
    "Link, Favoriten",
    "Schaltfläche, Warenkorb, 3 Artikel",
    "Schaltfläche, Profil",
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
  enableSpeech: true,

  title: "🔊 Screenreader",

  introduction: `
    <h3>Warum Screenreader auf gute Beschriftungen angewiesen sind</h3>

    <p>
        Blinde und viele sehbehinderte Menschen bedienen Webseiten mit einem
        Screenreader. Dieser liest Inhalte und Bedienelemente vor und ermöglicht
        die Navigation hauptsächlich über die Tastatur.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Finden Sie den <strong>Warenkorb</strong> ausschließlich mithilfe der
        Audioausgabe. Verwenden Sie dazu die <strong>Tabulatortaste</strong>, um
        durch die Navigation zu wechseln. Wenn Sie glauben, den Warenkorb gefunden
        zu haben, können Sie ihn zusätzlich mit <strong>Enter</strong> oder der
        <strong>Leertaste</strong> aktivieren.
    </p>

    <p>
        Der Demo-Bereich bleibt zunächst bewusst schwarz. Orientieren Sie sich
        ausschließlich an den vorgelesenen Informationen. Erst nach Abschluss der
        Aufgabe können Sie zwischen der simulierten und der normativen Darstellung
        sowie einer barrierefreien Variante wechseln.
    </p>

    <p>
        <strong>Hinweis:</strong> Die Simulation verwendet die im Browser integrierte Sprachausgabe (Web Speech API). Je nach Browser kann sich die Verfügbarkeit oder Qualität der Stimmen unterscheiden. Für das beste Erlebnis empfehlen wir die aktuelle Version von Google Chrome oder Microsoft Edge.</p>
    `,

  explanation: `
    <h3>Warum ist das problematisch?</h3>

    <p>
        In der nicht barrierefreien Variante besitzen die Navigationselemente
        keine aussagekräftigen Beschriftungen. Der Screenreader kann deshalb
        lediglich allgemeine Informationen wie „Link“ oder "Schaltfläche" vorlesen.
        Welche Funktion sich dahinter verbirgt, bleibt unklar.
    </p>

    <p>
        In der barrierefreien Variante wurden dieselben Elemente mit
        aussagekräftigen Bezeichnungen versehen, beispielsweise
        „Schaltfläche, Warenkorb, 3 Artikel“. Die Oberfläche sieht dabei nahezu
        identisch aus, für Screenreader-Nutzerinnen und -Nutzer verbessert sich
        die Bedienbarkeit jedoch erheblich.
    </p>

    <p>
        Aussagekräftige Beschriftungen, Alternativtexte und semantisch korrektes 
        HTML ermöglichen es Screenreadern, Inhalte zuverlässig zu erfassen und 
        verständlich vorzulesen. Dadurch werden digitale Angebote
        auch für blinde und sehbehinderte Menschen nutzbar.
    </p>

    <h4>Weiterführende Informationen</h4>

    <ul>
        <li>
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html" target="_blank">
                WCAG 2.2 – Understanding Success Criterion 4.1.2: Name, Role, Value
            </a>
        </li>

        <li>
            <a href="https://www.w3.org/WAI/WCAG22/quickref/#name-role-value" target="_blank">
                WCAG Quick Reference – 4.1.2 Name, Role, Value
            </a>
        </li>
    </ul>
  `,

  render({ demo, enableContinue }) {
    demoContainer = demo;

    demo.innerHTML = `
    <div class="screenreader-content">
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
        if (
          event.key !== "Enter" &&
          event.key !== " " &&
          event.key !== "Spacebar"
        ) {
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
    demoContainer.querySelector(".nav-item")?.focus();
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    demoContainer
      .querySelector(".screen-overlay")
      .classList.toggle("hidden", !isSimulation);

    demoContainer.querySelector(".nav-item")?.focus();
  },

  onLoaded() {
    speechSynthesis.cancel();

    setTimeout(() => {
      document.getElementById("title").focus();
    }, 0);
  },
};
