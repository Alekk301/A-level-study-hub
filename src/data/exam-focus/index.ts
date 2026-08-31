import { chemistryExamFocus } from "./chemistry";
import { computerScienceExamFocus } from "./computer-science";
import { mathExamFocus } from "./math";
import { businessExamFocus } from "./business";
import type { ExamFocusMap } from "./types";

const examFocusBySubject: Record<string, ExamFocusMap> = {
  "9701": chemistryExamFocus,
  "9709": mathExamFocus,
  "9618": computerScienceExamFocus,
  "9609": businessExamFocus,
};

export function getExamFocus(subjectCode: string, topicId: string) {
  return examFocusBySubject[subjectCode]?.[topicId] ?? null;
}
