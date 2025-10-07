declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Allow importing global CSS as a side-effect (no types)
declare module "*.global.css" {
  const _default: { [key: string]: string } | undefined;
  export default _default;
}
