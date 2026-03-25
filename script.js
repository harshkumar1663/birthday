// ============================================
// SCENE DATA (UPDATED LETTER)
// ============================================

const scenes = [
  {
    text: ["Dear Divya", "", "You know what’s funny?"]
  },
  {
    text: ["Last year, on your birthday,", "", "you asked me —", "“free ho? kahi chaloge?”"]
  },
  {
    text: ["…and I said no.", "", "I was too shy,", "too awkward,", "too… me."]
  },
  {
    text: ["If I could go back now,", "", "I wouldn’t just say yes…", "I’d show up early."]
  },
  {
    text: ["Because I didn’t know then", "", "what I know now —"]
  },
  {
    text: ["that saying yes to you", "", "would become the easiest thing in my life."]
  },
  {
    text: ["Somewhere between then and now,", "", "you became… home."]
  },
  {
    text: ["Not loudly,", "not dramatically,", "", "just quietly…", "in all the right places."]
  },
  {
    text: ["And I wouldn’t change a single version of you.", "", "Not the overthinking one,", "not the chaotic one,", "not even the stubborn one."]
  },
  {
    text: ["Every version of you just… fits."]
  },
  {
    text: ["I’m still the same guy", "", "who gets things wrong sometimes…"]
  },
  {
    text: ["but one thing is clear now —"]
  },
  {
    text: ["I’ll keep choosing you.", "", "In the normal days,", "the random days,", "the nothing-special days."]
  },
  {
    text: ["So yeah…", "", "if you ask me again —"]
  },
  {
    text: ["“free ho? kahi chaloge?”"]
  },
  {
    text: ["The answer is yes.", "", "Always."]
  }
];

// ============================================
// STATE
// ============================================

const state = {
  currentScene: 0,
  isTyping: false,
  isTransitioning: false,
  typingSpeed: 32,
  lineDelay: 400,
  pauseDelay: 900,
  sceneHold: 1200
};

// ============================================
// DOM
// ============================================

const container = document.querySelector('.container');
const sceneContent = document.getElementById('sceneContent');
const continueHint = document.getElementById('continueHint');

// ============================================
// UTILS
// ============================================

const wait = (ms) => new Promise(r => setTimeout(r, ms));

// ============================================
// TYPE EFFECT
// ============================================

async function typeText(element, text) {
  state.isTyping = true;
  element.textContent = "";

  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await wait(state.typingSpeed);
  }

  state.isTyping = false;
}

// ============================================
// SCENE RENDER
// ============================================

async function renderScene(sceneData) {
  sceneContent.innerHTML = "";

  const lines = [];

  sceneData.text.forEach((lineText) => {
    const el = document.createElement("span");
    el.className = "scene-line";
    sceneContent.appendChild(el);
    lines.push({ el, text: lineText });
  });

  sceneContent.style.opacity = 0;
  await wait(400);
  sceneContent.style.opacity = 1;

  for (let i = 0; i < lines.length; i++) {
    const { el, text } = lines[i];

    if (text === "") {
      await wait(state.pauseDelay);
      continue;
    }

    el.classList.add("visible");

    await typeText(el, text);

    await wait(state.lineDelay);
  }

  await wait(state.sceneHold);

  continueHint.classList.remove("hidden");
  continueHint.classList.add("visible");
}

// ============================================
// FINAL SCENE
// ============================================

async function renderFinalScene() {
  sceneContent.innerHTML = "";

  const main = document.createElement("div");
  main.className = "final-message";
  main.style.opacity = 0;
  sceneContent.appendChild(main);

  await wait(500);
  main.style.opacity = 1;

  await typeText(main, "come here ❤️");

  await wait(1000);

  const sub = document.createElement("div");
  sub.className = "final-subtitle";
  sub.style.opacity = 0;
  sceneContent.appendChild(sub);

  await wait(300);
  sub.style.opacity = 1;

  await typeText(sub, "happy birthday :)");
}

// ============================================
// TRANSITIONS
// ============================================

async function transitionToScene(nextSceneId) {
  if (state.isTransitioning || state.isTyping) return;

  state.isTransitioning = true;

  continueHint.classList.add("hidden");

  sceneContent.style.opacity = 0;
  await wait(500);

  document.body.className = "";
  if (nextSceneId < scenes.length) {
    document.body.classList.add(`scene-${nextSceneId}`);
  } else {
    document.body.classList.add("scene-end");
  }

  if (nextSceneId < scenes.length) {
    await renderScene(scenes[nextSceneId]);
  } else {
    await renderFinalScene();
  }

  state.isTransitioning = false;
}

// ============================================
// INTERACTION
// ============================================

function handleClick() {
  if (state.isTyping || state.isTransitioning) return;
  if (state.currentScene >= scenes.length) return;

  state.currentScene++;
  transitionToScene(state.currentScene);
}

// ============================================
// INIT
// ============================================

function init() {
  container.addEventListener("click", handleClick);

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      handleClick();
    }
  });

  document.body.classList.add("scene-0");
  renderScene(scenes[0]);
}

init();