import { PlayIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const academyLessonType = defineType({
  name: "academyLesson",
  title: "Academy Lesson",
  type: "document",
  icon: PlayIcon,
  fields: [],
  preview: {
    prepare() {
      return {
        title: "Academy Lesson",
        media: PlayIcon,
      };
    },
  },
});
