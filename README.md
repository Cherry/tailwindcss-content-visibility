# tailwindcss-content-visibility

A plugin that provides utilities for the `content-visibility` and `contain-intrinsic-size` properties. These properties, when used correctly, can drastically increase page render performance in modern browsers.

Please review the following resources for more information:

- https://web.dev/content-visibility/
- https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
- https://developer.mozilla.org/en-US/docs/Web/CSS/contain-intrinsic-size

## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-content-visibility
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-content-visibility'),
    // ...
  ],
}
```

## Usage

Combine the `content-visibility-{x}` and `contain-intrinsic-size-{x}` classes to control the visibility and natural size of an element.

```html
<div class="content-visibility-auto contain-intrinsic-size-[auto_1000px]">
  ...
</div>
```
This would output something like:
```css
.content-visibility-auto {
	content-visibility: auto;
}
.contain-intrinsic-size-\[auto_1000px\] {
	contain-intrinsic-size: auto 1000px;
}
```

Both utilities fully support JIT for custom values, but the following default values for `content-visibility` are supported:

| Class | Output |
| --- | --- |
| `content-visibility-auto` | `auto` |
| `content-visibility-hidden` | `hidden` |
| `content-visibility-visible` | `visible` |

## Configuration

You can configure additional defaults and classes under the `contentVisibility` and `containIntrinsicSize` keys in your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
		extend: {
			contentVisibility: {
				'foo': 'bar',
			},
			containIntrinsicSize: {
				example: '1px 20px',
			},
		}
  },
}
```
With the above configuration, you could then use:

```html
<div class="content-visibility-foo contain-intrinsic-size-example">
  ...
</div>
```

And this would output something like:
```css
.content-visibility-foo {
	content-visibility: bar;
}
.contain-intrinsic-size-example {
	contain-intrinsic-size: 1px 20px;
}
```