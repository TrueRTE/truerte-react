# Official TrueRTE React component

## About

This package is a thin wrapper around [TrueRTE](https://github.com/TrueRTE/truerte) to make it easier to use in a React application.

- If you need full editor docs, see: [TrueRTE Documentation](https://github.com/TrueRTE/truerte/blob/master/docs/INSTALLATION_AND_USAGE.md).
- For the React quick start, see: [TrueRTE React Installation and Usage Guide](https://github.com/TrueRTE/truerte-react/blob/master/docs/INSTALLATION_AND_USAGE.md#4-quick-start).
- For the React technical reference, see: [TrueRTE React API Reference (Props)](https://github.com/TrueRTE/truerte-react/blob/master/docs/INSTALLATION_AND_USAGE.md#9-api-reference-props).
- For imperative `useRef` control patterns, see: [TrueRTE React useRef Feature Control](https://github.com/TrueRTE/truerte-react/blob/master/docs/USE_REF_FEATURE_CONTROL.md).

## Installation

```bash
npm install truerte truerte-react
```

## Quick Example

```tsx
import { Editor } from "truerte-react";

export default function App() {
  return (
    <Editor
      truerteScriptSrc="/truerte/truerte.min.js"
      useLucideIcons={true}
      init={{
        height: 500,
        plugins: "lists link table code",
        toolbar: "undo redo | bold italic underline | bullist numlist | link table | code",
      }}
    />
  );
}
```

## Issues

Have you found an issue with `truerte-react` or do you have a feature request?

- Open an [issue](https://github.com/TrueRTE/truerte-react/issues)
- Submit a [pull request](https://github.com/TrueRTE/truerte-react/pulls)

Note: For core editor issues in TrueRTE itself, please use the [TrueRTE repository](https://github.com/TrueRTE/truerte).

## Repository

- React wrapper: [github.com/TrueRTE/truerte-react](https://github.com/TrueRTE/truerte-react)
- Core editor: [github.com/TrueRTE/truerte](https://github.com/TrueRTE/truerte)

## License

MIT
