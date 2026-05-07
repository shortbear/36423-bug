# Repro: facebook/react#36423

Minimal Vite + React 19 repro for [facebook/react#36423](https://github.com/facebook/react/issues/36423) —
`useEffect` infinite loops are silent in production because the
`NESTED_PASSIVE_UPDATE_LIMIT` check is wrapped in `__DEV__` and never throws.

## Setup

```bash
npm install
```

## Reproduce the bug

**Development mode** (loop is caught):
```bash
npm run dev
```
Open http://localhost:5173 and the DevTools Console. After ~50 renders you will
see: `Warning: Maximum update depth exceeded...`

**Production mode** (loop is silent):
```bash
npm run build && npm run preview
```
Open http://localhost:4173 and the DevTools Console. No error, no warning —
the component re-renders indefinitely and pegs the CPU. Nothing is reported
to error boundaries or error monitoring tools.

## The buggy component

`src/App.jsx` renders `<BuggyComponent />`, which calls `setCount` inside a
`useEffect` with no dependency array, triggering an infinite loop:

```jsx
function BuggyComponent() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(c => c + 1);
  }); // no dependency array — fires after every render

  return <div>{count}</div>;
}
```

## Expected behavior

React should throw in production, the same way it does for synchronous
infinite loops (`NESTED_UPDATE_LIMIT`), so that error boundaries and error
monitoring tools (Sentry, Datadog, etc.) receive a signal.

## React version

19.x