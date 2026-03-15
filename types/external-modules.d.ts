declare module "@portabletext/types" {
  export interface TypedObject {
    _type: string;
    [key: string]: unknown;
  }
}

declare module "@portabletext/react" {
  import type { ReactNode } from "react";

  export type PortableTextComponentProps = {
    children?: ReactNode;
    value?: any;
  };

  export type PortableTextComponents = {
    block?: Record<string, (props: PortableTextComponentProps) => ReactNode>;
    list?: Record<string, (props: PortableTextComponentProps) => ReactNode>;
    listItem?: Record<string, (props: PortableTextComponentProps) => ReactNode>;
    marks?: Record<string, (props: PortableTextComponentProps) => ReactNode>;
    types?: Record<string, (props: PortableTextComponentProps) => ReactNode>;
  };

  export function PortableText(props: {
    value: unknown;
    components?: PortableTextComponents;
  }): ReactNode;
}

declare module "@next/env" {
  export function loadEnvConfig(dir: string): void;
}

declare module "@sanity/client";
