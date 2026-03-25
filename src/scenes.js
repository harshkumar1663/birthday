export const SCENES = [
  {
    id: 'opening',
    text: ['Dear Divya,', '', 'You know what is funny?'],
    camera: {
      zoom: 1,
      pan: [0, 0.1],
      duration: 3.8,
      position: [0, 0.4, 24],
      lookAt: [0, 0, 0],
      drift: 0.45
    },
    lighting: 'memory',
    sound: 'memory',
    textTiming: { baseDelay: 0.35, stagger: 0.9, emotionalMultiplier: 1.15 }
  },
  {
    id: 'question-memory',
    text: ['Last year, on your birthday,', '', 'you asked me,', '"kya tum still chal rahe ho?"'],
    camera: {
      zoom: 1.04,
      pan: [-0.2, 0.25],
      duration: 3.9,
      position: [-2.2, 1.1, 22],
      lookAt: [0, 0, 0],
      drift: 0.4
    },
    lighting: 'warm',
    sound: 'warm',
    textTiming: { baseDelay: 0.4, stagger: 0.96, emotionalMultiplier: 1.15 }
  },
  {
    id: 'regret',
    text: ['...and I said no.', '', 'I was too shy,', 'too awkward,', 'too... me.'],
    camera: {
      zoom: 1.05,
      pan: [0.25, -0.05],
      duration: 4,
      position: [2, -0.8, 20],
      lookAt: [0, 0, 0],
      drift: 0.35
    },
    lighting: 'dim',
    sound: 'dim',
    textTiming: { baseDelay: 0.45, stagger: 1.02, emotionalMultiplier: 1.2 }
  },
  {
    id: 'rewind',
    text: ['If I could go back now,', '', 'I would not just say yes...', 'I would show up early.', "", "Probably 10min early."],
    camera: {
      zoom: 1.08,
      pan: [-0.3, 0.1],
      duration: 4,
      position: [-2.6, 0.4, 19],
      lookAt: [0, 0, 0],
      drift: 0.5
    },
    lighting: 'memory',
    sound: 'memory',
    textTiming: { baseDelay: 0.45, stagger: 1.05, emotionalMultiplier: 1.25 }
  },
  {
    id: 'realization-1',
    text: ['Because I did not know then,', '', 'what I know now.'],
    camera: {
      zoom: 1.1,
      pan: [0.1, 0.2],
      duration: 3.8,
      position: [1.2, 1.2, 18],
      lookAt: [0, 0, 0],
      drift: 0.42
    },
    lighting: 'dim',
    sound: 'dim',
    textTiming: { baseDelay: 0.45, stagger: 1.08, emotionalMultiplier: 1.2 }
  },
  {
    id: 'realization-2',
    text: ['that saying yes to you', '', 'became the easiest thing in my life.'],
    camera: {
      zoom: 1.12,
      pan: [-0.15, -0.1],
      duration: 3.9,
      position: [-1.4, -0.3, 17],
      lookAt: [0, 0, 0],
      drift: 0.42
    },
    lighting: 'warm',
    sound: 'warm',
    textTiming: { baseDelay: 0.5, stagger: 1.12, emotionalMultiplier: 1.28 }
  },
  {
    id: 'home',
    text: ['Somewhere between then and now,', '', 'you became... home.'],
    camera: {
      zoom: 1.16,
      pan: [0.2, 0.14],
      duration: 4.2,
      position: [1.8, 0.8, 15.8],
      lookAt: [0, 0, 0],
      drift: 0.34
    },
    lighting: 'warm',
    sound: 'warm',
    textTiming: { baseDelay: 0.54, stagger: 1.18, emotionalMultiplier: 1.32 }
  },
  {
    id: 'quiet-fit',
    text: ['Not loudly,', 'not dramatically,', '', 'just quietly...', 'in all the right places.'],
    camera: {
      zoom: 1.16,
      pan: [-0.25, 0.08],
      duration: 4.2,
      position: [-1.9, 0.4, 15.3],
      lookAt: [0, 0, 0],
      drift: 0.3
    },
    lighting: 'memory',
    sound: 'memory',
    textTiming: { baseDelay: 0.55, stagger: 1.16, emotionalMultiplier: 1.3 }
  },
  {
    id: 'every-version',
    text: ['And I would not change a single version of you.', '', 'Not the overthinking one,', 'not the chaotic one,', 'not even the stubborn one.'],
    camera: {
      zoom: 1.2,
      pan: [0.25, -0.2],
      duration: 4.3,
      position: [2.2, -1.1, 14.3],
      lookAt: [0, 0, 0],
      drift: 0.28
    },
    lighting: 'dim',
    sound: 'dim',
    textTiming: { baseDelay: 0.56, stagger: 1.2, emotionalMultiplier: 1.33 }
  },
  {
    id: 'fits',
    text: ['Every version of you just... fits.'],
    camera: {
      zoom: 1.22,
      pan: [0, 0.18],
      duration: 4,
      position: [0, 1.1, 13.6],
      lookAt: [0, 0, 0],
      drift: 0.25
    },
    lighting: 'memory',
    sound: 'memory',
    textTiming: { baseDelay: 0.58, stagger: 1.25, emotionalMultiplier: 1.4 }
  },
  {
    id: 'flawed',
    text: ['I am still the same guy', '', 'who gets things wrong sometimes...'],
    camera: {
      zoom: 1.22,
      pan: [-0.1, -0.2],
      duration: 3.7,
      position: [-1, -1.1, 13.8],
      lookAt: [0, 0, 0],
      drift: 0.2
    },
    lighting: 'dim',
    sound: 'dim',
    textTiming: { baseDelay: 0.56, stagger: 1.2, emotionalMultiplier: 1.25 }
  },
  {
    id: 'clarity',
    text: ['but one thing is clear now,'],
    camera: {
      zoom: 1.26,
      pan: [0.18, 0],
      duration: 4.1,
      position: [1.2, 0, 12.6],
      lookAt: [0, 0, 0],
      drift: 0.2
    },
    lighting: 'bright',
    sound: 'bright',
    textTiming: { baseDelay: 0.62, stagger: 1.28, emotionalMultiplier: 1.45 }
  },
  {
    id: 'choosing',
    text: ['I will keep choosing you.', '', 'In the normal days,', 'the random days,', 'the nothing-special days.'],
    camera: {
      zoom: 1.3,
      pan: [0.14, 0.2],
      duration: 4.4,
      position: [1, 1.2, 11.6],
      lookAt: [0, 0, 0],
      drift: 0.18
    },
    lighting: 'warm',
    sound: 'warm',
    textTiming: { baseDelay: 0.66, stagger: 1.34, emotionalMultiplier: 1.5 }
  },
  {
    id: 'ask-again',
    text: ['So yeah...', '', 'if you ask me again,'],
    camera: {
      zoom: 1.34,
      pan: [-0.2, 0.18],
      duration: 4.5,
      position: [-1.6, 1, 10.8],
      lookAt: [0, 0, 0],
      drift: 0.16
    },
    lighting: 'memory',
    sound: 'memory',
    textTiming: { baseDelay: 0.7, stagger: 1.4, emotionalMultiplier: 1.54 }
  },
  {
    id: 'question-repeat',
    text: ['"kya tum still chal rahe ho?"'],
    camera: {
      zoom: 1.4,
      pan: [0, 0.06],
      duration: 5,
      position: [0, 0.5, 10],
      lookAt: [0, 0, 0],
      drift: 0.12
    },
    lighting: 'warm',
    sound: 'bright',
    textTiming: { baseDelay: 0.76, stagger: 1.5, emotionalMultiplier: 1.65 }
  },
  {
    id: 'resolution',
    text: ['The answer is yes.', '', 'Always'],
    camera: {
      zoom: 1.5,
      pan: [0, -0.05],
      duration: 6,
      position: [0, 0.1, 8.8],
      lookAt: [0, 0, 0],
      drift: 0.08
    },
    lighting: 'bright',
    sound: 'finale',
    emotionalPeak: true,
    textTiming: { baseDelay: 0.9, stagger: 1.7, emotionalMultiplier: 1.95 }
  },
  {
    id: 'birthday-finale',
    text: ['AB IDHAR AAO ❤️', '', 'HAPPY BIRTHDAY TO YOU'],
    camera: {
      zoom: 1.58,
      pan: [0, -0.02],
      duration: 6.8,
      position: [0, 0.02, 7.6],
      lookAt: [0, 0, 0],
      drift: 0.04
    },
    lighting: 'bright',
    sound: 'finale',
    emotionalPeak: true,
    textTiming: { baseDelay: 1.1, stagger: 2, emotionalMultiplier: 2.2 }
  }
]
