import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const userProgressType = defineType({
  name: "userProgress",
  title: "User Progress",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required().error("User ID is required"),
      readOnly: true,
    }),
    defineField({
      name: "courseId",
      title: "Course ID",
      type: "string",
      validation: (Rule) => Rule.required().error("Course ID is required"),
      readOnly: true,
    }),
    defineField({
      name: "completedLessons",
      title: "Completed Lessons",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      initialValue: [],
      validation: (Rule) => Rule.unique(),
      readOnly: true,
    }),
    defineField({
      name: "progress",
      title: "Progress",
      type: "number",
      initialValue: 0,
      validation: (Rule) =>
        Rule.required().min(0).max(100).error("Progress must be 0-100"),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      userId: "userId",
      courseId: "courseId",
      progress: "progress",
    },
    prepare({ userId, courseId, progress }) {
      return {
        title: userId ? `Progress for ${userId}` : "User Progress",
        subtitle: `${courseId ?? "Unknown course"} • ${progress ?? 0}% complete`,
      };
    },
  },
});
