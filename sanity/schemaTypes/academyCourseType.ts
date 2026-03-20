import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const academyCourseType = defineType({
  name: "academyCourse",
  title: "Academy Course",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Course Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: {
        list: ["Beginner", "Intermediate", "Advanced"],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
  ],
});
