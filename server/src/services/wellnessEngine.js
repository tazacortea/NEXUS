import { assessmentQuestions, categoryKeys } from "../constants/assessmentQuestions.js";

const recommendationLibrary = {
  hydration: "Keep a reusable bottle nearby and pair a glass of water with each meal.",
  recovery: "Choose one realistic wind-down cue, such as putting your phone away 20 minutes before bed.",
  activity: "Start small: add a 10-minute walk or stretch to three days this week.",
  nutrition: "Make one meal easier to balance by adding a fruit, vegetable, or protein source.",
  mindset: "Protect a short reset in your day: a calm walk, breathing break, or screen-free moment."
};

function scoreBand(score) {
  if (score >= 75) return "a strong foundation";
  if (score >= 50) return "a steady starting point";
  return "an opportunity for small, sustainable changes";
}

/**
 * Converts five self-reported answers to transparent 0–100 lifestyle indicators.
 * It deliberately provides educational suggestions, never a medical diagnosis.
 */
export function calculateWellnessResult(rawAnswers) {
  const answerMap = new Map(rawAnswers.map((answer) => [answer.questionId, Number(answer.value)]));
  const answers = [];
  const scores = {};

  for (const question of assessmentQuestions) {
    const value = answerMap.get(question.id);
    if (!Number.isInteger(value) || value < 0 || value > 3) {
      throw new Error(`Please answer the ${question.category.toLowerCase()} question.`);
    }

    const choice = question.choices.find((item) => item.value === value);
    answers.push({ questionId: question.id, value, label: choice.label });
    scores[categoryKeys[question.id]] = Math.round((value / 3) * 100);
  }

  const scoreValues = Object.values(scores);
  const overallScore = Math.round(scoreValues.reduce((sum, score) => sum + score, 0) / scoreValues.length);
  const lowestAreas = Object.entries(scores)
    .sort(([, a], [, b]) => a - b)
    .filter(([, score]) => score < 75)
    .map(([area]) => area);

  const focusAreas = lowestAreas.slice(0, 3);
  const insights = [
    `Your check-in suggests ${scoreBand(overallScore)} overall.`,
    focusAreas.length
      ? `Your most useful next focus is ${focusAreas[0]}.`
      : "Your answers show consistent habits across the five areas."
  ];
  const recommendations = (focusAreas.length ? focusAreas : ["hydration", "activity", "mindset"])
    .map((area) => recommendationLibrary[area]);

  return { answers, scores, overallScore, insights, recommendations };
}
