import { PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const muxPlaybackIdType = defineType({
  name: "mux.playbackId",
  title: "Mux Playback ID",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string" }),
    defineField({ name: "policy", type: "string" }),
  ],
  preview: {
    select: { title: "id", subtitle: "policy" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Playback ID",
        subtitle: subtitle || "No policy",
      };
    },
  },
});

export const muxTrackType = defineType({
  name: "mux.track",
  title: "Mux Track",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string" }),
    defineField({ name: "type", type: "string" }),
    defineField({ name: "max_width", type: "number" }),
    defineField({ name: "max_height", type: "number" }),
    defineField({ name: "max_frame_rate", type: "number" }),
    defineField({ name: "duration", type: "number" }),
  ],
  preview: {
    select: { title: "type", subtitle: "id" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Track",
        subtitle: subtitle || "No ID",
      };
    },
  },
});

export const muxStaticRenditionsType = defineType({
  name: "mux.staticRenditions",
  title: "Mux Static Renditions",
  type: "object",
  fields: [defineField({ name: "status", type: "string" })],
});

export const muxAssetDataType = defineType({
  name: "mux.assetData",
  title: "Mux Asset Data",
  type: "object",
  fields: [
    defineField({ name: "resolution_tier", type: "string" }),
    defineField({ name: "upload_id", type: "string" }),
    defineField({ name: "created_at", type: "string" }),
    defineField({ name: "id", type: "string" }),
    defineField({ name: "status", type: "string" }),
    defineField({ name: "max_stored_resolution", type: "string" }),
    defineField({ name: "passthrough", type: "string" }),
    defineField({ name: "encoding_tier", type: "string" }),
    defineField({ name: "video_quality", type: "string" }),
    defineField({ name: "master_access", type: "string" }),
    defineField({ name: "aspect_ratio", type: "string" }),
    defineField({ name: "duration", type: "number" }),
    defineField({ name: "max_stored_frame_rate", type: "number" }),
    defineField({ name: "mp4_support", type: "string" }),
    defineField({ name: "max_resolution_tier", type: "string" }),
    defineField({
      name: "tracks",
      type: "array",
      of: [defineArrayMember({ type: "mux.track" })],
    }),
    defineField({
      name: "playback_ids",
      type: "array",
      of: [defineArrayMember({ type: "mux.playbackId" })],
    }),
    defineField({
      name: "static_renditions",
      type: "mux.staticRenditions",
    }),
  ],
});

export const muxVideoAssetType = defineType({
  name: "mux.videoAsset",
  title: "Mux Video Asset",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({ name: "status", type: "string" }),
    defineField({ name: "assetId", type: "string" }),
    defineField({ name: "playbackId", type: "string" }),
    defineField({ name: "filename", type: "string" }),
    defineField({ name: "thumbTime", type: "number" }),
    defineField({ name: "data", type: "mux.assetData" }),
  ],
  preview: {
    select: {
      title: "filename",
      subtitle: "status",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Mux Video Asset",
        subtitle: subtitle || "Unknown status",
        media: PlayIcon,
      };
    },
  },
});

export const muxVideoType = defineType({
  name: "mux.video",
  title: "Mux Video",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      type: "reference",
      to: [{ type: "mux.videoAsset" }],
      weak: true,
    }),
  ],
  preview: {
    select: {
      title: "asset.filename",
      subtitle: "asset.status",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Mux Video",
        subtitle: subtitle || "No asset selected",
        media: PlayIcon,
      };
    },
  },
});
