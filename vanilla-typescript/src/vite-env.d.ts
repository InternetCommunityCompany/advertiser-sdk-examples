/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPECIFY_ADVERTISER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
