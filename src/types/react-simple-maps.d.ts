declare module "react-simple-maps" {
  import { ComponentType, ReactNode } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    className?: string;
    children?: ReactNode;
    [key: string]: unknown;
  }

  interface GeographiesProps {
    geography: string;
    children: (data: { geographies: Array<{ id: string; rsmKey: string; [key: string]: unknown }> }) => ReactNode;
    [key: string]: unknown;
  }

  interface GeographyProps {
    geography: Record<string, unknown>;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseMove?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    style?: Record<string, Record<string, unknown>>;
    [key: string]: unknown;
  }

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    children?: ReactNode;
    [key: string]: unknown;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
