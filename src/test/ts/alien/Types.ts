/* Based on code from TinyMCE, MODIFIED (Tiny / TinyMCE -> TrueRTE) */
/* See LEGAL.txt for the original license information */
export interface FakeTrueRTE {
  majorVersion: string;
  minorVersion: string;
}

export interface TrueRTE extends FakeTrueRTE {
  baseURL: string;
  baseURI: any;

  PluginManager: any;

  util: {
    URI: any;
  };

  remove (): void;
  remove (selector: string | Editor): Editor | void;
}

export interface Editor {
  editorManager: any;
}
