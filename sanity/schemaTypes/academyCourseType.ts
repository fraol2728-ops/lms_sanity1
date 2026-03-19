import { BookIcon } from "@sanity/icons";
import { defineType } from "sanity";

export const academyCourseType = defineType({
  name: "academyCourse",
  title: "Academy Course",
  type: "document",
  icon: BookIcon,
  fields: [],
  preview: {
    prepare() {
      return {
        title: "Academy Course",
        media: BookIcon,
      };
    },
  },
});
