import {
  BookIcon,
  DocumentIcon,
  DocumentsIcon,
  PlayIcon,
  TagIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

const documentTypeItem = (
  S: Parameters<StructureResolver>[0],
  schemaType: string,
  title: string,
  icon?: React.ComponentType | React.ReactNode,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.documentTypeList(schemaType).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("LMS")
        .icon(BookIcon)
        .child(
          S.list()
            .title("LMS")
            .items([
              documentTypeItem(S, "course", "Courses", BookIcon),
              documentTypeItem(S, "module", "Modules", DocumentsIcon),
              documentTypeItem(S, "lesson", "Lessons", PlayIcon),
              documentTypeItem(S, "category", "Categories", TagIcon),
            ]),
        ),
      S.listItem()
        .title("Other")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Other")
            .items([documentTypeItem(S, "note", "Notes", DocumentIcon)]),
        ),
    ]);
