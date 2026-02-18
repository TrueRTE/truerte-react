# TrueRTE React component

This package is a thin wrapper around TrueRTE to make it easier to use in a React application.

## Documentation

- Complete guide: [Installation and Usage](./docs/INSTALLATION_AND_USAGE.md)

## Installation

```bash
npm install truerte truerte-react
```

## Lucide icon pack

To use the Lucide icon pack shipped in `truerte`, either:

1. Set `useLucideIcons={true}` (recommended), or
2. Manually set `init.icons = "truerte-lucide"`.

```tsx
<Editor
  truerteScriptSrc="/truerte/truerte.min.js"
  useLucideIcons={true}
  init={{
    icons: "truerte-lucide",
    plugins: "lists link table code",
    toolbar: "undo redo | bold italic underline | bullist numlist | link table | code"
  }}
/>
```
