# Bonus — Internationalization (next-intl)

**Why now:** The moment a SaaS gets one paying customer outside your country, you'll wish you'd planned for translations. Retrofitting i18n into a finished app is painful; designing for it from day one costs almost nothing.

**Reading (60 min):** [next-intl docs](https://next-intl-docs.vercel.app/), [MDN — `Intl` namespace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) (built-in number / date / list formatting — use this even in single-language apps).

## Why next-intl over alternatives

- **next-intl**: best App-Router support, ICU message format, type-safe keys. Default recommendation for new Next.js apps.
- **react-intl** (FormatJS): mature, framework-agnostic. Use if you're not on Next.js.
- **i18next + react-i18next**: very flexible, big ecosystem. Use if you need namespaces / lazy-loaded translations / non-Next stack.
- **Paraglide.js**: tree-shakable, generates type-safe functions. Newer, very promising for performance-critical apps.

## Setup

```bash
cd your-next-app
pnpm add next-intl
```

File layout:

```
app/
├─ [locale]/
│  ├─ layout.tsx
│  └─ page.tsx
├─ i18n.ts             # config (which locales, default)
└─ messages/
   ├─ en.json
   └─ fr.json
middleware.ts          # next-intl middleware for locale detection
```

## Reference

```json
// messages/en.json
{
  "Home": {
    "title": "Welcome",
    "greeting": "Hello, {name}!",
    "items": "{count, plural, =0 {no items} =1 {1 item} other {# items}}"
  }
}
```

```tsx
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <main>
      <h1>{t('title')}</h1>
      <p>{t('greeting', { name: 'Ada' })}</p>
      <p>{t('items', { count: 3 })}</p>
    </main>
  );
}
```

## Always-useful bit even without translation

`Intl` is built into the browser — use it for **numbers, currencies, dates, lists, and relative times**. Even an English-only app should not hardcode `${(price/100).toFixed(2)}`:

```ts
new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(12.5);
// "$12.50"

new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date());
// "May 12, 2026"

new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-1, 'day');
// "yesterday"

new Intl.ListFormat('en', { style: 'long', type: 'conjunction' }).format(['a', 'b', 'c']);
// "a, b, and c"
```

## Exercise

In your Week 6 blog capstone:

1. Wrap routes in `[locale]` and add `en` + one other (`fr`, `es`, whatever).
2. Move every user-facing string into `messages/*.json`.
3. Add a locale switcher in the header.
4. Use `Intl.DateTimeFormat` for post timestamps with the current locale.
5. Hit the site as `?locale=fr` — anything still in English is a bug.
