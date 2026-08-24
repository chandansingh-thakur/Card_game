let audioContext = null;

const cardSounds = [
  "/sounds/card-deal-1.mp3",
  "/sounds/card-deal-2.mp3",
  "/sounds/card-deal-3.mp3",
  "/sounds/card-deal-4.mp3",
];

const cardAudioPool = cardSounds.map((src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = 0.72;
  return audio;
});

let cardSoundIndex = 0;

let shuffleAudio = null;


/* =========================
   AUDIO CONTEXT
========================= */

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
};


export const unlockAudio = () => {

  try {
    getAudioContext();

    cardAudioPool.forEach((audio) => {
      audio.load();
    });

  } catch (error) {
    console.log("Audio unlock failed");
  }

};


/* =========================
   FEMALE AI VOICE
========================= */

const findFemaleVoice = () => {

  if (!("speechSynthesis" in window)) {
    return null;
  }

  const voices =
    window.speechSynthesis.getVoices();

  const preferredNames = [
    "zira",
    "samantha",
    "aria",
    "jenny",
    "hazel",
    "sara",
    "female",
    "woman",
  ];

  const femaleVoice =
    voices.find((voice) => {

      const name =
        `${voice.name} ${voice.voiceURI}`
          .toLowerCase();

      return preferredNames.some(
        (word) =>
          name.includes(word)
      );

    });

  if (femaleVoice) {
    return femaleVoice;
  }

  return (
    voices.find((voice) =>
      voice.lang
        ?.toLowerCase()
        .startsWith("en")
    ) ||
    voices[0] ||
    null
  );

};


/* =========================
   SPEAK
========================= */

export const speak = (
  text,
  options = {}
) => {

  return new Promise((resolve) => {

    if (!("speechSynthesis" in window)) {
      resolve();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    const voice =
      findFemaleVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-US";
    }

    utterance.rate =
      options.rate ?? 0.86;

    utterance.pitch =
      options.pitch ?? 1.12;

    utterance.volume = 1;

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = () => {
      resolve();
    };

    window.speechSynthesis.speak(
      utterance
    );

  });

};


/* =========================
   BUTTON SOUND
========================= */

export const playClickSound = () => {

  try {

    const ctx =
      getAudioContext();

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
      650,
      ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      900,
      ctx.currentTime + 0.06
    );

    gain.gain.setValueAtTime(
      0.07,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.08
    );

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();

    oscillator.stop(
      ctx.currentTime + 0.08
    );

  } catch (error) {}

};


/* =========================
   REAL CARD THROW SOUND
========================= */

export const playCardSound = () => {

  try {

    const audio =
      cardAudioPool[
        cardSoundIndex
      ];

    cardSoundIndex =
      (cardSoundIndex + 1) %
      cardAudioPool.length;

    /*
      Restart the short card sound
      from the beginning.
    */

    audio.pause();

    audio.currentTime = 0;

    audio.volume = 0.72;

    const promise =
      audio.play();

    if (promise) {
      promise.catch(() => {});
    }

  } catch (error) {
    console.log(
      "Card sound error:",
      error
    );
  }

};


/* =========================
   SHUFFLE SOUND
========================= */

export const playShuffleSound = () => {

  stopShuffleSound();

  try {

    /*
      Shuffle is intentionally
      separate from card-throw sound.
    */

    const ctx =
      getAudioContext();

    const duration = 2.8;

    const buffer =
      ctx.createBuffer(
        1,
        ctx.sampleRate *
          duration,
        ctx.sampleRate
      );

    const data =
      buffer.getChannelData(0);

    for (
      let i = 0;
      i < data.length;
      i++
    ) {

      const fade =
        1 -
        i /
          data.length;

      data[i] =
        (Math.random() * 2 - 1) *
        fade;

    }

    shuffleAudio =
      ctx.createBufferSource();

    const gain =
      ctx.createGain();

    shuffleAudio.buffer =
      buffer;

    gain.gain.value =
      0.035;

    shuffleAudio.connect(gain);

    gain.connect(
      ctx.destination
    );

    shuffleAudio.start();

  } catch (error) {}

};


/* =========================
   STOP SHUFFLE
========================= */

export const stopShuffleSound = () => {

  try {

    if (shuffleAudio) {

      shuffleAudio.stop();

      shuffleAudio.disconnect();

      shuffleAudio = null;

    }

  } catch (error) {

    shuffleAudio = null;

  }

};


/* =========================
   WIN
========================= */

export const playWinSound = () => {

  try {

    const ctx =
      getAudioContext();

    [523, 659, 784, 1046]
      .forEach(
        (frequency, index) => {

          const oscillator =
            ctx.createOscillator();

          const gain =
            ctx.createGain();

          const start =
            ctx.currentTime +
            index * 0.11;

          oscillator.type =
            "sine";

          oscillator.frequency.value =
            frequency;

          gain.gain.setValueAtTime(
            0.001,
            start
          );

          gain.gain.exponentialRampToValueAtTime(
            0.1,
            start + 0.02
          );

          gain.gain.exponentialRampToValueAtTime(
            0.001,
            start + 0.25
          );

          oscillator.connect(gain);

          gain.connect(
            ctx.destination
          );

          oscillator.start(start);

          oscillator.stop(
            start + 0.27
          );

        }
      );

  } catch (error) {}

};


/* =========================
   LOSE
========================= */

export const playLoseSound = () => {

  try {

    const ctx =
      getAudioContext();

    const oscillator =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    oscillator.type =
      "sawtooth";

    oscillator.frequency.setValueAtTime(
      230,
      ctx.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      100,
      ctx.currentTime + 0.45
    );

    gain.gain.setValueAtTime(
      0.08,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.5
    );

    oscillator.connect(gain);

    gain.connect(
      ctx.destination
    );

    oscillator.start();

    oscillator.stop(
      ctx.currentTime + 0.5
    );

  } catch (error) {}

};


/* =========================
   STOP EVERYTHING
========================= */

export const stopAllSounds = () => {

  try {

    if (
      "speechSynthesis" in
      window
    ) {
      window.speechSynthesis.cancel();
    }

    stopShuffleSound();

    cardAudioPool.forEach(
      (audio) => {
        audio.pause();
        audio.currentTime = 0;
      }
    );

  } catch (error) {}

};