import type { SchemaTypeDefinition } from "sanity";
import { academyCourseType } from "./academyCourseType";
import { academyLessonType } from "./academyLessonType";
import { categoryType } from "./categoryType";
import { courseType } from "./courseType";
import { lessonType } from "./lessonType";
import { moduleType } from "./moduleType";
import { noteType } from "./noteType";
import { userProgressType } from "./userProgressType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    academyCourseType,
    academyLessonType,
    courseType,
    moduleType,
    lessonType,
    categoryType,
    noteType,
    userProgressType,
  ],
};
