import type { ImportCallback } from '../entities';

export type InternalBinding = (id: string) => any;
export type Primordials = Record<string, any>;
export type MarkBootstrapComplete = () => void;

// defined in scripts/constants
declare let process: Partial<NodeJS.Process>;
declare let isMainThread: boolean;
declare let ownsProcessState: boolean;
declare let markBootstrapComplete: MarkBootstrapComplete;
declare let internalBinding: InternalBinding;
declare let primordials: Primordials;

// defined in builders
declare const globalThis: Window & { [key: string]: any };

declare let __global_eval__: (code: string, context?: any, importCallback?: ImportCallback) => any;

export const globalEval = __global_eval__;

export const global = globalThis;

export const setProcess = (value: Partial<NodeJS.Process>) => (process = value);
export const setIsMainThread = (value: boolean) => (isMainThread = value);
export const setOwnsProcessState = (value: boolean) => (ownsProcessState = value);
export const setMarkBootstrapComplete = (value: MarkBootstrapComplete) => (markBootstrapComplete = value);
export const setInternalBinding = (value: InternalBinding) => (internalBinding = value);
export const setPrimordials = (value: Primordials) => (primordials = value);
