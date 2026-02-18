export type CallbackFn = () => void;
export interface IStateObj {
    listeners: CallbackFn[];
    scriptId: string;
    scriptLoaded: boolean;
}
interface ScriptLoader {
    load: (doc: Document, url: string, callback: CallbackFn) => void;
    reinitialize: () => void;
}
declare const ScriptLoader: ScriptLoader;
export { ScriptLoader };
