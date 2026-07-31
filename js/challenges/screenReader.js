import { icons } from "../icons.js";

let demoContainer = null;

export default {
  title: "🔊 Mit einem Screenreader navigieren",

  introduction: `
    <p>
🎧      Hinweis: Aktivieren Sie für diese Challenge Ihren Ton. Die Aufgabe ist nur mit der Audioausgabe lösbar.    
    </p>

    <p>
        Nicht alle Menschen nutzen Webseiten mit den Augen. Blinde und viele sehbehinderte Menschen lassen sich Inhalte von einem sogenannten Screenreader vorlesen und bedienen Webseiten überwiegend mit der Tastatur.
    </p>

    <p>
        <strong>Ihre Aufgabe:</strong><br>
        Öffnen Sie den Warenkorb ausschließlich anhand der Audioausgabe.
    </p>

    <p>
        Der Demo-Bereich bleibt zunächst absichtlich schwarz. Navigieren Sie mit der <strong>Tab-Taste</strong> und achten Sie auf die Audioausgabe.
    </p>
    `,

  explanation: `
    <p>
        Ein Screenreader liest nicht das vor, was auf dem Bildschirm zu sehen ist, sondern die Informationen, die eine Webseite technisch bereitstellt. Fehlen aussagekräftige Beschriftungen oder werden Bedienelemente nicht korrekt ausgezeichnet, erhalten Nutzerinnen und Nutzer nur unvollständige Informationen.
    </p>

    <p>
        Für sehende Menschen ist oft sofort erkennbar, welche Funktion ein Button oder Eingabefeld hat. Menschen, die einen Screenreader verwenden, sind dagegen auf aussagekräftige Beschriftungen, Alternativtexte und eine korrekte HTML-Struktur angewiesen, um eine Webseite sicher bedienen zu können.
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

                <a class="nav-item" href="#" data-audio="link">
                    ${icons.home}
                </a>

                <button class="nav-item" aria-label="" data-audio="button">
                    ${icons.search}
                </button>

                <a class="nav-item" href="#" data-audio="link">
                    ${icons.favorite}
                </a>

                <button class="nav-item" aria-label="" data-audio="button">
                    ${icons.cart}
                    <span class="cart-badge">3</span>
                </button>

                <button class="nav-item" data-audio="button">
                    ${icons.person}
                </button>

            </nav>

        </header>

        <div class="screen-overlay"></div>

    </div>
    `;

    const navItems = demo.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      item.addEventListener("focus", () => {
        // später:
        // playAudio(item.dataset.audio);
      });
    });
  },

  setSimulationMode(isSimulation) {
    if (!demoContainer) return;

    demoContainer.querySelectorAll("label").forEach((element) => {
      element.classList.toggle("hidden", isSimulation);
    });
  },
};
