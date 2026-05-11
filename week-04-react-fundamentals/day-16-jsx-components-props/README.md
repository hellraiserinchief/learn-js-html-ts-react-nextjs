# Day 16 — Setup, JSX, Components, Props

**Reading:** [react.dev — Quick Start](https://react.dev/learn), [Your First Component](https://react.dev/learn/your-first-component), [Passing Props](https://react.dev/learn/passing-props-to-a-component).

## Setup

```bash
pnpm create vite@latest day-16 -- --template react-ts
cd day-16 && pnpm install && pnpm dev
```

This gives you Vite + React + TS in 30 seconds.

## Mental model

A component is a **function from props to UI**. Re-rendering is React calling that function again. That's it.

## Exercise

Build a typed `<Button>` component with variants (`primary`, `secondary`), an optional `onClick`, and `children`. Use it in 3 places. Get TS autocomplete working for the variant prop.

## Reference

```tsx
type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children?: React.ReactNode;
};

export function Button({ label, variant = 'primary', onClick, children }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children ?? label}
    </button>
  );
}
```
