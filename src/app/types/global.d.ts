declare module "*.module.scss";
declare module "*.scss";
declare module "*.css";
declare module "*.ttf";


declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.png';

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;