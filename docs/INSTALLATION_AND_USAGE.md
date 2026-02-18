# truerte-react Installation and Usage Guide

This guide covers end-to-end installation and usage of `truerte-react`, including script hosting, React usage patterns, configuration, events, and troubleshooting.

## 1. What `truerte-react` Is

`truerte-react` is a React wrapper around the browser build of TrueRTE.

Key behavior:

- The editor expects a browser-loaded TrueRTE script (`window.truerte`).
- If `window.truerte` is not present, `truerte-react` can load a script URL via `truerteScriptSrc`.
- If `truerteScriptSrc` is omitted, it falls back to jsDelivr (`cdnVersion`, default `"1"`).

This means script and editor assets must be accessible from the browser (same origin static assets or CDN).

## 2. Prerequisites

- React 16.7+ (React 17/18/19 supported)
- `react-dom` matching your React version
- `truerte` package (peer dependency)
- A browser-served TrueRTE script and assets when self-hosting

Install:

```bash
npm install truerte truerte-react
```

## 3. Decide How to Load TrueRTE

### Option A: Self-hosted (recommended for custom plugins/skins/icons)

Serve TrueRTE from your app's public/static folder.

Example (Vite/CRA style):

```text
public/
  truerte/
    truerte.min.js
    plugins/
    skins/
    themes/
    icons/
    langs/
```

Then use:

```tsx
<Editor truerteScriptSrc="/truerte/truerte.min.js" />
```

### Option B: CDN fallback

Omit `truerteScriptSrc` and optionally set `cdnVersion`:

```tsx
<Editor cdnVersion="1.2.3" />
```

If omitted, default is:

```text
https://cdn.jsdelivr.net/npm/truerte@1/truerte.min.js
```

## 4. Quick Start

```tsx
import { Editor } from "truerte-react";

export default function BasicEditor() {
  return (
    <Editor
      truerteScriptSrc="/truerte/truerte.min.js"
      initialValue="<p>Hello from TrueRTE React</p>"
      init={{
        base_url: "/truerte",
        plugins: "lists link table code",
        toolbar: "undo redo | bold italic | bullist numlist | link table | code",
      }}
    />
  );
}
```

Why `base_url` matters:

- TrueRTE lazy-loads themes/icons/langs/plugins using its base URL.
- Setting `init.base_url = "/truerte"` makes loading deterministic in self-hosted setups.

## 5. Recommended App Wrapper Pattern

Create one wrapper component and reuse it across the app.

```tsx
import { Editor, type IAllProps } from "truerte-react";

const DEFAULT_INIT = {
  base_url: "/truerte",
  menubar: false,
  plugins: "lists link table code",
  toolbar: "undo redo | bold italic underline | bullist numlist | link table | code",
};

export function RichTextEditor({ init, ...props }: IAllProps) {
  return (
    <Editor
      truerteScriptSrc="/truerte/truerte.min.js"
      useLucideIcons={true}
      init={{ ...DEFAULT_INIT, ...init }}
      {...props}
    />
  );
}
```

Benefits:

- One place for script path and base URL.
- Consistent toolbar/plugins.
- Minimal setup for feature teams (`import RichTextEditor` only).

## 6. Uncontrolled vs Controlled Usage

### Uncontrolled (simple forms, most common)

Use `initialValue` and listen to changes if needed.

```tsx
<Editor
  truerteScriptSrc="/truerte/truerte.min.js"
  initialValue="<p>Start typing...</p>"
  onEditorChange={(html) => {
    console.log(html);
  }}
/>
```

Notes:

- `initialValue` is intended as initial content.
- Do not continually rewrite `initialValue` from `onEditorChange`.

### Controlled (state is source of truth)

Use `value` and update it in `onEditorChange`.

