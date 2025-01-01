import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { describe, expect, it } from 'vitest';

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

describe('plugin', () => {
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
});

