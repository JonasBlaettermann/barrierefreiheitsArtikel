let voice = null;

function loadVoice() {
  const voices = speechSynthesis.getVoices();

  voice =
    voices.find((v) => v.lang.startsWith("de")) ??
    voices.find((v) => v.lang.startsWith("en")) ??
    null;
}

if ("speechSynthesis" in window) {
  loadVoice();
  speechSynthesis.onvoiceschanged = loadVoice;
}

export function speak(text) {
  if (!("speechSynthesis" in window) || !text) {
    return;
  }

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "de-DE";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  if (voice) {
    utterance.voice = voice;
  }

  setTimeout(() => {
    speechSynthesis.speak(utterance);
  }, 10);
}
