let audioContext = null;

let currentSpeech = null;


/* =========================
   AUDIO CONTEXT
========================= */

function getAudioContext() {
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
}


/* =========================
   UNLOCK AUDIO
========================= */

export function unlockAudio() {
  try {
    getAudioContext();
  } catch (error) {
    console.log("Audio unavailable");
  }
}


/* =========================
   STOP ALL SPEECH
========================= */

export function stopAllSounds() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  currentSpeech = null;
}


/* =========================
   FEMALE AI VOICE
========================= */

export function speak(text) {

  if (!("speechSynthesis" in window)) {
    return Promise.resolve();
  }

  window.speechSynthesis.cancel();

  return new Promise((resolve) => {

    const utterance =
      new SpeechSynthesisUtterance(text);

    currentSpeech = utterance;

    utterance.rate = 0.88;
    utterance.pitch = 1.18;
    utterance.volume = 1;


    const chooseVoice = () => {

      const voices =
        window.speechSynthesis.getVoices();

      const femaleVoice =
        voices.find((voice) =>
          /Zira|Jenny|Samantha|Karen|Victoria|Female/i.test(
            voice.name
          )
        );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
    };


    chooseVoice();


    if (
      "onvoiceschanged" in
      window.speechSynthesis
    ) {
      window.speechSynthesis.onvoiceschanged =
        chooseVoice;
    }


    utterance.onend = () => {

      window.speechSynthesis.onvoiceschanged =
        null;

      currentSpeech = null;

      resolve();
    };


    utterance.onerror = () => {

      window.speechSynthesis.onvoiceschanged =
        null;

      currentSpeech = null;

      resolve();
    };


    window.speechSynthesis.speak(
      utterance
    );

  });
}


/* =========================
   CARD SOUND
========================= */

export function playCardSound() {

  const ctx = getAudioContext();

  const duration = 0.16;

  const buffer =
    ctx.createBuffer(
      1,
      ctx.sampleRate * duration,
      ctx.sampleRate
    );

  const data =
    buffer.getChannelData(0);


  for (
    let i = 0;
    i < data.length;
    i++
  ) {

    data[i] =
      (Math.random() * 2 - 1) *
      Math.pow(
        1 - i / data.length,
        2
      );

  }


  const source =
    ctx.createBufferSource();

  const filter =
    ctx.createBiquadFilter();

  const gain =
    ctx.createGain();


  filter.type = "bandpass";
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;


  gain.gain.setValueAtTime(
    0.16,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + duration
  );


  source.buffer = buffer;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);


  source.start();
}


/* =========================
   SHUFFLE SOUND
========================= */

export function playShuffleSound() {

  const ctx = getAudioContext();

  const now = ctx.currentTime;


  for (let i = 0; i < 14; i++) {

    const osc =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    const start =
      now + i * 0.075;


    osc.type = "triangle";

    osc.frequency.setValueAtTime(
      150 + Math.random() * 180,
      start
    );


    gain.gain.setValueAtTime(
      0,
      start
    );

    gain.gain.linearRampToValueAtTime(
      0.045,
      start + 0.018
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      start + 0.085
    );


    osc.connect(gain);
    gain.connect(ctx.destination);


    osc.start(start);

    osc.stop(start + 0.09);
  }
}


/* =========================
   CLICK SOUND
========================= */

export function playClickSound() {

  const ctx = getAudioContext();

  const osc =
    ctx.createOscillator();

  const gain =
    ctx.createGain();


  osc.type = "sine";

  osc.frequency.setValueAtTime(
    520,
    ctx.currentTime
  );

  osc.frequency.exponentialRampToValueAtTime(
    700,
    ctx.currentTime + 0.07
  );


  gain.gain.setValueAtTime(
    0.07,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.08
  );


  osc.connect(gain);
  gain.connect(ctx.destination);


  osc.start();

  osc.stop(
    ctx.currentTime + 0.08
  );
}


/* =========================
   WIN SOUND
========================= */

export function playWinSound() {

  const ctx = getAudioContext();

  const notes = [
    523.25,
    659.25,
    783.99,
    1046.5,
  ];


  notes.forEach(
    (frequency, index) => {

      const osc =
        ctx.createOscillator();

      const gain =
        ctx.createGain();

      const start =
        ctx.currentTime +
        index * 0.12;


      osc.type = "sine";

      osc.frequency.value =
        frequency;


      gain.gain.setValueAtTime(
        0,
        start
      );

      gain.gain.linearRampToValueAtTime(
        0.12,
        start + 0.03
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        start + 0.35
      );


      osc.connect(gain);
      gain.connect(ctx.destination);


      osc.start(start);

      osc.stop(start + 0.36);

    }
  );
}


/* =========================
   LOSE SOUND
========================= */

export function playLoseSound() {

  const ctx = getAudioContext();

  const osc =
    ctx.createOscillator();

  const gain =
    ctx.createGain();


  osc.type = "sawtooth";


  osc.frequency.setValueAtTime(
    180,
    ctx.currentTime
  );

  osc.frequency.exponentialRampToValueAtTime(
    75,
    ctx.currentTime + 0.55
  );


  gain.gain.setValueAtTime(
    0.07,
    ctx.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.55
  );


  osc.connect(gain);
  gain.connect(ctx.destination);


  osc.start();

  osc.stop(
    ctx.currentTime + 0.56
  );
}