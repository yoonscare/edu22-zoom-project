---
name: js-ui-inject
description: Injects UI enhancements (progress bars, icon badges, copy buttons, DOM decorations) into existing HTML pages via a single JavaScript file, without modifying any HTML templates. Use when the HTML is locked (CMS, legacy templates, multi-page static sites) and you need to add dynamic visual elements using only JS. Triggers: "HTML 수정 없이", "JS로 주입", "inject without HTML", "add to existing page", "pill icon", "progress bar", "copy button", "CMS HTML".
---

# JS UI Inject

## Quick start

Append an IIFE to your existing JS file. Never modify HTML templates.

```js
(function(){
  function init(){
    // your injection here
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
```

## Workflows

### 1. Context detection (URL-based)

Use this to limit injection to specific pages.

```js
var PAGE_MAP = { 'week1': 1, 'week2': 2, 'week3': 3, 'week4': 4 };
function getPageKey(){
  var path = window.location.pathname.toLowerCase();
  for(var key in PAGE_MAP){ if(path.indexOf(key) !== -1) return PAGE_MAP[key]; }
  return 0;
}
```

### 2. Progress bar injection

Append a segmented bar to an existing container element.

```js
function injectProgressBar(containerSelector, total, active){
  var el = document.querySelector(containerSelector);
  if(!el || active === 0) return;
  var bar = document.createElement('div');
  bar.className = 'topbar-progress';
  for(var i = 1; i <= total; i++){
    var seg = document.createElement('div');
    seg.className = 'tp-seg' + (i <= active ? ' tp-seg--on' : '');
    bar.appendChild(seg);
  }
  el.appendChild(bar);
}
```

### 3. Keyword icon injection (pill badges)

Match text content and prepend an icon span. Guard against double-injection.

```js
var ICON_MAP = [['핵심','🎯'],['프롬프트','💡'],['주의','⚠️']];
function injectPillIcons(){
  document.querySelectorAll('.pill').forEach(function(el){
    if(el.querySelector('.pill-icon')) return; // duplicate guard
    var text = el.textContent.trim();
    for(var i = 0; i < ICON_MAP.length; i++){
      if(text.indexOf(ICON_MAP[i][0]) !== -1){
        var span = document.createElement('span');
        span.className = 'pill-icon';
        span.textContent = ICON_MAP[i][1];
        el.insertBefore(span, el.firstChild);
        break;
      }
    }
  });
}
```

### 4. Copy button injection

Add a copy button to each code block.

See [REFERENCE.md](REFERENCE.md) for full copy button pattern with clipboard API + fallback.

## Rules

- Always use IIFE `(function(){ ... })()` to avoid polluting global scope
- Always check `document.readyState` before adding a DOMContentLoaded listener
- Always guard with `if(el.querySelector('.injected-class')) return;` to prevent double runs
- Use `var` (not `let`/`const`) if the site targets old browsers
- Inject CSS classes, not inline styles — keep styles in the CSS file

## CSS companion

Add these to your stylesheet alongside each injection:

```css
/* Progress bar */
.topbar-progress { display:flex; gap:3px; padding:0 28px; height:4px; }
.tp-seg { flex:1; height:3px; border-radius:2px; background:rgba(0,0,0,.12); }
.tp-seg--on { background:var(--accent); }

/* Pill icon */
.pill-icon { margin-right:5px; }
```
