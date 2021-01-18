/// <reference types="node" />
/// <reference types="react-dom" />

import ReactObj from 'react';

declare global {
  let React: typeof ReactObj;
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module 'react' {
  interface Attributes {
    styleName?: string;
    className?: string;
  }
}
