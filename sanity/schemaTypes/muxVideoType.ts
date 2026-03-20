import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const muxVideoType = defineType({
  name: "mux.video",
  title: "Mux Video",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "asset",
      title: "Mux asset",
      type: "reference",
      to: [{ type: "mux.videoAsset" }],
      description:
        "Select an existing Mux asset. Use the custom /admin editor to upload or replace videos.",
    }),
  ],
  preview: {
    select: {
      assetId: "asset._ref",
    },
    prepare({ assetId }) {
      return {
        title: assetId ? "Mux video linked" : "Mux video",
        subtitle: assetId || "No asset selected",
        media: PlayIcon,
      };
    },
  },
});