```tsx
import { useState } from "react";

function ControlledEditor() {
  const [value, setValue] = useState("<p>Controlled value</p>");

  return (
    <Editor
      truerteScriptSrc="/truerte/truerte.min.js"
      value={value}
      onEditorChange={(nextValue) => setValue(nextValue)}
      rollback={false}
      init={{ base_url: "/truerte" }}
    />
  );
}
```

About `rollback`:

- In controlled mode, if editor content diverges from `value`, wrapper can revert.
- Default rollback window is `200ms` when enabled.
- Use `rollback={false}` to disable this auto-revert behavior.

## 7. Plugins, Toolbar, and Icons

### Plugin loading

You can specify plugins in `init.plugins`, `plugins` prop, or both.

Important:

- `init.plugins` and `plugins` are concatenated.
- They are not deduplicated automatically.

### External plugins

```tsx
<Editor
  truerteScriptSrc="/truerte/truerte.min.js"
  init={{
    base_url: "/truerte",
    plugins: "lists link code",
    external_plugins: {
      casechange: "/truerte/plugins/casechange/plugin.min.js",
      letterspacing: "/truerte/plugins/letterspacing/plugin.min.js",
    },
    toolbar: "undo redo | bold italic | casechange letterspacing | code",
  }}
/>
```

### Lucide icons

Recommended:

```tsx
<Editor useLucideIcons={true} />
```

Behavior:

- If `useLucideIcons={true}` and you did not set `init.icons` or `init.icons_url`, wrapper sets `icons: "truerte-lucide"`.
- If you set `init.icons` or `init.icons_url`, your explicit setting wins.

## 8. Script Loading Controls

`scriptLoading` controls how the runtime `<script>` tag is loaded:

```tsx
<Editor
  truerteScriptSrc="/truerte/truerte.min.js"
  scriptLoading={{ async: true, defer: true, delay: 200 }}
/>
```

- `async`: sets `<script async>`
- `defer`: sets `<script defer>`
- `delay`: waits N ms before injecting the script

Useful callbacks:

- `onScriptsLoad`: script(s) loaded successfully
- `onScriptsLoadError`: script load failed

## 9. API Reference (Props)

Main props accepted by `Editor`:

| Prop | Type | Purpose |
| --- | --- | --- |
| `id` | `string` | Element id for the editor target. Auto-generated if omitted. |
| `inline` | `boolean` | Inline mode (`div`/custom element target) instead of iframe textarea mode. |
| `initialValue` | `string` | Initial HTML content. Best for uncontrolled usage. |
| `value` | `string` | Controlled HTML content. |
| `onEditorChange` | `(html, editor) => void` | React wrapper change callback with HTML content. |
| `init` | `InitOptions` | Options forwarded to `truerte.init()`. |
| `tagName` | `string` | Target tag name for inline mode (default `div`). |
| `tabIndex` | `number` | Tab index for the rendered element. |
| `cdnVersion` | `\"1\" | \"1.x\" | \"1.x.y\"` | jsDelivr version selector (default `"1"`). |
| `plugins` | `string \| string[]` | Additional plugins (merged with `init.plugins`). |
| `toolbar` | `string \| string[]` | Toolbar config (overrides `init.toolbar` when set). |
| `disabled` | `boolean` | Sets editor mode to `readonly` when true. |
| `textareaName` | `string` | Name attribute for iframe mode textarea target. |
| `truerteScriptSrc` | `string` | Browser URL of TrueRTE script to lazy-load. |
| `useLucideIcons` | `boolean` | Auto-select `truerte-lucide` icons when no explicit icon config is set. |
| `rollback` | `number \| false` | Controlled mode rollback window (ms) or disabled. |
| `scriptLoading` | `{ async?: boolean; defer?: boolean; delay?: number }` | Runtime script loading strategy. |

## 10. Events

Two event styles are available:

- `onEditorChange(html, editor)` from the React wrapper
- `onXxx(event, editor)` mappings for TrueRTE native/custom events

Examples:

