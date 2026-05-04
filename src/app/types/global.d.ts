declare module "*.module.scss";
declare module "*.scss";
declare module "*.css";

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}