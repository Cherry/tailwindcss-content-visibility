import postcss from 'postcss';
import { format } from 'prettier';
import * as tailwindPrettierPlugin from 'prettier-plugin-tailwindcss';
import tailwind from 'tailwindcss';
import { expect, it } from 'vitest';

import tailwindCssContentVisibilityPlugin from '../src';

const expected = `
.content-visibility-auto {
    content-visibility: auto
}
.content-visibility-hidden {
    content-visibility: hidden
}
.content-visibility-visible {
    content-visibility: visible
}
.contain-intrinsic-size-\\[0px_120px\\] {
    contain-intrinsic-size: 0px 120px
}
.contain-intrinsic-size-\\[120px_0px\\] {
    contain-intrinsic-size: 120px 0px
}
.contain-intrinsic-size-\\[auto_120px_auto_0px\\] {
    contain-intrinsic-size: auto 120px auto 0px
}
.contain-intrinsic-size-example {
    contain-intrinsic-size: 1px 20px
}
`;

it('test', async () => {
	const results = await postcss([
		tailwind({
			content: [
				{
					raw: `
						content-visibility-auto
						content-visibility-hidden
						content-visibility-visible
						contain-intrinsic-size-[0px_120px]
						contain-intrinsic-size-[120px_0px]
						contain-intrinsic-size-[auto_120px_auto_0px]
						contain-intrinsic-size-example
					`,
				},
			],
			plugins: [tailwindCssContentVisibilityPlugin],
			theme: {
				extend: {
					containIntrinsicSize: {
						example: '1px 20px',
					},
				},
			},
		}),
	]).process('@tailwind utilities', {
		from: undefined,
	});

	expect(results.css).toBe(expected.trim());
});

it('prettier', async () => {
	const formatted = await format('<div class="bg-white p-4 dark:bg-black content-visibility-auto contain-intrinsic-size-[0px_120px]"></div>', {
		parser: 'html',
		plugins: [tailwindPrettierPlugin],
		tailwindConfig: './tests/tailwind.config.js',
	});
	expect(formatted).toMatchInlineSnapshot(`
		"<div
		  class="bg-white p-4 content-visibility-auto contain-intrinsic-size-[0px_120px] dark:bg-black"
		></div>
		"
	`);
});
