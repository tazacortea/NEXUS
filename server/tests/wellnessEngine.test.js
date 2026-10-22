import test from "node:test";
import assert from "node:assert/strict";
import { calculateWellnessResult } from "../src/services/wellnessEngine.js";

test("wellness engine turns complete answers into clear scores", () => {
  const result = calculateWellnessResult([
    { questionId: "water", value: 3 },
    { questionId: "sleep", value: 2 },
    { questionId: "movement", value: 1 },
    { questionId: "nutrition", value: 2 },
    { questionId: "stress", value: 3 }
  ]);

  assert.equal(result.scores.hydration, 100);
  assert.equal(result.scores.activity, 33);
  assert.equal(result.overallScore, 73);
  assert.equal(result.answers.length, 5);
  assert.ok(result.recommendations[0].includes("10-minute"));
});

test("wellness engine rejects an incomplete check-in", () => {
  assert.throws(
    () => calculateWellnessResult([{ questionId: "water", value: 3 }]),
    /Please answer the recovery question/
  );
});
