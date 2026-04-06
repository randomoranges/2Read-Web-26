declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.css" {}

declare module "*/bookshots.json" {
  import type { BookShot } from "./data/bookshots.d.ts";
  const data: BookShot[];
  export default data;
}

