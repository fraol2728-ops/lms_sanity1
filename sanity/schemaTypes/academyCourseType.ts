import { PlayIcon } from "@sanity/icons";
import { defineType, defineField } from "sanity";

export const academyLessonType = defineType({
  name: "academyLesson",
  title: "Academy Lesson",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Lesson Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "academyCourse" }],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "tasks",
      title: "Tasks",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
