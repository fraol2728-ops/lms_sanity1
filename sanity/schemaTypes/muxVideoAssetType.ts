import { PlayIcon, VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const muxVideoAssetType = defineType({
  name: "mux.videoAsset",
  title: "Mux Video Asset",
  type: "document",
  icon: VideoIcon,
  fields: [
    defineField({ name: "assetId", title: "Mux Asset ID", type: "string" }),
    defineField({
      name: "playbackId",
      title: "Playback ID",
      type: "string",
    }),
    defineField({ name: "uploadId", title: "Upload ID", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string" }),
    defineField({
      name: "data",
      title: "Mux Asset Data",
      type: "object",
      fields: [],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "playbackId",
      subtitle: "status",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Mux video asset",
        subtitle: subtitle || "No status",
        media: PlayIcon,
      };
    },
  },
});
