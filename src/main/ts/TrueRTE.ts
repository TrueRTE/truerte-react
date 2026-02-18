import type { TrueRTE as TrueRTEGlobal } from 'truerte';

const getTrueRTE = (view: Window): TrueRTEGlobal | null => {
  const global = view as any;

  return global && global.truerte ? global.truerte : null;
};

export { getTrueRTE };
