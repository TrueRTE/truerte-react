# truerte-react External Feature Control with `useRef`

This guide explains how to control TrueRTE features from outside the React component using `useRef`.

## 1. Preferred pattern: `editorRef` prop

`truerte-react` supports an `editorRef` prop that receives the underlying `TrueRTEEditor` instance.

```tsx
import { useRef } from 'react';
import { Editor } from 'truerte-react';
import type { Editor as TrueRTEEditor } from 'truerte';

export function ArticleEditor() {
  const editorRef = useRef<TrueRTEEditor | null>(null);

  return (
    <Editor
      editorRef={editorRef}
      truerteScriptSrc="/truerte/truerte.min.js"
      init={{
        base_url: "/truerte",
        plugins: "casechange letterspacing paragraphspacing lists link code table",
        toolbar: "undo redo | bold italic underline | bullist numlist | link table | code"
      }}
    />
  );
}
```

Now you can control the editor from anywhere in your component:

```ts
editorRef.current?.setTextCase('uppercase');
editorRef.current?.toggleBold();
editorRef.current?.insertLink('https://example.com');
```

## 2. Core feature methods you can call

## Content and history

- `editorRef.current?.getContent()`
- `editorRef.current?.setContent('<p>Hello</p>')`
- `editorRef.current?.insertContent('<strong>inserted</strong>')`
- `editorRef.current?.undo()`
- `editorRef.current?.redo()`

## Text formatting

- `editorRef.current?.toggleBold()`
- `editorRef.current?.toggleItalic()`
- `editorRef.current?.toggleUnderline()`
- `editorRef.current?.toggleStrikethrough()`
- `editorRef.current?.toggleSubscript()`
- `editorRef.current?.toggleSuperscript()`

## Block/font/line-height/colors

- `editorRef.current?.setBlock('h2')`
- `editorRef.current?.setFontFamily('Arial')`
- `editorRef.current?.setFontSize('14pt')`
- `editorRef.current?.setLineHeight('1.5')`
- `editorRef.current?.setTextColor('#0057b8')`
- `editorRef.current?.setBackgroundColor('#fff59d')`

## Alignment

- `editorRef.current?.alignLeft()`
- `editorRef.current?.alignCenter()`
- `editorRef.current?.alignRight()`
- `editorRef.current?.alignJustify()`

## Lists and indentation

- `editorRef.current?.toggleBulletList()`
- `editorRef.current?.toggleNumberedList()`
- `editorRef.current?.outdent()`
- `editorRef.current?.indent()`

## Links

- `editorRef.current?.openLinkDialog()`
- `editorRef.current?.insertLink('https://example.com')`
- `editorRef.current?.insertLink({ href: 'https://example.com', target: '_blank' })`
- `editorRef.current?.removeLink()`

## Tables and code

- `editorRef.current?.insertTable(3, 4)`
- `editorRef.current?.openCodeEditor()`

## Case, letter spacing, paragraph spacing

Requires plugins:
- `casechange`
- `letterspacing`
- `paragraphspacing`

Methods:
- `editorRef.current?.setTextCase('uppercase')`
- `editorRef.current?.setTextCase('lowercase')`
- `editorRef.current?.setTextCase('titlecase')`
- `editorRef.current?.setLetterSpacing('1.5px')`
- `editorRef.current?.setLetterSpacing(2)`
- `editorRef.current?.setParagraphSpacing('before', 'add')`
- `editorRef.current?.setParagraphSpacing('after', 'remove')`
- `editorRef.current?.addParagraphSpacingBefore()`
- `editorRef.current?.addParagraphSpacingAfter()`
- `editorRef.current?.removeParagraphSpacingBefore()`
- `editorRef.current?.removeParagraphSpacingAfter()`

## 3. Control every other feature using `execCommand`

For commands without convenience methods, call `execCommand` directly:

```ts
editorRef.current?.execCommand('mceTableInsertRowAfter');
editorRef.current?.execCommand('mceTableDeleteCol');
editorRef.current?.execCommand('mceVisualBlocks');
editorRef.current?.execCommand('mceShowCharmap');
editorRef.current?.execCommand('mceInsertDate');
```

This gives external control for all command-based features.

## 4. Optional fallback pattern (`onInit`)

If you prefer not to pass `editorRef`:

```tsx
<Editor
  onInit={(_evt, editor) => {
    editorRef.current = editor;
  }}
  // other props...
/>
```

## 5. Notes

- Always null-check `editorRef.current`.
- Ensure required plugins are loaded before calling plugin-specific methods.
- In SSR environments, only access the ref on the client.

