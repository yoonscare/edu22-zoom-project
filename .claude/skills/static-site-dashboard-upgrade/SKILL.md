---
name: static-site-dashboard-upgrade
description: Upgrades a plain static HTML site to a dashboard-style design system using a single CSS file. Establishes CSS custom properties, nav hierarchy, hero sections, card layout, code blocks, and typography — without touching HTML content. Use when user says "디자인 업그레이드", "대시보드형으로", "design system", "CSS 리디자인", "스타일만 바꾸고 싶어", or when a static site needs a professional visual overhaul with no backend changes.
---

# Static Site Dashboard Upgrade

## Quick start

1. Create or rewrite `assets/styles.css` — never touch HTML content or links
2. Establish CSS variables first, then build every component on top of them
3. Set a single `--max` width and apply to `.wrap` — this alone fixes 80% of layout issues

```css
:root {
  --accent: #9B1C1C;
  --accent-light: rgba(155,28,28,0.08);
  --orange: #D97757;
  --bg: #F5F0EB;
  --card: #FFFFFF;
  --text: #1A1A1A;
  --muted: #555555;
  --border: 1.5px solid var(--accent);
  --max: 900px;
}
```

## Workflows

### 1. Layout skeleton

```css
body { background: var(--bg); color: var(--text); font-family: 'Noto Sans KR', sans-serif; }
.wrap { max-width: var(--max); margin: 0 auto; padding: 32px 24px; }
```

### 2. Top nav (button hierarchy)

Four distinct states — use positional selectors, no extra classes needed:

```css
.nav a { height: 36px; padding: 0 14px; border-radius: 999px;
         display: inline-flex; align-items: center; border: 1.5px solid transparent; }
.nav a:first-child  { color: var(--muted); }                    /* HOME — ghost */
.nav a:not(:first-child):not(:last-child) { color: var(--accent); border-color: var(--accent); } /* PREV/NEXT — outline */
.nav a[target="_blank"] { color: var(--orange) !important; border-color: var(--orange) !important; } /* external — orange */
.nav a:last-child   { background: var(--accent); color: #fff; } /* REF — filled */
```

> `!important` on `[target="_blank"]` is intentional: specificity of `:not()` chains beats attribute selectors.

### 3. Hero section

Flex-centered with diagonal texture and large background number:

```css
.hero {
  position: relative; overflow: hidden;
  background-image: repeating-linear-gradient(
    45deg, transparent, transparent 20px,
    rgba(155,28,28,0.03) 20px, rgba(155,28,28,0.03) 21px
  );
  display: flex; flex-direction: column;
  justify-content: center; align-items: flex-start;
  min-height: 280px; padding: 48px;
  border: 2px solid var(--accent); border-radius: 16px;
}
.hero-num {
  position: absolute; right: 32px; bottom: -24px;
  font-size: 180px; font-weight: 900;
  color: rgba(155,28,28,0.05);
  user-select: none; pointer-events: none;
}
```

Add `<span class="hero-num" aria-hidden="true">01</span>` before `</section>` in HTML.

### 4. Cards and grids

```css
.card { background: var(--card); border-radius: 12px; padding: 28px; }
.section { margin-bottom: 32px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
```

### 5. Code blocks

```css
.code {
  background: #1A1A1A; color: #E8E8E8;
  font-family: 'JetBrains Mono', monospace; font-size: 13px;
  padding: 18px 20px; border-radius: 8px;
  white-space: pre; overflow-x: auto; line-height: 1.65;
}
```

### 6. Pill badges

```css
.pill {
  display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: .04em;
  padding: 4px 10px; border-radius: 999px;
  background: var(--accent-light); color: var(--accent);
  margin-bottom: 10px;
}
```

## Rules

- Define ALL colors as variables — never hard-code hex values outside `:root`
- Use `em`/`rem` for font sizes, `px` for fixed structural dimensions (border, gap, radius)
- Keep `--max` as the single source of truth for page width
- Add `align-items: flex-start` to any flex hero to prevent child elements (tags, badges) stretching full width

## See also

[REFERENCE.md](REFERENCE.md) — stat grid, benefit list, week card links, table, callout, footer, full variable set
