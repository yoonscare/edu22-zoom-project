# Static Site Dashboard Upgrade — Reference

## Full CSS variable set (copy-paste base)

```css
:root {
  --accent:        #9B1C1C;
  --accent-dark:   #7B1414;
  --accent-light:  rgba(155,28,28,0.08);
  --orange:        #D97757;
  --orange-light:  rgba(217,119,87,0.10);
  --bg:            #F5F0EB;
  --card:          #FFFFFF;
  --text:          #1A1A1A;
  --muted:         #555555;
  --border:        1.5px solid var(--accent);
  --max:           900px;
  --radius-card:   12px;
  --radius-pill:   999px;
}
```

---

## Stat grid (3-column KPI row)

```html
<section class="section home-stats">
  <div class="stat-grid">
    <div class="stat-item">
      <div class="stat-icon">📅</div>
      <div class="stat-value">4주 과정</div>
      <div class="stat-label">주 1회 온라인 세션</div>
    </div>
    <!-- repeat for each stat -->
  </div>
</section>
```

```css
.stat-grid {
  display: grid; grid-template-columns: repeat(3,1fr);
  border: 1.5px solid var(--accent); border-radius: var(--radius-card); overflow: hidden;
}
.stat-item { padding: 24px; text-align: center; }
.stat-item + .stat-item { border-left: 1.5px solid rgba(155,28,28,0.18); }
.stat-icon { font-size: 1.5rem; margin-bottom: 8px; }
.stat-value { font-size: 1.75rem; font-weight: 700; color: var(--accent); }
.stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; }
```

---

## Benefit list (checkmark list)

```html
<ul class="benefit-list">
  <li>반복 업무를 Skill로 자동화하는 감각이 생깁니다</li>
</ul>
```

```css
.benefit-list { list-style: none; padding: 0; }
.benefit-list li {
  padding: 11px 0 11px 28px; position: relative;
  border-bottom: 1px solid rgba(155,28,28,0.08);
}
.benefit-list li::before {
  content: '✓'; position: absolute; left: 0;
  color: var(--orange); font-weight: 700;
}
```

---

## Week card links with description

```html
<div class="page-links">
  <a href="week1.html">
    <small>WEEK 1</small>
    OT + Skill 입문
    <span class="week-desc">OT + Skill 입문 · Claude Code 첫 실습</span>
  </a>
</div>
```

```css
.page-links { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
.page-links a {
  display: block; padding: 20px; border-radius: var(--radius-card);
  border: var(--border); text-decoration: none; color: var(--text);
}
.page-links a small { display: block; font-size: 10px; color: var(--muted); margin-bottom: 6px; }
.page-links a .week-desc { display: block; font-size: 11px; color: var(--muted); margin-top: 6px; }
.page-links a:hover { background: var(--accent-light); }
```

---

## Table

```css
.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.table th { background: var(--accent-light); color: var(--accent);
            padding: 10px 14px; text-align: left; font-weight: 600; }
.table td { padding: 10px 14px; border-bottom: 1px solid rgba(155,28,28,0.10); }
.table tr:last-child td { border-bottom: none; }
```

---

## Callout box

```html
<div class="callout info">
  <strong>핵심:</strong> 내용
</div>
```

```css
.callout { padding: 14px 18px; border-radius: 8px; font-size: 14px; margin-top: 16px; }
.callout.info { background: var(--orange-light); border-left: 3px solid var(--orange); }
.callout.warn { background: var(--accent-light); border-left: 3px solid var(--accent); }
```

---

## Footer

```css
.footer { margin-top: 48px; padding: 24px 0; border-top: var(--border);
          font-size: 13px; color: var(--muted); }
```

---

## Divider / section spacing

```css
.section { margin-bottom: 32px; }
.section + .section { padding-top: 8px; }
hr { border: none; border-top: var(--border); margin: 32px 0; }
```

---

## Common pitfalls

| Problem | Cause | Fix |
|---|---|---|
| Badge/tag stretches full width inside hero | `display:flex` on parent without `align-items` | Add `align-items: flex-start` to `.hero` |
| External link ignores orange color | `:not()` chain has higher specificity than `[attr]` | Use `!important` on `[target="_blank"]` color + border |
| Browser shows old CSS | Cached stylesheet | Hard-reload or add `?v=2` to `<link href="styles.css">` |
| Hero text not vertically centered | No flex on `.hero` | Add `display:flex; flex-direction:column; justify-content:center` |
