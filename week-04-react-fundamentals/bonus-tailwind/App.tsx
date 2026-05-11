// Tailwind starter — drop into a fresh Vite + React + TS app's src/App.tsx
// Make sure src/index.css starts with: @import "tailwindcss";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Ship faster with Tailwind
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Utility-first CSS that compiles to plain CSS. Open DevTools and see for yourself.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-md bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Get started
          </button>
          <button className="rounded-md border border-gray-300 px-5 py-2.5 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-neutral-900">
            Read docs
          </button>
        </div>
      </section>

      {/* Responsive feature grid — no media queries written, just `md:` prefixes */}
      <section className="mx-auto max-w-5xl grid gap-6 px-6 pb-20 md:grid-cols-3">
        {['Fast', 'Composable', 'Themeable'].map((title) => (
          <article
            key={title}
            className="rounded-lg border border-gray-200 p-6 transition hover:shadow-md dark:border-neutral-800"
          >
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Replace this with a real description.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
