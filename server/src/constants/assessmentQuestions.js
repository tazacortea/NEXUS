export const assessmentQuestions = [
  {
    id: "water",
    category: "Hydration",
    prompt: "On a typical day, how much water do you drink?",
    helper: "Choose the closest answer. One cup is approximately 250 ml.",
    choices: [
      { value: 0, label: "Less than 2 cups" },
      { value: 1, label: "2–4 cups" },
      { value: 2, label: "5–7 cups" },
      { value: 3, label: "8 or more cups" }
    ]
  },
  {
    id: "sleep",
    category: "Recovery",
    prompt: "How many hours of sleep do you usually get?",
    helper: "Use your usual routine, not an exceptional night.",
    choices: [
      { value: 0, label: "Less than 5 hours" },
      { value: 1, label: "5–6 hours" },
      { value: 2, label: "6–7 hours" },
      { value: 3, label: "7–9 hours" }
    ]
  },
  {
    id: "movement",
    category: "Activity",
    prompt: "How often do you intentionally move your body?",
    helper: "Walking, sport, stretching, and active commuting all count.",
    choices: [
      { value: 0, label: "Rarely" },
      { value: 1, label: "1–2 days each week" },
      { value: 2, label: "3–4 days each week" },
      { value: 3, label: "5 or more days each week" }
    ]
  },
  {
    id: "nutrition",
    category: "Nutrition",
    prompt: "How balanced do your meals feel most days?",
    helper: "Think about variety, fruit and vegetables, and regular meals.",
    choices: [
      { value: 0, label: "Often rushed or highly processed" },
      { value: 1, label: "Some balance, but inconsistent" },
      { value: 2, label: "Usually balanced" },
      { value: 3, label: "Consistently varied and balanced" }
    ]
  },
  {
    id: "stress",
    category: "Mindset",
    prompt: "How often do you feel overwhelmed by stress?",
    helper: "There is no right answer — this helps choose a realistic next step.",
    choices: [
      { value: 0, label: "Most days" },
      { value: 1, label: "Quite often" },
      { value: 2, label: "Occasionally" },
      { value: 3, label: "Rarely" }
    ]
  }
];

export const categoryKeys = {
  water: "hydration",
  sleep: "recovery",
  movement: "activity",
  nutrition: "nutrition",
  stress: "mindset"
};