```tsx
<Editor
  onInit={(_evt, editor) => console.log("init", editor.id)}
  onSetContent={(evt) => console.log("set content", evt.content)}
  onFocus={() => console.log("focus")}
  onPluginLoadError={(evt) => console.error(evt)}
  onScriptsLoad={() => console.log("script loaded")}
  onScriptsLoadError={(err) => console.error("script load failed", err)}
/>
```

### Native event prop names

```text
onBeforePaste onBlur onClick onCompositionEnd onCompositionStart
onCompositionUpdate onContextMenu onCopy onCut onDblclick onDrag
onDragDrop onDragEnd onDragGesture onDragOver onDrop onFocus onFocusIn
onFocusOut onInput onKeyDown onKeyPress onKeyUp onMouseDown onMouseEnter
onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onPaste
onSelectionChange
```

### Custom event prop names

```text
onActivate onAddUndo onBeforeAddUndo onBeforeExecCommand onBeforeGetContent
onBeforeRenderUI onBeforeSetContent onChange onClearUndos onCommentChange
onDeactivate onDirty onExecCommand onGetContent onHide onIconsLoadError
onInit onLanguageLoadError onLoadContent onModelLoadError onNodeChange
onObjectResizeStart onObjectResized onObjectSelected onPluginLoadError
onPostProcess onPostRender onPreProcess onProgressState onRedo onRemove
onReset onResizeEditor onSaveContent onSetAttrib onSetContent onShow
onSkinLoadError onSubmit onThemeLoadError onUndo onVisualAid
```

Plus script-loader callbacks:

```text
onScriptsLoad onScriptsLoadError
```

## 11. SSR / Next.js Notes

`truerte-react` requires browser globals (`window`, `document`).

For Next.js App Router:

1. Make the component client-only (`"use client"`).
2. If needed, dynamically import with `ssr: false`.

Example:

```tsx
"use client";

import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("truerte-react").then((m) => m.Editor),
  { ssr: false }
);
```

## 12. Troubleshooting

### `truerte should have been loaded into global scope`

- Script URL is invalid or not reachable.
- Verify `truerteScriptSrc` in browser directly.

### Editor renders but plugin buttons are missing

- Plugin files are not served at expected paths.
- Check `init.plugins` and `external_plugins` URLs.
- Ensure `base_url` points to your TrueRTE asset root.

### Skins/icons/lang files fail to load

- Set `init.base_url` explicitly (for self-hosted setups).
- Confirm `/skins`, `/icons`, `/langs`, `/themes`, `/plugins` folders exist under that base.

### Double updates or cursor jumps in controlled mode

- Confirm `value` is updated only from editor changes.
- Consider `rollback={false}` if rollback timing conflicts with your state flow.

### React Strict Mode dev quirks

- Script loading is guarded, but Strict Mode re-renders can make debugging noisy.
- Validate behavior in production build for final confirmation.

## 13. Best Practices Checklist

- Use a single app-level wrapper around `Editor`.
- Self-host TrueRTE assets when you use custom plugins.
- Set `init.base_url` in self-hosted mode.
- Use uncontrolled mode unless you need strict external state control.
- Use `onScriptsLoadError` to surface script failures in logs/UI.
- Keep plugin and icon configuration centralized.

## 14. Minimal Production-Ready Example

```tsx
import { Editor } from "truerte-react";

export default function ArticleEditor() {
  return (
    <Editor
      truerteScriptSrc="/truerte/truerte.min.js"
      useLucideIcons={true}
      initialValue="<p>Write your article...</p>"
      onScriptsLoadError={(err) => console.error("TrueRTE load failed", err)}
      init={{
        base_url: "/truerte",
        height: 500,
        menubar: "file edit view insert format tools table help",
        plugins: "lists link table code",
        toolbar:
          "undo redo | blocks | bold italic underline | bullist numlist | link table | code",
      }}
    />
  );
}
```

