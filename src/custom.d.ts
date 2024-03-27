declare global {
  interface window {
    initData: any;
  }
}

interface Window {
  initData: any;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

