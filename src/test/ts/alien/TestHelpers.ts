import { Assertions } from '@ephox/agar';
import { Version } from 'src/main/ts/components/Editor';
import { Editor as TrueRTEEditor } from 'truerte';
import { ScriptLoader } from 'src/main/ts/ScriptLoader2';

interface EventHandlerArgs<T> {
  editorEvent: T;
  editor: TrueRTEEditor;
}

type HandlerType<A> = (a: A, editor: TrueRTEEditor) => unknown;

const VERSIONS: Version[] = [ '1' ];
const CDN_VERSIONS: Version[] = [ '1' ];

interface Cell<T> {
  readonly get: () => T;
  readonly set: (value: T) => void;
}

const Cell = <T>(initial: T): Cell<T> => {
  let value = initial;

  return {
    get: () => value,
    set: (v: T) => {
      value = v;
    }
  };
};

const EventStore = () => {
  const state: Cell<Record<string, EventHandlerArgs<unknown>[]>> = Cell({});

  const createHandler = <T>(name: string): HandlerType<T> => (event: T, editor) => {
    const oldState = state.get();

    const eventHandlerState = (oldState[name] ?? [] as EventHandlerArgs<unknown>[])
      .concat([{ editorEvent: event, editor }]);

    state.set({
      ...oldState,
      [name]: eventHandlerState
    });
  };

  const each = <T>(name: string, assertState: (state: EventHandlerArgs<T>[]) => void) => {
    Assertions.assertEq('State from "' + name + '" handler should exist', true, name in state.get());
    assertState(state.get()[name] as unknown as EventHandlerArgs<T>[]);
  };

  const clearState = () => {
    state.set({});
  };

  return {
    each,
    createHandler,
    clearState
  };
};

// TODO: remove, we shall import from shared, but then it will also use the shared scriptloader so make sure we only use she shared loader
/** Function to clean up and remove TrueRTE-related scripts and links from the document */
const cleanupGlobalTrueRTE = (): void => {
  ScriptLoader.reinitialize();
  delete (globalThis as any).truerte;
  delete (globalThis as any).trueRTE;
  /** Helper function to check if an element has a TrueRTE-related URI in a specific attribute */
  const hasTrueRTEUri = (attrName: string) => (elm: Element): boolean => {
    const src = elm.getAttribute(attrName);
    return src != null && src.includes('truerte');
  };
  // Find all script and link elements that have a TrueRTE-related URI
  [
    ...Array.from(document.querySelectorAll('script')).filter(hasTrueRTEUri('src')),
    ...Array.from(document.querySelectorAll('link')).filter(hasTrueRTEUri('href'))
  ].forEach((elm) => elm.remove());
};

export {
  cleanupGlobalTrueRTE,
};

export {
  EventStore,
  VERSIONS,
  CDN_VERSIONS,
  Version
};